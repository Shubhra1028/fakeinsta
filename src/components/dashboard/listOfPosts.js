import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import firebase from '../../config/fbconfig'

 class PostDetail extends Component {
    state={
        comments: [],
        comment: [{
            commenter: "",
            commentText: ""
        }]
    }

    componentDidUpdate(){
        console.log(this.props.username, this.props.postsF);
    }

    handleChange = (e)=> {
        e.persist()
        const {username} = this.props
        this.setState({
            comment: {
                commenter : username,
                commentText : e.target.value
            }
        })
    }

    handleComments = (e, docId)=>{
        e.preventDefault()
        e.persist()
        if(docId){
            this.addComment(docId, this.state.comment)
            if(this.state.comment !== ""){
                this.setState({
                    comments : [...this.state.comments, this.state.comment],
                    comment: ""
                })
            }
        }
        else{
            e.target[0].classList += " disabled"
        }

        e.target[0].value=""
        
    }

    addComment = (docId, comment)=>{
            var db = firebase.firestore()
            var batch = db.batch()
            var commentsRef = db.collection("posts").doc(docId)
            var comments = []
            commentsRef.get().then(res=>{
                comments = res.data()
                if(comments.comments){
                    let send = [...comments.comments, comment]
                    commentsRef.update({
                        comments: send
                    });
                }
                else{
                    commentsRef.update({
                        comments: [comment]
                    });
                }
            })
            
            batch.commit()
    }

    handleLikes = (e, item)=>{
        e.persist()
        if(!item.desc){
        }
        else{
            var db = firebase.firestore()
            var batch = db.batch();
            if(e.target.innerText === 'favorite_border'){
                e.target.classList += (' pink-text')
                e.target.innerText = 'favorite'
                var likes = item.likes+1
                batch.update(db.collection("posts").doc(item.id), {likes: likes})
            }
            else{
                e.target.classList.remove('pink-text')
                e.target.innerText = 'favorite_border'
                likes = item.likes-1
                batch.update(db.collection("posts").doc(item.id), {likes: likes})
            }
            batch.commit();
        }
    }

    handleDeletes = (e, item)=>{
        e.persist()
        var db = firebase.firestore()
        var batch = db.batch()
        if(item.id){
            batch.delete(db.collection("posts").doc(item.id))
            batch.commit();
        }
    }

    showComments =(doc)=>{
        if(doc.comments){
            return doc.comments.map((cmt, id)=> {
                return <p key={id}><strong>{cmt.commenter}</strong> {cmt.commentText}</p>
            })
        }
        else{
            return null
        }
    }

    renderPostLists = (posts)=>{
        return posts.map((item, id)=>{
            return(
                <div key={id} className="card z-depth-0">
                    <div className="card-title">
                        <span className="btn-floating pink z-depth-0 userLogo">
                            { (item.firstname || item.lastname) ? `${item.firstname[0]}${item.lastname[0]}` : "an" }
                        </span>
                        <span className="darkText">
                            { (item.firstname || item.lastname) ? `${item.username}` : "anonymous" }
                        </span>
                    </div>
                    <div className="card-image">
                        <img src={item.Image} alt={item.Image} />
                    </div>
                    <div className="card-content">
                    <div className="card-icons grey-text text-lighten-1">
                        <span onClick={(e)=> (this.handleLikes(e, item))}><i className="material-icons">favorite_border</i></span>
                        <span><i className="material-icons">chat_bubble_outline</i></span>
                        { this.props.username === item.username ?
                            <span onClick={(e)=> (this.handleDeletes(e, item))}><i className="material-icons right">delete_outline</i></span> : null
                        }
                    </div>
                    <p className="black-text darkText">{item.likes} likes</p>
                    <p className="grey-text text-lighten-1">{item.desc}</p>
                        {this.showComments(item)}
                    </div>
                    <div className="divider px-2"></div>
                    <div className="card-content">
                        <form onSubmit={(e)=> this.handleComments(e, item.id)}>
                        <input type="text" placeholder="Add a comment" onChange={this.handleChange} />
                        </form>
                    </div>
                </div>
            )
        })
    }
    
    render(){
        if(this.props.postsF.ordered.posts){
            let allPosts = this.props.postsF.ordered.posts
            return (
                <div className="section">
                    {this.renderPostLists(allPosts)}
                </div>
              )
        }
        else{
            return (
                <div className="section">
                    Loading...
                </div>
              )
        }
    }
}

const mapStateToProps = (state)=>{
        return{
            postsF : state.firestore,
            username : state.firebase.profile
        }
    
    
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'posts', orderBy: ['timestamp', 'desc']}
    ])
  )(PostDetail)