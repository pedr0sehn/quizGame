var body = document.body
var startQuizButton = document.querySelector('.startQuizButton')

// TO DO: make the credits button works

var credits = document.createElement('div')
credits.classList.add('coolButtonTemplate')
credits.textContent = "Créditos"
setTimeout(() => {
    body.appendChild(credits)
}, 500)

var multichoice
var trueorfalse
var clickState = false
var correctAnswers = 0

/* 
    each question array works like this: index0 = ask of the current question, the last index in the array is the answer for the question, 
    the penult is a variable called "trueorfalse" or "multichoise" these variables are just there for indentify what is the type of the question
*/

var question1 = ["2 + 2 is equal to:", "A) 22", "B) 44", "C) 4", "D) 0", multichoice, "c"]
var question2 = ["2 is even", "True", "False", trueorfalse, "False"]
var question3 = ["25 * 5 is equal to 125", "True", "False", trueorfalse, "False"]
var question5 = ["What are the first three digits of PI?", "3.14", "3.05", "3.33", "4.25", multichoice, "a"]
var question4 = ["15 / 3 is equal to 3", "True", "False", trueorfalse, "True"]
var question6 = ["The square root of 121 is:", "A) Doesn't exist", "B) 11", "C) 12", "D) 9", multichoice, "b"]
var question7 = ["60 / 3 * 5 is equal to:", "A) 20", "B) 15", "C) 100", "D) 4", multichoice, "d"]
var question8 = ["Exist negatives square roots", "True", "False", trueorfalse, "False"]
var question9 = ["0 is even or odd?", "A) odd", "B) even", "C) null", "D) nothing", multichoice, "b"]
var question10 = ["Is this question the 10th one", "True", "False", trueorfalse, "True"]

var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]

var currentNumber = 0
var pastCurrentNumber = currentNumber - 1

// TO DO: I need make something to currentQuestion be relative. im getting issues by passing currentNumber = 0 and the currentQuestion doesn't update his question[currentNumber]


function createQ() {
    if (currentNumber >= 0 && currentNumber < questions.length) {

        var currentQuestion = questions[currentNumber]
        var ask = currentQuestion[0]
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
                        console.log("you can't")
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

            answer1.innerText = "True"
            answer2.innerText = "False"
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
                            correctAnswers++
                            console.log(correctAnswers)
                        }
                    } else if (clickState == true) {
                        console.log("you can't")
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
            console.log("error")
        }
        console.log(currentNumber)
        console.log(currentQuestion)
        if (currentNumber == 10) {

            setTimeout(() => {
                var restartBtn = document.createElement('div')
                restartBtn.classList.add('coolButtonTemplate')
                restartBtn.innerText = "Restart Quiz"
                body.appendChild(restartBtn)
                restartBtn.addEventListener('click', () => {
                    restartBtn.classList.add('clicked')
                    setTimeout(() => {
                        location.reload()
                    }, 200)
                })
            }, 1000);
        }
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