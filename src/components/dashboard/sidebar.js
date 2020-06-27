import React, { Component } from "react";
import { createPosts } from "./../../store/actions/postActions";
import { connect } from "react-redux";
import firebase from "./../../config/fbconfig";
import moment from "moment";

class Sidebar extends Component {
  state = {
    Image: "",
    desc: "",
  };

  componentDidUpdate() {
    // console.log(this.props.notifications);
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };

  handleChangefile = (e) => {
    e.persist();
    console.log(e);
    var selectedFile = e.target.files[0];
    e.target.labels[0].innerText = "Loading...";
    var storageRef = firebase.storage().ref("/posts/" + selectedFile.name);
    storageRef.put(selectedFile).then(() => {
      storageRef.getDownloadURL().then((res) => {
        e.target.labels[0].innerText = "File uploaded";
        e.target.labels[0].classList += " disabled";

        this.setState({
          ...this.state,
          Image: res,
        });
      });
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createPosts({
      Image: this.state.Image,
      desc: this.state.desc,
      firstname: this.props.profile.firstname,
      lastname: this.props.profile.lastname,
      username: this.props.profile.username,
    });
    e.target[0].value = "";
    e.target[1].value = "";
    this.setState({
      Image: "",
      desc: "",
    });
  };

  renderNotifications = () => {
    return this.props.notifications.map((notification, key) => {
      const item = notification.user.split(" ");
      return (
        <li className="collection-item" key={key}>
          <span className="btn-floating pink z-depth-0 userLogo">
            {item[0] || item[1] ? `${item[0][0]}${item[0][0]}` : "an"}
          </span>
          <span className="bold">{notification.username} </span> {notification.content} <br/> <span className="light"> {moment(Date(notification.time)).fromNow()} </span>
        </li>
      );
    });
  };

  render() {
    const { username, firstname, lastname } = this.props.profile;
    return (
      <div className="section sidebar">
        <div className="card z-depth-0 user">
          <div className="card-title">
            <span className="btn-floating pink z-depth-0 userLogo">
              {firstname ? `${firstname[0]}${lastname[0]}` : ""}
            </span>
            <span className="darkText">{username} </span>
          </div>
        </div>

        <ul className="card z-depth-0">
          <li>
            <div className="card-title">
              <i className="material-icons">edit</i>Add Post
            </div>
            <div className="card-content white">
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="Image" className="btn blue z-depth-0 fileBtn">
                  Upload File
                </label>
                <input
                  id="Image"
                  type="file"
                  accept="image/*"
                  onChange={this.handleChangefile}
                />
                {this.state.Image === "" ? null : (
                  <textarea
                    id="desc"
                    placeholder="Description..."
                    onChange={this.handleChange}
                  />
                )}
                {this.state.desc === "" ? null : (
                  <button className="btn blue z-depth-0">Post</button>
                )}
              </form>
            </div>
          </li>
        </ul>

        <ul className="card z-depth-0">
          <li>
            <div className="card-title">
              <i className="material-icons">notifications</i> Latest Activity
            </div>
            <div className="card-content white" style={{ padding: "0px 24px" }}>
              <ul className="collection notifications ">
                {this.props.notifications ? this.renderNotifications() : null}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.firestore.ordered.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPosts: (posts) => dispatch(createPosts(posts)),
  };
};

// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     firestoreConnect([
//       { collection: 'notifications', orderBy: ['timestamp', 'desc']}
//     ])
//   )(Sidebar)

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
