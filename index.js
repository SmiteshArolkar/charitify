const firebaseConfig = {
  apiKey: "AIzaSyB8EKJo5p5V6k9BESm9bH21KkRzj_reUsM",
  authDomain: "charity-fd1c1.firebaseapp.com",
  projectId: "charity-fd1c1",
  storageBucket: "charity-fd1c1.appspot.com",
  messagingSenderId: "241811936478",
  appId: "1:241811936478:web:891e5f997854d124e01e4f",
  measurementId: "G-0689GGG8MW",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

firebase
  .auth()
  .onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      document.getElementById("login_li").style.display = "none"
      
      document.getElementById("main-body").style.display = "initial";
      document.getElementById("login-register").style.display = "none";
      console.log("User Signed in")

      var user = firebase.auth().currentUser;
      if(user != null)
      {
        var email_id = user.email;
        document.getElementById("UserName").textContent = email_id
      }
      // ...
    } else {

        document.getElementById("main-body").style.display = "none";
      
      // User is signed out
      // ...
    
      console.log("User Not signed in");
    }
  });



const login = document.getElementById("login_submit");
login.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("login");

  const email = document.getElementById("loginName").value;
  const password = document.getElementById("loginPassword").value;

  console.log(email, password);
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert(errorMessage)
    });
});

const register = document.getElementById("register_btn");
register.addEventListener('click',(e) => {
    e.preventDefault();
    console.log("Rgister user")
    Register();
})

function logout()
{
    var user = firebase.auth().currentUser;
    window.alert("Logout")
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        location.reload();
      }).catch((error) => {
        // An error happened.
      });
}

function Register()
{
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const name = document.getElementById("registerName").value;
    const username = document.getElementById("registerUsername").value;
    const repeat_pss = document.getElementById("registerRepeatPassword").value
    if(repeat_pss == password)
    {
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    db.collection("Users").add({
        name:name,
        email:email,
        username:username,
    })
    .then((docRef) => {
        docRef.update({
            id: docRef.id,
        })
    })
    .catch((e) => {
        console.log(e.code,e.message);
    })
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.code,error.message);
    window.alert(error.message)
    // ..
  });
}
else {
    window.alert("Password Does Not match Re- Enter Password ")
}
}

window.onclose