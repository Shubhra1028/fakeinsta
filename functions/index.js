const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const createNotification = (notification => {
    return admin.firestore().collection('notifications').add(notification).then(
        doc => console.log('notif created', doc)
    )
})

exports.postCreated = functions.firestore.document('posts/{postsId}').onCreate(doc => {
    const post = doc.data();
    const notification = {
        content : 'created a post',
        user : `${post.firstname} ${post.lastname}`,
        username : `${post.username}`,
        time : admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);
})

exports.userCreated = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).get().then(doc => {
        const newUser = doc.data();
        const notification = {
            content : 'joined us',
            user : `${newUser.firstname} ${newUser.lastname}`,
            username : `${newUser.username}`,
            time : admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
    })
})