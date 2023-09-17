var body = document.body

var divStart = document.querySelector('.divStart')
var startQuizButton = document.querySelector('.startQuizButton')
// TO DO: make the credits button works
var credits = document.querySelector('.credits')


var multichoice
var trueorfalse
var clickState = false
var correctAnswers = 0

/* 
    each question array works like this: index0 = ask of the current question, the last index in the array is the answer for the question, 
    the penult is a variable called "trueorfalse" or "multichoise" these variables are just there for indentify what is the type of the question
*/

var question1 = ["2 + 2 is equal to:", "a) 22", "b) 44", "c) 4", "d) 0", multichoice, "c"]
var question2 = ["2 is even", "True", "False", trueorfalse, "True"]
var question3 = ["25 * 5 is equal to 125", "True", "False", trueorfalse, "True"]
var question5 = ["What are the first three digits of PI?", "a) 3.14", "b) 3.05", "c) 3.33", "d) 4.25", multichoice, "a"]
var question4 = ["15 / 3 is equal to 3", "True", "False", trueorfalse, "False"]
var question6 = ["The square root of 121 is:", "A) Doesn't exist", "B) 11", "C) 12", "D) 9", multichoice, "b"]
var question7 = ["60 / 3 * 5 is equal to:", "A) 20", "B) 15", "C) 100", "D) 4", multichoice, "d"]
var question8 = ["Exist negatives square roots", "True", "False", trueorfalse, "False"]
var question9 = ["0 is even or odd?", "A) odd", "B) even", "C) null", "D) nothing", multichoice, "b"]
var question10 = ["Is this question the 10th one", "True", "False", trueorfalse, "True"]

var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]

var currentNumber = 0
var pastCurrentNumber = currentNumber - 1

function createQ() {
    if (currentNumber >= 0 && currentNumber < questions.length) {

        var currentQuestion = questions[currentNumber]
        var ask = currentQuestion[0]
        var createQuestion = document.createElement('h2')
        clickState = false

        var checkAnswer = () => {
            let typeQuestion
            if (currentQuestion.length == 5) {
                typeQuestion = "trueorfalse"
            } else if (currentQuestion.length == 7) {
                typeQuestion = "multichoice"
            }
            return typeQuestion
        }

        if (checkAnswer() == "multichoice") {
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

            for (let i = 0; i < 4; i++) {
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
                        if (answers.innerText[0] == currentQuestion[6]) {
                            correctAnswers++
                        }
                        setTimeout(() => {
                            createQuestion.remove()
                            answersDiv.remove()
                            ++currentNumber
                            if (currentNumber >= 0 && currentNumber < 10) {
                                createQ()
                                answerText.forEach(textA => {
                                    textA.remove()
                                })
                            } else if (currentNumber == 10) {
                                generateRestart()
                            }
                        }, 700);
                    } else if (clickState == true) {
                        alert("You can't click two buttons at once")
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

        } else if (checkAnswer() == "trueorfalse") {
            createQuestion.classList.add('question')
            createQuestion.innerText = `${ask}`

            let answersDiv = document.createElement('div')

            let answer1 = document.createElement('div')
            let answer2 = document.createElement('div')

            answersDiv.classList.add('divAnswers')
            answer1.classList.add('answers')
            answer2.classList.add('answers')
            answer1.classList.add('true')
            answer2.classList.add('false')
            answer1.classList.add('divButtonTemplate')
            answer2.classList.add('divButtonTemplate')

            let answer = [answer1, answer2]

            answer1.innerText = "True"
            answer2.innerText = "False"
            answer.forEach(answers => {
                answers.addEventListener('click', () => {
                    if (clickState == false) {
                        clickState = true
                        answers.classList.remove('.clicked')
                        answers.classList.add('clicked')
                        if (answers.innerText == currentQuestion[4]) {
                            correctAnswers++
                        }
                        setTimeout(() => {
                            createQuestion.remove()
                            answersDiv.remove()
                            ++currentNumber
                            if (currentNumber >= 0 && currentNumber < 10) {
                                createQ()
                            } else if (currentNumber == 10) {
                                generateRestart()
                            }
                        }, 700);
                    } else if (clickState == true) {
                        alert("You can't click two buttons at once")
                    }
                })
            })
            body.appendChild(createQuestion)
            body.appendChild(answersDiv)
            answersDiv.appendChild(answer1)
            answersDiv.appendChild(answer2)
        }
    }
}

function generateRestart() {
    if (currentNumber == 10) {

        setTimeout(() => {

            var score = document.createElement('h2')
            score.classList.add('turnOnVisible')
            score.innerText = `You got ${correctAnswers} of 10 answers right`

            var restartBtn = document.createElement('div')
            restartBtn.classList.add('coolButtonTemplate')
            restartBtn.innerText = "Restart Quiz"

            body.appendChild(score)
            body.appendChild(restartBtn)
            restartBtn.addEventListener('click', () => {
                restartBtn.classList.add('clicked')
                setTimeout(() => {
                    location.reload()
                }, 200)
            })
        }, 250);

    }
}

startQuizButton.addEventListener('click', () => {
    startQuizButton.classList.add('clicked')
    setTimeout(() => {
        divStart.remove()
        createQ()
    }, 700);
})
