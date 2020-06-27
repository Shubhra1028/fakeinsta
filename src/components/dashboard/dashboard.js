import React, { Component } from 'react';
import './../../styles/dashboard.css'
// import {getPosts} from './../../store/actions/postActions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

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
                        <PostDetail posts={this.props.posts}/>
                    </div>
                    <div className="col s12 m4 ">
                        <Sidebar profile={profile} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        posts: state.posts,
        auth : state.firebase.auth,
        profile: state.firebase.profile
    }
}

// const mapDispatchToProps = (dispatch)=>{
//     return{
//         getPosts : ()=> dispatch(getPosts())
//     }
// }

export default connect(mapStateToProps)(Dashboard)