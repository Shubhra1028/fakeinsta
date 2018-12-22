import React, { Component } from 'react'
// import {Link} from 'react-router-dom';

class Footer extends Component {
    state ={
        footer: [
            "About us", "support", "press", "api", "jobs", "privacy", "terms", "directory", "profiles", "hashtags", "language"
        ]
    }

    returnFooter= ()=>{
        return this.state.footer.map((item, id)=>{
            return <li className="blue-text text-darken-4" key={id}> {item} </li>
        })
    }

  render() {
    return (
        <div className="page-footer">
            <div className="footer-copyright">
                <div className="container">
                <ul className="footer left">
                    {this.returnFooter()}
                </ul>
                <p className="right grey-text">© 2018 Instadummy</p>
                </div>
            </div>
        </div>
    )
  }
}



export default Footer
