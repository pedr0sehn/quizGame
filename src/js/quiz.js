const body = document.body

const divStart = document.querySelector('.divStart')
const startQuizButton = document.querySelector('.startQuizButton')

var clickState = false
var correctAnswers = 0
var currentNumber = 0

const questions = [
    {
        questionsP: [

            {
                type: "multichoice",
                ask: "2 + 2 is equal to:",
                answers: [
                    { text: "22", correct: false },
                    { text: "44", correct: false },
                    { text: "4", correct: true },
                    { text: "0", correct: false }
                ]
            },
            {
                type: "boolean",
                ask: "2 is even",
                correct: "true"
            },
            {
                type: "boolean",
                ask: "25 * 5 is equal to 125",
                correct: "true"
            },
            {
                type: "multichoice",
                ask: "What are the first three numbers of PI?",
                answers: [
                    { text: "3.14", correct: true },
                    { text: "3.05", correct: false },
                    { text: "3.33", correct: false },
                    { text: "4.25", correct: false }
                ]
            },
            {
                type: "boolean",
                ask: "15 / 3 is equal to 3",
                correct: "false"
            },
            {
                type: "multichoice",
                ask: "The square root of 121 is:",
                answers: [
                    { text: "Not exist", correct: false },
                    { text: "11", correct: true },
                    { text: "12", correct: false },
                    { text: "9", correct: false }
                ]
            },
            {
        
                type: "multichoice",
                ask: "60 / 3 * 5 is equal to:",
                answers: [
                    { text: "15", correct: false },
                    { text: "20", correct: false },
                    { text: "100", correct: false },
                    { text: "4", correct: true }
                ]
        
            },
            {
        
                type: "boolean",
                ask: "Exist negatives square roots",
                correct: "false"
        
            },
            {
        
                type: "multichoice",
                ask: "0 is:",
                answers: [
                    { text: "odd", correct: false },
                    { text: "even", correct: true },
                    { text: "positive", correct: false },
                    { text: "negative", correct: false }
                ]
        
            },
            {
        
                type: "boolean",
                ask: "Is this question the 10th one",
                correct: "true"
        
            }
            
        ]
    }
]

var question = document.querySelector('.question');

function createQ() {

    var currentQuestion = questions[0].questionsP[currentNumber]

    const answersDiv = document.querySelector('.divAnswers');
    clickState = false

    if (currentQuestion.type == "multichoice") {
        createMultichoiceQuestion()
    } else if (currentQuestion.type == "boolean") {
        createBooleanQuestion()
    }
    function createMultichoiceQuestion() {

        question.innerText = currentQuestion.ask

        let answer1 = document.createElement('div')
        let answer2 = document.createElement('div')
        let answer3 = document.createElement('div')
        let answer4 = document.createElement('div')

        answer1.classList.add('answers', 'divButtonTemplate')
        answer2.classList.add('answers', 'divButtonTemplate')
        answer3.classList.add('answers', 'divButtonTemplate')
        answer4.classList.add('answers', 'divButtonTemplate')

        let answer = [answer1, answer2, answer3, answer4]

        for (let i = 0; i < 4; i++) {
            let j = "abcd"
            answer[i].classList.add(`${j[i]}`)
            answer[i].textContent = currentQuestion.answers[i].text
        }
        answer.forEach(answers => {
            answers.addEventListener('click', () => {
                if (clickState == false) {
                    clickState = true
                    answers.classList.remove('clicked')
                    answers.classList.add('clicked')
                
                    for(let i = 0; i < currentQuestion.answers.length;i++){
                        if (answers.innerText == currentQuestion.answers[i].text && currentQuestion.answers[i].correct == true) {
                            correctAnswers++
                        }
                    }
                    setTimeout(() => {
                        ++currentNumber
                        answer.map( a => {
                            a.remove()
                        })
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

        answersDiv.appendChild(answer1)
        answersDiv.appendChild(answer2)
        answersDiv.appendChild(answer3)
        answersDiv.appendChild(answer4)
    }

    function createBooleanQuestion() {

        question.innerText = currentQuestion.ask

        let answer1 = document.createElement('div')
        let answer2 = document.createElement('div')

        answer1.classList.add('answers', 'true', 'divButtonTemplate')
        answer2.classList.add('answers', 'false', 'divButtonTemplate')
        answer1.innerText = "True"
        answer2.innerText = "False"

        let answer = [answer1, answer2]

        answer.forEach(answers => {
            answers.addEventListener('click', () => {
                if (clickState == false) {
                    clickState = true
                    answers.classList.remove('.clicked')
                    answers.classList.add('clicked')


                    if (answers.innerText.toLocaleLowerCase() == currentQuestion.correct) {
                        correctAnswers++
                    }
                    setTimeout(() => {
                        ++currentNumber
                        answer.map( a => {
                            a.remove()
                        })
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
        answersDiv.appendChild(answer1)
        answersDiv.appendChild(answer2)
    }
}

function generateRestart() {
    question.innerText = ""
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

let startQuizClickState = false

startQuizButton.addEventListener('click', () => {
    startQuizClickState = true
    if (startQuizClickState == true) {
        startQuizButton.classList.add('clicked')
        setTimeout(() => {
            divStart.remove()
            createQ()
        }, 700);
    }
})
