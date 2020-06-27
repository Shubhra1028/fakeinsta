// import axios from 'axios'

export const createPosts = (post) => {
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('posts').add({
            ...post,
            firstname : post.firstname,
            lastname: post.lastname,
            username: post.username,
            likes: 0,
            timestamp : new Date()
        }).then(()=> {
            dispatch({
                type : "ADD_POST",
                posts : getState().firestore.ordered.posts
            })
        }).catch((err)=>{
            dispatch({
                type : "ADD_PROJECT_ERR",
                err
            })
        })
    }
}

// export const getPosts = ()=>{
//         return (dispatch, getState) =>{
//             axios.get("http://starlord.hackerearth.com/insta").then(response => {
//                 dispatch({
//                     type : "GET_POST",
//                     posts : response
//                 })
//             }) 
//         }
// }

export const addPosts = (post)=>{
    return (dispatch) =>{
            dispatch({
                type : "ADD_POST_FIREBASE",
                posts : post
            }) 
    }
}