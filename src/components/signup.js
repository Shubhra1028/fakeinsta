import React, { Component } from 'react'
import './../styles/signup.css'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {signUp} from '../store/actions/authActions'
import {Redirect} from 'react-router-dom'

class SignUp extends Component {
    state ={
        username : '',
        password : '',
        firstname : '',
        lastname: '',
        email : ''
    }

    handleChange = (e)=> {
        e.persist()
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e)=> {
        e.preventDefault()
        const {firstname, lastname, username, password, email} = this.state;
        if(firstname === "" || lastname === "" || username === "" || password === "" || email === "" ){
            console.log("fields should not be empty")
            console.log(this.state)
        }
        else{
            // console.log(this.state)
            this.props.signUp(this.state)
        }
    }

  render() {
    const {auth, authErr} = this.props
    if(!auth.isEmpty){
        return <Redirect to="/" />
    }
    else{
        return (
            <div className="container signup">
              <div className="appDemo">
                  <div className="appDemoImg" />
              </div>
              <div>
              <div className="formbox white">
                  <p className="logo">Instadummy</p>
                  <form onSubmit={this.handleSubmit}>
                      <input type="text" id="firstname" placeholder="Firstname" onChange={this.handleChange}></input>
                      <input type="text" id="lastname" placeholder="Lastname" onChange={this.handleChange}></input>
                      <input type="email" id="email" placeholder="Email ID" onChange={this.handleChange}></input>
                      <input type="text" id="username" placeholder="Username" onChange={this.handleChange}></input>
                      <input type="password" id="password" placeholder="password" onChange={this.handleChange}></input>
                      <div className="input-field">
                      <button className="btn blue z-depth-0">Sign Up</button>
                      </div>
                      <p>By signing up, you agree to our <strong>Terms, Data Policy</strong> and <strong>Cookies Policy</strong>.</p>
                      <div className="red lighten-4 center">
                      {this.props.authErr ? <p className="red-text text-darken-1">{authErr}</p> : null}
                      </div>
                  </form>
              </div>
              <div className="formbox white">
                      <p>Have an account? <Link to="/login">Log in</Link> </p>
              </div>
              <div>
                  <p>Get The App</p>
                  <div className="row">
                      <div className="col s6">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png" width="100%" alt="apple store"/>
                      </div>
                      <div className="col s6">
                          <img src="https://workfrom.co/siteadmin/files/2016/09/xgoogle-play-badge-e1477296348377.png.pagespeed.ic.t-eu-HIzmI.png" width="100%" alt="android app store"/>
                      </div>
                  </div>
              </div>
              </div>
      
              
            </div>
          )
    }
  }
}

const mapStateToProps = (state)=>{
    return{
        auth : state.firebase.auth,
        authErr : state.auth.authErorr
    }
} 

const mapDispatchToProps = (dispatch)=>{
    return{
        signUp : (newUser)=> dispatch(signUp(newUser))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
