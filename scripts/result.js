
user = JSON.parse(localStorage.getItem("loggedInUser"));

function quizResult() {
    document.querySelector(".examinee-name").innerHTML = user.name;
    document.querySelector(".examinee-email").innerHTML = user.email;
    document.querySelector(".tot-question").innerHTML = 10;
    document.querySelector(".tot-attempt").innerHTML = user.attempt;
    document.querySelector(".tot-correct").innerHTML = user.correctAnswers;
    document.querySelector(".tot-wrong").innerHTML = user.attempt - user.correctAnswers;
    const percentage = (user.correctAnswers / 10) * 100;
    document.querySelector(".tot-percentage").innerHTML = percentage.toFixed(2) + "%";
    document.querySelector(".tot-score").innerHTML = user.correctAnswers + " / 10";

    showCorrectAnswers();
}

function showCorrectAnswers() {
    user.answers.forEach((el) => {

        let container = document.createElement("div");
        container.className = "question-container"
        let question = document.createElement("h2");

        question.innerHTML = el.q;

        let br1 = document.createElement("br");
        let br2 = document.createElement("br");
        let br3 = document.createElement("br");

        let correctAnswer = document.createElement("h3");



        let givenAnswer = document.createElement("h3");


        if (!el.givenAnswer) {
            correctAnswer.innerHTML = el.options[el.answer];
            correctAnswer.style.backgroundColor = "green";
            givenAnswer.innerHTML = "Not Answered";
            givenAnswer.style.backgroundColor = "red"
        } else {
            // givenAnswer.innerHTML = el.options[el.givenAnswer];
            if (el.answer == el.givenAnswer) {
                givenAnswer.innerHTML = el.options[el.answer];
                givenAnswer.style.backgroundColor = "green"
            } else {
                correctAnswer.innerHTML = el.options[el.answer];
                correctAnswer.style.backgroundColor = "green";
                givenAnswer.innerHTML = el.options[el.givenAnswer];
                givenAnswer.style.backgroundColor = "red"
            }
        }

        container.append(question, br1, correctAnswer, br2, givenAnswer, br3);
        document.getElementById("qna").append(container)
    })
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../index.html"
}

quizResult();