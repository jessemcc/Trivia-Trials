const BASE_URL = "https://the-trivia-api.com/api/questions"
const questionAmmount = "?limit=50";
const url = `${BASE_URL}${questionAmmount}`;
const questionElement = document.querySelector(".questions")
const answerContainer = document.querySelectorAll(".questions__card")

let randomIndex = (array) => {
    let randomNum = Math.floor(Math.random() * array.length);
    return randomNum;
}

axios
    .get(url)
    .then((result) => {
        console.log(result)
        renderQuestion(result)
})

const renderQuestion = (questionData) => {
    let question = questionData.data[0].question
    let answer = questionData.data[0].correctAnswer
    let falseAnswers = questionData.data[0].incorrectAnswers
    falseAnswers.push(answer)
    let allAnswers = falseAnswers

    console.log(allAnswers)

    let shuffledAnswers = falseAnswers.sort((a, b) => 0.5 - Math.random())

    console.log(shuffledAnswers)

    const questObject = {}
    questObject.question = question
    questObject.answer = answer
    questObject.shuffledAnswers = shuffledAnswers

    displayQuestion(questObject)
    
    const correctAnswerContainer = document.querySelector(".correct")
    const wrongAnswerContainer = document.querySelectorAll(".wrong")
    
    correctAnswerContainer.addEventListener('click', e => {
        //do something
        let x = document.querySelector(".correct")
        x.classList.add("right")
        let y = document.querySelectorAll(".wrong")
        y.forEach(item => item.classList.add("not-right"))
        alert("Correct!")
    })

    wrongAnswerContainer.forEach(item => {
        item.addEventListener('click', e => {
            alert("Wrong!")
            let x = document.querySelector(".correct")
            x.classList.add("right")
            let y = document.querySelectorAll(".wrong")
            y.forEach(item => item.classList.add("not-right"))
        })
    })
}

const displayQuestion = (questions) => {
    
    const title = document.createElement("h2")
    const article = document.createElement("article")
    
    title.classList.add("questions__question")
    article.classList.add("questions__cards")

    title.innerText = questions.question
    questionElement.appendChild(title)

    for (let answer of questions.shuffledAnswers) {

        const div = document.createElement("div")
        const answers = document.createElement("p")
        const span = document.createElement("span")
        span.classList.add("questions__card-pointer")

        div.classList.add("questions__card")
        answers.classList.add("questions__card-answer")

        if (questions.answer === answer) {
            div.classList.add("correct")
        } else {
            div.classList.add("wrong")
        }

        answers.innerText = answer

        div.appendChild(span)
        div.appendChild(answers)
        article.appendChild(div)
    }
    
    questionElement.appendChild(article)

}