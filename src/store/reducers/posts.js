const initState = {
    posts : []
}

const postReducer  = (state = initState, action) => {
    switch(action.type){
        case "GET_POST" : 
            return {...state, posts: action.posts.data};
        case "ADD_POST_FIREBASE" : 
            console.log( state.posts)
            return {...state, posts: state.posts.concat(action.posts)}
        case "ADD_POST":
            console.log('Post ', state.posts)
            return {...state, posts: [...state.posts, ...state.firestore.ordered.posts]}
        default:
            return state;
    }
}

export default postReducer;