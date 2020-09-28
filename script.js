const firebaseConfig = {
    apiKey: "AIzaSyCJo6UuFTI9M-813L0BHIN-0kDbTfzPdR0",
    authDomain: "cpeg470-scattegories-a4955.firebaseapp.com",
    databaseURL: "https://cpeg470-scattegories-a4955.firebaseio.com",
    projectId: "cpeg470-scattegories-a4955",
    storageBucket: "cpeg470-scattegories-a4955.appspot.com",
    messagingSenderId: "372518034210",
    appId: "1:372518034210:web:fceb7dbe02673231cb637b"
  };

firebase.initializeApp(firebaseConfig);
const myDatabase = firebase.database();

//Initialize the gameRunnin ref to be false
myDatabase.ref("gameRunning").set(false);

const categoriesRef = myDatabase.ref('categories');

//Initialize the input fields to be disabled
var categoriesInputs = document.querySelectorAll(".categoriesInput");
for(let i = 0; i < categoriesInputs.length; i++){
  categoriesInputs[i].disabled = true;
};

//Helper function just to disable / enable the input fields for categories
function changeCategoriesInputs(){
  for(let i = 0; i < categoriesInputs.length; i++){
    categoriesInputs[i].disabled = !categoriesInputs[i].disabled;
  };
};

//Helper function that clears input fields for categories
function clearCategoriesInputs(){
  for(let i = 0; i < categoriesInputs.length; i++){
    categoriesInputs[i].value = '';
  }
}

//Generates a new random list of 10 categories
function genNewList(){
  categoriesRef.once('value', function(dataSnapshot){
    let allCategories = dataSnapshot.val();
    let randomCategoriesSet = document.querySelector('.categoriesList');
    randomCategoriesSet.innerHTML = "";
    let randomIdx;
    let categoryElement;
    for(let i = 0; i < 10; i++){
      randomIdx = Math.round(Math.random()* 143);
      categoryElement = "<li class='category'>" + allCategories[randomIdx] + "</li>";
      randomCategoriesSet.innerHTML += categoryElement;
    }
  })
};

//Generates a random new letter
function genNewLetter(){
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let idx = Math.round(Math.random() * (alphabet.length - 1));
  let letter = alphabet[idx];
  document.querySelector(".theLetter").textContent = letter;
};

//Starts the timer, and handles what happens when the timer stops
function startTimer(){
  //var timeLeft = document.querySelector('.theTimer').innerHTML;
  var timeLeft = 120;
    let timerFunction = setInterval(function(){
      if(timeLeft <= 0){
        myDatabase.ref("gameRunning").set(false);
        changeCategoriesInputs();
        clearInterval(timerFunction);
      }
      document.querySelector('.theTimer').textContent = timeLeft;
      timeLeft = timeLeft - 1;
   }, 1000);
}

/*
document.getElementById('genNewListBtn').addEventListener("click", genNewList);
document.getElementById("genNewLetterBtn").addEventListener("click", genNewLetter);
document.getElementById("timerBtn").addEventListener("click", startTimer);
*/

//Helper funciton - will disable the start button when the game is running
myDatabase.ref("gameRunning").on("value", function(dataSnapshot){
  let isRunning = dataSnapshot.val();
  if(isRunning === true){
    document.getElementById("startBtn").disabled = true;
  }
  if(isRunning === false){
    document.getElementById("startBtn").disabled = false;
  }
})

document.getElementById("startBtn").addEventListener("click", function(event){
  myDatabase.ref("gameRunning").set(true);
  changeCategoriesInputs();
  clearCategoriesInputs();
  genNewList();
  genNewLetter();
  startTimer();
});
