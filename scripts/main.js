let challenges = JSON.parse(localStorage.getItem('challenge-tasks')) || [];
let achievements = JSON.parse(localStorage.getItem('done-tasks')) || [];
let failed = JSON.parse(localStorage.getItem('failed-tasks')) || [];
let mastery = JSON.parse(localStorage.getItem('mastery')) || 0;


const quotes = [
    { text: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupéry" },
    { text: "Failing to plan is planning to fail.", author: "Benjamin Franklin" },
    { text: "Plans are nothing; planning is everything.", author: "Dwight D. Eisenhower" },
    { text: "By failing to prepare, you are preparing to fail.", author: "Benjamin Franklin" },

    { text: "Plan your work for today and every day, then work your plan.", author: "Margaret Thatcher" },
    { text: "Planning is bringing the future into the present so that you can do something about it now.", author: "Alan Lakein" },
    { text: "In preparing for battle I have always found that plans are useless, but planning is indispensable.", author: "Dwight D. Eisenhower" },
    { text: "The time to repair the roof is when the sun is shining.", author: "John F. Kennedy" },

    { text: "A man who does not think and plan long ahead will find trouble right at his door.", author: "Confucius" },
    { text: "The future belongs to those who prepare for it today.", author: "Eleanor Roosevelt" },
    { text: "Dreaming, after all, is a form of planning.", author: "Gloria Steinem" },
    { text: "Plan for what is difficult while it is easy, do what is great while it is small.", author: "Lao Tzu" }
];

const inputTask = document.getElementById('task-input');
const acceptBtn = document.getElementById('submit');

handleEvents();
renderBoard();
handleEmptyPage();

function handleEmptyPage() {
    if (challenges < 1) {
        // Generate random number for quote
        let randomIndex = Math.floor(Math.random() * quotes.length);

        // Id changed when task === 0
        let listDiv = document.getElementById('list-div');
        listDiv.id = 'quote-div';

        // Abracadabra, display the quotes!
        let html = '';
        html = `
            <h3>${quotes[randomIndex].text} <span>- ${quotes[randomIndex].author}</span></h3>
        `;
        listDiv.innerHTML = html;
    }
}

function getInput() {
    inputValue = inputTask.value.trim();
    if (inputValue !== "") {
        challenges.push(inputValue);

        // Reassign id :)
        let listDiv = document.getElementById('quote-div');
        listDiv.id = 'list-div';

        inputTask.value = '';
        renderBoard();
    }
}

function renderBoard() {
    let html = '';

    // Handle display, done, and give up of each tasks
    challenges.forEach(function(task, index) {
        html += `
            <div class="task-div">
                <p class="task-description">${task}</p>
                <div class="options-div">
                    <p class="choice choice1" onclick="
                        achievements.push(challenges.splice(${index}, 1)[0]);
                        mastery += 5;
                        renderBoard();
                        handleEmptyPage();
                    ">Done</p>
                    <p class="choice choice2" onclick="
                        failed.push(challenges.splice(${index}, 1)[0]);
                        mastery -= 10;
                        renderBoard();
                        handleEmptyPage();
                    ">Give up</p>
                </div>
            </div>
        `;
    });

    // Save display
    document.getElementById('list-div').innerHTML = html;
    document.querySelector('.mastery').innerHTML = `Mastery: ${mastery}`;

    // Yup, idk much about professional design but this seems pretty messy 
    localStorage.setItem('challenge-tasks', JSON.stringify(challenges));
    localStorage.setItem('done-tasks', JSON.stringify(achievements));
    localStorage.setItem('failed-tasks', JSON.stringify(failed));
    localStorage.setItem('mastery', JSON.stringify(mastery));

    // My best friend:
    //console.log(challenges, achievements, failed);
}

function handleEvents() {
    inputTask.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            getInput();
        }
    });

    acceptBtn.addEventListener('click',  getInput);
}
