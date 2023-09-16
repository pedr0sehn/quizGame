var body = document.body
var startQuizButton = document.querySelector('.startQuizButton')

var credits = document.createElement('div')
credits.classList.add('coolButtonTemplate')
credits.textContent = "Créditos"
setTimeout(() => {
    body.appendChild(credits)
}, 500)

var multichoice
var trueorfalse
var clickState = false
var acertos = 0

/* 
    each question array works like this: index0 = ask of the current question, the last index in the array is the answer for the question, 
    the penult is a variable called "trueorfalse" or "multichoise" these variables are just there for indentify what is the type of the question
*/

var question1 = ["Quais são os seguintes países dos BRICS:", "A) Bangladesh, Russia, Indonésia, Casaquistão e Sudão do Sul", "B) Bulgaria, Romênia, India, China e Singapura", "C) Brasil, Russia, India, China e Africa do Sul", "D) Brazil, Russia, Indonésia, China e Singapura", multichoice, "c"]
var question2 = ["Oi", "1", "0", trueorfalse, "Verdadeiro"]
var question3 = ["A", "I", "O", trueorfalse, "Verdadeiro"]
var question5 = ["E", "I", "O", multichoice, "a"]
var question4 = ["R", "I", "O", trueorfalse, "Verdadeiro"]
var question6 = ["S", "I", "O", multichoice, "b"]
var question7 = ["T", "I", "O", multichoice, "d"]
var question8 = ["U", "I", "O", trueorfalse, "Verdadeiro"]
var question9 = ["V", "I", "O", trueorfalse, "Verdadeiro"]
var question10 = ["X", "I", "O", trueorfalse, "Verdadeiro"]

var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]

var currentNumber = 0
var pastCurrentNumber = currentNumber - 1

function checkCurrentNumber(){
    setInterval(()=>{
        console.log(currentNumber)
        return currentNumber
    }, 2000)
}

var currentQuestion
currentQuestion = questions[checkCurrentNumber()]

var ask = currentQuestion[0]

function createQ() {
    var createQuestion = document.createElement('h2')
    clickState = false

    var checkAnswer = () => {
        if (currentQuestion.includes(multichoice)) {
            return 4
        } else {
            return 2
        }
    }

    if (checkAnswer() == 4) {
        createQuestion.classList.add('question')
        createQuestion.innerText = `${ask}`

        let answersDiv = document.createElement('div')

        let answer1 = document.createElement('div')
        let answer2 = document.createElement('div')
        let answer3 = document.createElement('div')
        let answer4 = document.createElement('div')
        let answerText1 = document.createElement('h3')
        let answerText2 = document.createElement('h3')
        let answerText3 = document.createElement('h3')
        let answerText4 = document.createElement('h3')

        answersDiv.classList.add('divAnswers')
        answer1.classList.add('answers', 'divButtonTemplate')
        answer2.classList.add('answers', 'divButtonTemplate')
        answer3.classList.add('answers', 'divButtonTemplate')
        answer4.classList.add('answers', 'divButtonTemplate')

        let answer = [answer1, answer2, answer3, answer4]
        let answerText = [answerText1, answerText2, answerText3, answerText4]

        for (let i = 0; i < checkAnswer(); i++) {
            let j = "abcd"
            answer[i].classList.add(`${j[i]}`)
            answerText[i].classList.add(`${j[i]}`)
            answerText[i].textContent = `${currentQuestion[i + 1]}`
            answer[i].textContent = `${j[i] + ")".toUpperCase()}`
        }
        answer.forEach(answers => {
            answers.addEventListener('click', () => {
                if (clickState == false) {
                    clickState = true
                    answers.classList.remove('clicked')
                    answers.classList.add('clicked')
                    setTimeout(() => {
                        answersDiv.remove()
                        createQuestion.remove()
                        ++currentNumber
                    }, 1000);
                } else if (clickState == true) {
                    console.log("não")
                }
            })
        })

        body.appendChild(createQuestion)
        body.appendChild(answerText1)
        body.appendChild(answerText2)
        body.appendChild(answerText3)
        body.appendChild(answerText4)
        body.appendChild(answersDiv)
        answersDiv.appendChild(answer1)
        answersDiv.appendChild(answer2)
        answersDiv.appendChild(answer3)
        answersDiv.appendChild(answer4)

    } else if (checkAnswer() == 2) {

        createQuestion.classList.add('question')
        createQuestion.innerText = `${ask}`

        let answersDiv = document.createElement('div')

        let answer1 = document.createElement('div')
        let answer2 = document.createElement('div')
        let answerText1 = document.createElement('h3')
        let answerText2 = document.createElement('h3')

        answersDiv.classList.add('divAnswers')
        answer1.classList.add('answers')
        answer2.classList.add('answers')
        answer1.classList.add('divButtonTemplate')
        answer2.classList.add('divButtonTemplate')

        let answer = [answer1, answer2]
        let answerText = [answerText1, answerText2]

        answer1.innerText="Verdadeiro"
        answer2.innerText="Falso"
        answer.forEach(answers => {
            answers.addEventListener('click', () => {
                if (clickState == false) {
                    clickState = true
                    answers.classList.remove('.clicked')
                    answers.classList.add('clicked')
                    setTimeout(() => {
                        answersDiv.remove()
                        createQuestion.remove()
                        answerText.forEach(text => {
                            text.remove()
                        })
                        ++currentNumber
                    }, 1000);
                    if (answer1.textContent[0] == currentQuestion[6]) {
                        acertos++
                        console.log(acertos)
                    }
                } else if (clickState == true) {
                    console.log("não")
                }
            })
        })
        body.appendChild(createQuestion)
        body.appendChild(answerText1)
        body.appendChild(answerText2)
        body.appendChild(answersDiv)
        answersDiv.appendChild(answer1)
        answersDiv.appendChild(answer2)
    } else {
        console.log("erro")
    }
    console.log(currentNumber)
    console.log(currentQuestion)
}


function quiz() {
    if (currentNumber === pastCurrentNumber && currentNumber < 10) {

    } else {
        createQ()
    }
}

startQuizButton.addEventListener('click', () => {
    startQuizButton.classList.add('clicked')
    setTimeout(() => {
        credits.classList.add('clicked')
    }, 120)
    setTimeout(() => {
        createQ()
        credits.remove()
        startQuizButton.remove()
    }, 400);
})
if (currentNumber == 10) {

    setTimeout(() => {
        var restartBtn = document.createElement('div')
        restartBtn.classList.add('coolButtonTemplate')
        restartBtn.innerText = "Reiniciar Quiz"
        body.appendChild(restartBtn)
        restartBtn.addEventListener('click', () => {
            restartBtn.classList.add('clicked')
            setTimeout(() => {
                location.reload()
            }, 200)
        })
    }, 1000);
}