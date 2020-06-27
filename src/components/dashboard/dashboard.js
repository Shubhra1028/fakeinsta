import React, { Component } from 'react';
import './../../styles/dashboard.css'
// import {getPosts} from './../../store/actions/postActions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'

import Topbar from './topbar';
import PostDetail from './listOfPosts'
import Sidebar from './sidebar'

class Dashboard extends Component{

    // componentWillMount(){
    //     this.props.getPosts()
    // }


    render(){
        const {auth, profile} = this.props
        if(auth.isEmpty){
            return <Redirect to="/signup" />
        }

        return(
            <div className="dashboard">
                <Topbar />
                <div className="row container">
                    <div className="col s12 m8">
                        <PostDetail posts={this.props.data.ordered.posts} />
                    </div>
                    <div className="col s12 m4 ">
                        <Sidebar profile={profile} notifications={this.props.data.ordered.notifications} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        // posts: state.posts,
        auth : state.firebase.auth,
        profile: state.firebase.profile,
        data : state.firestore
    }
}

// const mapDispatchToProps = (dispatch)=>{
//     return{
//         getPosts : ()=> dispatch(getPosts())
//     }
// }

// export default connect(mapStateToProps)(Dashboard)

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'notifications', orderBy: ['time', 'desc'], limit:5 },
      { collection: 'posts', orderBy: ['timestamp', 'desc']}
    ])
  )(Dashboard)