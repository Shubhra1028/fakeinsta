import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';
import {signIn} from '../store/actions/authActions'
import {connect} from 'react-redux'

class Login extends Component {
    state ={
        email : '',
        password : ''
    }

    handleChange = (e)=> {
        e.persist()
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e)=> {
        e.preventDefault()
        const {username, password} = this.state;
        if(username === "" || password === "" ){
            console.log("fields should not be empty")
            console.log(this.state)
        }
        else{
            console.log(this.state)
            this.props.signIn(this.state)
        }
    }

  render() {
    const {auth, authErr} = this.props
    if(!auth.isEmpty)
        return <Redirect to="/" />
    
    return (
      <div className="container login">
        <div className="formbox white">
            <p className="logo">Instadummy</p>
            <form onSubmit={this.handleSubmit}>
                <input type="email" id="email" placeholder="Username" onChange={this.handleChange}></input>
                <input type="password" id="password" placeholder="password" onChange={this.handleChange}></input>
                <div className="input-field">
                    <button className="btn blue z-depth-0">Log in</button>
                </div>
                <div className="center">
                {this.props.authErr ? <p className="red-text text-darken-1">{authErr}</p> : null}
                </div>
            </form>
        </div>
        <div className="formbox white">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link> </p>
        </div>
        <div>
            <p>Get The App</p>
            <div className="row">
                <div className="col s6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png" width="100%" alt="apple store"/>
                </div>
                <div className="col s6">
                    <img src="https://www.flexitime.co.nz/wp-content/uploads/2014/07/Googleplay_button.png" width="100%" alt="android app store"/>
                </div>
            </div>
        </div>

        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return{
        authErr : state.auth.authErorr,
        auth : state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        signIn : (creds)=> dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
