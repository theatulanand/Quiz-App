const questionNumber = document.querySelector(".question-no");
const questionText = document.querySelector(".question-text");
const optionsContainer = document.querySelector(".opt-container");
const answerIndicatorContainer = document.querySelector(".ans-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const name = document.querySelector(".name");
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const answers = [];


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// checking if User is loggedIn or not
if (!user) {
	alert("Please Login first to start the quiz");
	window.location.href = "../index.html";
}

// checking if user is already attempted the test or not
if (user.answers) {
	// if user is already attempted the quiz 
	document.getElementById("start-quiz-btn").innerHTML = "Attempt Again"
}

// Show the name of user on quiz page
document.getElementById("userName").innerHTML = "Examinee Name : " + user.name;
document.querySelector(".examinee-name").innerHTML = user.name;
document.querySelector(".examinee-email").innerHTML = user.email;

//Push the questions into availableQuestions array
function setAvailableQuestions() {
	const totalQuestions = quiz.length;
	for (let i = 0; i < totalQuestions; i++) {
		availableQuestions.push(quiz[i])
	}
}

//set question number and question and options
function getNewQuestion() {

	document.getElementById("skipBtn").innerHTML = "Skip"

	//set question number
	questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of 10";

	//set question text
	// fetch a random question
	const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
	currentQuestion = questionIndex;
	questionText.innerHTML = currentQuestion.q;
	answers.push(currentQuestion);
	//get the position of 'questionIndex' from the avaible questions array;
	const index1 = availableQuestions.indexOf(questionIndex);
	//remove the 'questionIndex' from the avaibaleQuestion array,so the question won't repeate again
	availableQuestions.splice(index1, 1);


	//set Options
	//fetch the length of the options
	const optionLen = currentQuestion.options.length;
	//push options in availableOptions array
	for (let i = 0; i < optionLen; i++) {
		availableOptions.push(i)
	}

	optionsContainer.innerHTML = '';
	let animationDelay = 0.15;
	//create options in HTML
	for (let i = 0; i < optionLen; i++) {
		//random option
		const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
		//get the position of 'OptionIndex' from the availableOptions
		const index2 = availableOptions.indexOf(optionIndex);
		//removes the 'optionIndex' from the availableOptions, so that option does not repeat
		availableOptions.splice(index2, 1);
		const option = document.createElement("div");
		option.innerHTML = currentQuestion.options[optionIndex];
		option.id = optionIndex;
		option.style.animationDelay = animationDelay + 's';
		animationDelay = animationDelay + 0.15;
		option.className = "option";
		optionsContainer.appendChild(option);
		option.setAttribute("onclick", "getResult(this)");
	}

	questionCounter++
}

//fetch the result of current attempt question
function getResult(element) {
	document.getElementById("skipBtn").innerHTML = "Next"
	const id = parseInt(element.id);
	answers.pop();
	console.log(currentQuestion);
	currentQuestion.givenAnswer = id;
	answers.push(currentQuestion);
	//fetch the answer by comparing the id of clicked option
	if (id === currentQuestion.answer) {
		//set the green color to the correct option
		element.classList.add("correct");
		// add the indicator correct mark
		updateAnswerIndicator("correct");
		correctAnswers++;
		console.log("correct:" + correctAnswers);
	}
	else {
		//set the red color to the wrong option
		element.classList.add("wrong");
		// add the indicator wrong mark
		updateAnswerIndicator("wrong");

		// if the answer is incorrect, show the correct option
		const optionLen = optionsContainer.children.length;
		for (let i = 0; i < optionLen; i++) {
			if (parseInt(optionsContainer.children[i].id) === currentQuestion.answer) {
				optionsContainer.children[i].classList.add("correct");
			}
		}
	}
	attempt++;
	unclickableOptions();
}

// Restrict the user to select an option, when once selected
function unclickableOptions() {
	// body...
	const optionLen = optionsContainer.children.length;
	for (let i = 0; i < optionLen; i++) {
		optionsContainer.children[i].classList.add("already-answered");
	}
}


function answerIndicator() {
	answerIndicatorContainer.innerHTML = '';
	const totalQuestions = quiz.length;
	for (let i = 0; i < 10; i++) {
		const indicator = document.createElement("div");
		answerIndicatorContainer.appendChild(indicator);
	}
}
function updateAnswerIndicator(markType) {
	answerIndicatorContainer.children[questionCounter - 1].classList.add(markType)
}


function next() {
	if (questionCounter === 10) {
		console.log("Quiz Over!");
		quizOver();
	}
	else {
		getNewQuestion();
	}
}


function quizOver() {
	// hide quiz box
	quizBox.classList.add("hide");
	//show result box
	resultBox.classList.remove("hide");

	// Saving answered question to local storage with respective user;
	const users = JSON.parse(localStorage.getItem("users"));
	const filteredUsers = users.filter((el) => el.email != user.email);
	user.answers = answers;
	user.correctAnswers = correctAnswers;
	user.attempt = attempt;
	filteredUsers.push(user);
	localStorage.setItem("users", JSON.stringify(filteredUsers));
	localStorage.setItem("loggedInUser", JSON.stringify(user));
	quizResult();
}

function quizResult() {
	resultBox.querySelector(".examinee-name").innerHTML = user.name;
	resultBox.querySelector(".examinee-email").innerHTML = user.email;
	resultBox.querySelector(".tot-question").innerHTML = 10;
	resultBox.querySelector(".tot-attempt").innerHTML = attempt;
	resultBox.querySelector(".tot-correct").innerHTML = correctAnswers;
	resultBox.querySelector(".tot-wrong").innerHTML = attempt - correctAnswers;
	const percentage = (correctAnswers / 10) * 100;
	resultBox.querySelector(".tot-percentage").innerHTML = percentage.toFixed(2) + "%";
	resultBox.querySelector(".tot-score").innerHTML = correctAnswers + " / 10";
}



function startQuiz() {
	// hide home box
	homeBox.classList.add("hide");
	// shows quiz box
	quizBox.classList.remove("hide");

	//First we will set all questions in avaibleQuestins array
	setAvailableQuestions();
	//Secondly we will call getNewQuestion() function
	getNewQuestion();
	// to create answer indicators
	answerIndicator();
}

function rEload() {

	quizBox.classList.add("hide");

	homeBox.classList.remove("hide");
	resetQuiz();
}

function logout() {
	localStorage.removeItem("loggedInUser");
	window.location.href = "../index.html"
}

function viewDetailedResult() {
	window.location.href = "../pages/result.html"
}