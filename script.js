const options = document.querySelector('.options').children;
const question = document.querySelector('.question');
const questionNum = document.querySelector('.questionNumValue');
const totalQuestion = document.querySelector('.totalQuestion');
const opt1 = document.querySelector('.option1');
const opt2 = document.querySelector('.option2');
const opt3 = document.querySelector('.option3');
const answersTrackerContainer = document.querySelector('.answersTracker');
const correctAnswer = document.querySelector('correctAnswers');
const totalAnswered = document.querySelector('totalAnswered');
let questionIndex = 1;
let index = -1;
let myArray = [];
let myArr = [];
let score = 0;

const questions = [
    {
        q: 'The Asian Delicacy known as bird’s nest soup is made primarily from what?',
        opts: ['Bird’s nest', 'Fried Noodles', 'Shredded Lettuce'],
        answer: 0
    },
    {
        q: 'According to the US gov, which of these is correct?',
        opts: ['Daylight Savings Time', 'Daylight Saving Time', 'Daylight Saving’s Time'],
        answer: 1
    },
    {
        q: 'Which of these cities has the biggest bike-share program?',
        opts: ['Paris', 'New York', 'Amsterdam'],
        answer: 2
    },
    {
        q: 'Which of these Robbin Williams movies is based on a novel?',
        opts: ['Mrs. Doubtfire', 'Dead Poets Society', 'Good Morning, Vietnam'],
        answer: 0
    },
    {
        q: 'Before Creating Hotmail, the two founders previously worked together where?',
        opts: ['Gmail', 'FaceBook', 'Apple'],
        answer: 2
    }
]

totalQuestion.innerHTML = questions.length;

function load() {
    questionNum.innerHTML = index+1;
    question.innerHTML = questions[questionIndex].q;
    opt1.innerHTML = questions[questionIndex].opts[0];
    opt2.innerHTML = questions[questionIndex].opts[1];
    opt3.innerHTML = questions[questionIndex].opts[2];
    index++;
}

function validate () {
    if (!options[0].classList.contains('disabled')) {
        alert('Please Select an answer')
    } else {
        enabledOptions()
        load(); //else randomQuestion()
    }
}

function validate() {
    if (!options[0].classList.contains('disabled')) {
        alert('Please selecet an answer');
    } else {
        randomQuestion();
        enabledOptions();
    }
}

function next() {
    validate();
}

function check(element) {
    if (element.id == questions[questionIndex].answer){
        element.classList.add('correct');
        updateAnswerTracker('correct')
        score++;
    } else {
        element.classList.add('wrong');
        updateAnswerTracker('wrong')
    }
    disabledOptions()
}


function disabledOptions() {
    for(let i = 0; i < options.length; i++) {
        options[i].classList.add('disabled');
        if(options[i].id == questions[questionIndex].answer){
            options[i].classList.add('correct');
        }
    }
}

function enabledOptions() {
    for(let i = 0; i < options.length; i++) {
        options[i].classList.remove('disabled', 'correct', 'wrong');
    }
}

function randomQuestion() {
    let randomNumber = Math.floor(Math.random()*questions.length);
    let hitDublicate = 0;
        if (index == questions.length){
            quizOver()
        } else {
            if(myArray.length > 0) {
                for(let i = 0; i < myArray.length; i++){
                    if (myArray[i] == randomNumber) {
                        hitDublicate = 1;
                        break;
                    }
                }
                if (hitDublicate == 1) {
                    randomQuestion();
                } else {
                    questionIndex = randomNumber;
                    load();
                    myArray.push(randomNumber);
                }
            }
            if(myArray.length == 0) {
                questionIndex = randomNumber;
                load();
                myArr.push(questionIndex);
            }
            myArray.push(randomNumber);
        }       
}

function answerTracker() {
    for(let i = 0; i < questions.length; i++) {
        const div = document.createElement('div');
        answersTrackerContainer.appendChild(div);
    }
}

function updateAnswerTracker(classNam) {
    answersTrackerContainer.children[index-1].classList.add(classNam);
}

function quizOver() {
    document.querySelector('.quizOver').classList.add('show');
    correctAnswer.innerHTML = score;
    totalAnswered.innerHTML = questions.length;
}

function tryAgain() {
    window.location.reload();
}

window.onload = function() {
    this.load();
    answerTracker()
    this.randomQuestion()
}

