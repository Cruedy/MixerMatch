import { db, ref, push, set  } from "./firebase.js";

const questions = [
    {
        question: "What's your name",
        inputType: "textBox",
        options: ["Null"]
    },
    {
        question: "Which team are you on?",
        inputType: "choice",
        options: [
            "Swim and Dive",
            "Womens Water Polo",
            "Mens Water Polo"
        ]
    },
    {
        question: "Which team are you on?",
        inputType: "choice",
        options: [
            "Swim and Dive",
            "Womens Water Polo",
            "Mens Water Polo"
        ]
    },
    {
        question: "Are you in a committed relationship already?",
        inputType: "choice",
        options: [
            "yes",
            "no"
        ]
    },
    {
        question: "Are you in a committed relationship already?",
        inputType: "choice",
        options: [
            "yes",
            "no"
        ]
    },
    {
        question: "What is your gender identity?",
        inputType: "choice", 
        options: [
            "Woman",
            "Man",
            "Nonbinary"
        ]
    },
    {
        question: "What is your gender identity?",
        inputType: "choice", 
        options: [
            "Woman",
            "Man",
            "Nonbinary"
        ]
    },
    {
        question: "What are your gender preferences?",
        inputType: "choice", 
        options: [
            "Woman",
            "Man",
            "Everyone"
        ]
    },
    {
        question: "What are your gender preferences?",
        inputType: "choice", 
        options: [
            "Woman",
            "Man",
            "Everyone"
        ]
    },
    {
        question: "Who do you think should be a swim captain next year?",
        inputType: "choice",
        options: [
            "Gregory Lonzo",
            "Cecil the Sagehen",
            "Hiram Chodosh",
            "That one girl that shouldn't have dyed her hair"
        ]
    },
    {
        question: "Who do you think should be a swim captain next year?",
        inputType: "choice",
        options: [
            "Gregory Lonzo",
            "Cecil the Sagehen",
            "Hiram Chodosh",
            "That one girl that shouldn't have dyed her hair"
        ]
    },
    {
        question: "What's the name of your clique?",
        inputType: "choice",
        options: [
            "Big Brawly Bros",
            "Those two girls who whisper to each other 24/7",
            "The Collins Breakfast Club",
            "Synchronized Game Day Shitters"
        ]
    },
    {
        question: "What's the name of your clique?",
        inputType: "choice",
        options: [
            "Big Brawly Bros",
            "Those two girls who whisper to each other 24/7",
            "The Collins Breakfast Club",
            "Synchronized Game Day Shitters"
        ]
    },
    {
        question: "What's your favorite fetish?",
        inputType: "choice",
        options: [
            "Chlorine bleached hair",
            "That sexy referee uniform",
            "Hands with cement filed nails",
            "Chlorine scented skin"
        ]
    },
    {
        question: "What's your favorite fetish?",
        inputType: "choice",
        options: [
            "Chlorine bleached hair",
            "That sexy referee uniform",
            "Hands with cement filed nails",
            "Chlorine scented skin"
        ]
    },
    {
        question: "What could you live without?",
        inputType: "choice",
        options: [
            "Theo's lack of shoe-wear",
            "Coach Dave's gossiping",
            "'D-squad' - Katy Shaw",
            "The lack of pool space"
        ]
    },
    {
        question: "What could you live without?",
        inputType: "choice",
        options: [
            "Theo's lack of shoe-wear",
            "Coach Dave's gossiping",
            "'D-squad' - Katy Shaw",
            "The lack of pool space"
        ]
    },
    {
        question: "Which spot on campus would you rather give birth on?",
        inputType: "choice",
        options: [
            "The cube water",
            "Seal Court",
            "That one broken back extension machine in the training and conditioning room",
            "The Mudd basements"
        ]
    },
    {
        question: "Which spot on campus would you rather give birth on?",
        inputType: "choice",
        options: [
            "The cube water",
            "Seal Court",
            "That one broken back extension machine in the training and conditioning room",
            "The Mudd basements"
        ]
    },
    {
        question: "What's your stance on child rearing?",
        inputType: "choice",
        options: [
            "I dont believe in the future of humanity",
            "Everyone needs some avoidant attachment issues",
            "My kids will learn more on a farm than in school",
            "Kumon"
        ]
    },
    {
        question: "What's your stance on child rearing?",
        inputType: "choice",
        options: [
            "I dont believe in the future of humanity",
            "Everyone needs some avoidant attachment issues",
            "My kids will learn more on a farm than in school",
            "Kumon"
        ]
    },
    {
        question: "What's (8 + 8) % 10 x 4",
        inputType: "choice",
        options: [
            "6.4",
            "640",
            "24",
            "0"
        ]
    },
    {
        question: "What's (8 + 8) % 10 x 4",
        inputType: "choice",
        options: [
            "6.4",
            "640",
            "24",
            "0"
        ]
    }
]

let currentQuestionIndex = 0;
let completed = 0;
let answers = [];

// every other question gets skipped
function loadQuestion() {
    console.log(currentQuestionIndex, "question number");
    const question = document.getElementById("question");
    const options = document.getElementById("options");
    const textBox = document.getElementById("textBox");

    question.textContent = questions[currentQuestionIndex].question;
    options.innerHTML = "";
    console.log(question.textContent);

    // if(questions[currentQuestionIndex].inputType == "textBox"){
    //     // Create a label for the text box
    //     const textBoxLabel = document.createElement("label");
        
    //     // Create the text box input element
    //     const textBoxInput = document.createElement("input");
    //     textBoxInput.type = "text";
    //     textBoxInput.id = "textBoxInput";
        
    //     // Append label and text box input to the text box container
    // if (questions[currentQuestionIndex].inputType === "textBox") {
    //     const textBoxLabel = document.createElement("label");
        
    //     const textBoxInput = document.createElement("input");
    //     textBoxInput.type = "text";
    //     textBoxInput.id = "textBoxInput";
    //     textBoxInput.value = ""; // Clear any previous input
        
    //     textBox.appendChild(textBoxLabel);
    //     textBox.appendChild(textBoxInput);
    for (let i = 0; i < questions[currentQuestionIndex].options.length; i++) {
        const choicesdiv = document.createElement("div");
        const choice = document.createElement("input");
        const choiceLabel = document.createElement("label");

        choice.type = "radio";
        choice.name = "answer";
        choice.value = i;

        if(questions[currentQuestionIndex].inputType == "textBox"){
            choice.type = "text";
            choice.id = "options";
            choice.value = "";
            console.log(choice);
            choicesdiv.appendChild(choice);
            choicesdiv.appendChild(choiceLabel);
            textBox.appendChild(choicesdiv);
            break;
        }
        else if(document.getElementById("textBox") != null)
        {
            document.getElementById("textBox").remove();
        }

        choiceLabel.textContent = questions[currentQuestionIndex].options[i];

        console.log(choiceLabel.textContent, "optionNums");
        
        choicesdiv.appendChild(choice);
        choicesdiv.appendChild(choiceLabel);
        options.appendChild(choicesdiv);
    }
        
    // console.log("checkOutside")
    // if(answers.length == 10)
    // {
    //     console.log("checkInside")
    //     setInterval(startTimer, 1000);
    // }
}

// var timeLeft = 5;

// function startTimer() {
//     var elem = document.getElementById('timer');
//     console.log(answers.length, "next");
//     if (timeLeft == -1 && answers.length != 12) {
//         document.getElementById('timer').remove();
//         clearTimeout(setInterval(startTimer, 10));
//         nextQuestion();
//     }
//     else if(answers.length == 12 && document.getElementById('timer') != null)
//     {
//         document.getElementById('timer').remove();
//         clearTimeout(setInterval(startTimer, 10));
//     } 
//     else if (document.getElementById('timer') != null)
//     {
//         elem.innerHTML = timeLeft + ' seconds remaining';
//         timeLeft--;
//     }
// }

// loadQuestion()

function storeAnswer() {
    console.log("storeAnswer")
    const responses = document.getElementsByName("answer");
    console.log(responses, "response");
    console.log(answers, "answers");
    responses.forEach((response) => {
        if(response.type == "radio" && response.checked == true)
        {
            answers.push(response.value);
        }
        else if(response.type == "text")
        {
            answers.push(response.value);
        }
    })
    // if(answers.length == 2 && answers[2] == 0)
    // {
    //     answers.push("null");
    //     answers.push("null");
    //     currentQuestionIndex++;
    //     currentQuestionIndex++;
    // }
    console.log(answers, "answers");
}

// SAVE THIS FOR LATER
// function loadResponse() {
//     const response = document.getElementById("response")
//     const matchedPersonName = "Tyler Headley"
//     response.textContent = `You are matched with ${matchedPersonName}`
// }

function writeData() {
    const usersRef = ref(db, "users"); // Reference to the "users" node
    const newUserRef = push(usersRef); // Generate a new unique key
    set(newUserRef, { // Set data at the new key
        answers: answers
    });
}

function nextQuestion() {
    console.log('next');
    storeAnswer();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex = currentQuestionIndex + 1;
        loadQuestion();
    } else {
        console.log("quiz Done")
        writeData(); // Write data to Firebase when all questions are answered
    }
}

window.submit = function() {
    nextQuestion();
}

// Function to initialize the quiz
function initializeQuiz() {
    console.log("quiz started");
    // Load the first question when the page loads
    loadQuestion();

    // Add event listener to the button for handling clicks
    const button = document.getElementById("button");
    button.addEventListener("click", submit);
}

// Call initializeQuiz() when the page loads
document.addEventListener("DOMContentLoaded", initializeQuiz);