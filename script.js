const questions = [
  {
    question: "What is encapsulation in C++ ?",
    answers: [
      { text: "A way to inherit properties from another class", correct: false },
      { text: "A way to create multiple objects from a single class", correct: false },
      { text: "A way to hide data within an object", correct: true },
      { text: "A way to overload operators", correct: false }
    ]
  },
  {
    question: "What is polymorphism in C++ ?",
    answers: [
      { text: "The ability of objects of different classes to be treated as objects of a common type", correct: true },
      { text: "The ability to create multiple objects from a single class", correct: false },
      { text: "The ability to hide data within an object", correct: false },
      { text: "The ability to inherit properties from another class", correct: false }
    ]
  },
  {
    question: "What is inheritance in C++ ?",
    answers: [
      { text: "The ability to hide data within an object", correct: false },
      { text: "The ability to create multiple objects from a single class", correct: false },
      { text: "The ability of objects of different classes to be treated as objects of a common type", correct: false },
      { text: "The ability of a class to derive properties and methods from another class", correct: true },
    ]
  },
  {
    question: "What is an abstract class in C++ ?",
    answers: [
      { text: "A class that has only pure virtual functions", correct: false },
      { text: "A class that cannot be instantiated", correct: true },
      { text: "A class that has no data members", correct: false },
      { text: "A class that has only private members", correct: false }
    ]
  },
  {
    question: "What is a friend function in C++ ?",
    answers: [
      { text: "A member function that can be accessed by other classes", correct: false },
      { text: "A function that can be overloaded", correct: false },
      { text: "A non-member function that has access to the private members of a class", correct: true },
      { text: "A function that can be inherited", correct: false }
    ]
  }
];

// For Explaination https://www.notion.so/shivansh3103/QuizApp-18365d0d3f2d80d9847cfebc3bc22569?pvs=4

// Get references to the HTML elements
const question = document.getElementById('question');
const ansBtn = document.getElementById('ansBtn');
const nxtBtn = document.getElementById('nxtBtn');

// Variables to keep track of the current question and the user's score
let currQueIndex = 0;
let score = 0;

// Function to remove the options before displaying new question 
function resetState() {
  nxtBtn.style.display = 'none';   // Hide the "Next" button initially
  // Remove all existing answer buttons from the ansBtn element
  while (ansBtn.firstChild) {
    ansBtn.removeChild(ansBtn.firstChild);
  }
}

// Function to handle when the user selects an answer
function selectAns(option) {
  const clickedBtn = option.target;   // Get the button that was clicked
  const isCorrect = clickedBtn.dataset.correct === 'true';   // Check if the answer is correct

  if (isCorrect) {
    clickedBtn.classList.add('correct');  // Add a "correct" class to the button
    score++;  // Increase the score if the answer is correct
  } else {
    clickedBtn.classList.add('incorrect');  // Add an "incorrect" class to the button
  }

  // Disable all answer buttons and highlight the correct answer
  Array.from(ansBtn.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = 'true';  // Disable the button so it can't be clicked again
  });

  nxtBtn.style.display = 'block';  // Show the "Next" button
}

// Function to display the final score to the user
function showScore() {
  resetState();
  question.innerHTML = `You Scored ${score} out of ${questions.length} !`;
  nxtBtn.innerHTML = 'Play Again';
  nxtBtn.style.display = 'block';
}

// Function to handle the "Next" button click
function handleNextBtn() {
  currQueIndex++;  // Move to the next question

  if (currQueIndex < questions.length) {
    showQues();   // If there are more questions, display the next one
  } else {
    showScore();   // If all questions are answered, display the final score
  }
}

// Add an event listener to the "Next" button
nxtBtn.addEventListener('click', () => {
  if (currQueIndex < questions.length) {
    handleNextBtn();  // Go to the next question
  } else {
    start();  // Restart the quiz
  }
});

// Function to display the current question and its answer options
function showQues() {
  resetState();

  const currQue = questions[currQueIndex];  // Get the current question object
  const queNo = currQueIndex + 1;   // Calculate the question number
  question.innerHTML = `${queNo}. ${currQue.question}`;  // Display the question

  currQue.answers.forEach((option) => {
    const button = document.createElement('button');  // Create a button for each answer option
    button.innerHTML = option.text;  // Set the button text
    button.classList.add('btn');  // Add a CSS class to style the button
    ansBtn.appendChild(button);   // Add the button to the answer buttons container

    if (option.correct) {
      button.dataset.correct = option.correct;  // Store whether the answer is correct in the button's data attribute
    }

    button.addEventListener('click', selectAns);  // Add a click event listener to each button
  });
}

// Start the quiz when the page loads
function start() {
  currQueIndex = 0;
  score = 0;
  nxtBtn.innerHTML = 'Next';
  showQues();
}

start();