const firebaseConfig = {
    apiKey: "AIzaSyCLONgiReZCAJjU4lXaoNRxph8g6EtoO5Q",
    authDomain: "cpeg470-auth-practice.firebaseapp.com",
    databaseURL: "https://cpeg470-auth-practice.firebaseio.com",
    projectId: "cpeg470-auth-practice",
    storageBucket: "cpeg470-auth-practice.appspot.com",
    messagingSenderId: "221574779187",
    appId: "1:221574779187:web:61eba811e6387ebedbae46"
};

firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(user => {
  //alert('function called');
  if (!!user){
    //console.log(JSON.stringify(user));
    $('#googleWrapper').html('');
    $('#emailWrapper').html('');
    $('#emailWrapper').append(`<h1>Success! Thank you, ${user.email}</h1>`);
    //$('#wrapper').append(`<button class="signOut"> ${'Sign Out'} </button>`);
    /* Broken right now
    $('.signOut').addEventListener("click", function(event){
      console.log("CATCH");
      firebase.auth().signOut();
    });
    */
  }
    //alert(`${user.displayName || user.email}`);
  else{
    alert('no user signed in.');
  }
});

let provider = new firebase.auth.GoogleAuthProvider();

let googleBtn = document.getElementById("googleBtn");

googleBtn.addEventListener("click", function(event){
  firebase.auth().signInWithRedirect(provider);
});

firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    let token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  let user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  let email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  let credential = error.credential;
  // ...
});

/*
firebase.auth()
  .signInWithEmailAndPassword(
    "junk@novocin.com", 
    "fartfart"
   ).catch(function(error) {
          alert(error.message);
   }
);
*/


let sign = document.getElementById("submitBtn");
let reg = document.getElementById("regBtn");

let regUser = function(email, password){
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
    let errorCode = error.code;
    let errorMessage = error.message;
    switch(errorCode){
      case 'auth/email-already-in-use':
        alert('Email is already associated with another account.');
        break;
      case 'auth/invalid-email':
        alert('Entered an invalid email address.');
        break;
      case 'auth/operation-not-allowed':
        alert("Error code: " + errorCode + " Error message: " + errorMessage);
        break;
      case 'auth/weak-password':
        alert('Password is too weak.');
        break;
      default:
        alert("Error code: " + errorCode + " Error message: " + errorMessage);
    }
    console.log(error);
  });
};

let signUser = function(email, password){
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
    let errorCode = error.code;
    let errorMessage = error.message;
    switch(errorCode){
      case 'auth/invalid-email':
        alert('Invalid email address.');
        break;
      case 'auth/user-disabled':
        alert('Account has been disabled.');
        break;
      case 'auth/user-not-found':
        alert('No account found associated with this email.');
        break;
      case 'auth/wrong-password':
        alert("Incorrect email or password.");
        break;
      default:
        alert("Error code: " + errorCode + " Error message: " + errorMessage);
    }
    console.log(error);
  });
}

sign.addEventListener("click", function(event){
  let email = document.getElementById("emailText").value;
  let password = document.getElementById("passwordText").value;
  signUser(email,password);
});

reg.addEventListener("click", function(event){
  let email = document.getElementById("emailText").value;
  let password = document.getElementById("passwordText").value;
  regUser(email,password);
});
