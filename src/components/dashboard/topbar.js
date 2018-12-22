import React from 'react'
import {signOut} from '../../store/actions/authActions'
import {connect} from 'react-redux'

const Topbar = (props) => {
    return(
        <div className="topbar white" >
            <div className="container">
            <div>
                <img src="/img/logoBW.png" alt="logo" height="27px" />
                <p className="logo">Instadummy</p>
            </div>
            <div>
                <div><i className="material-icons grey-text">person_outline</i></div>
                <div onClick={props.signOut} className="btn-flat waves-light btn-small logout">Log out</div>    
            </div>
            </div>            
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut : ()=> dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(Topbar);