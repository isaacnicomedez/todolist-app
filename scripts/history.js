let challenges = JSON.parse(localStorage.getItem('challenge-tasks')) || [];
let achievements = JSON.parse(localStorage.getItem('done-tasks')) || [];
let failed = JSON.parse(localStorage.getItem('failed-tasks')) || [];
let mastery = JSON.parse(localStorage.getItem('mastery')) || 0;

renderPage();

function renderPage() {
    let html = '';
    let htmlFailed = '';

    achievements.forEach(function(achievement) {
        html += `
            <p> ${achievement} <img src="../img/check.png"></p>
        `;
    });
    
    failed.forEach(function(failedTask, index) {
        htmlFailed +=  `
            <p> ${failedTask} <button onclick="
                challenges.push(failed.splice(${index}, 1)[0]);
                renderPage();
            ">Redo</button></p>
        `
    })

    document.getElementById('achievements-div').innerHTML = `
        <h2>Achievements (${achievements.length})</h2>
        ${html}
    `;

    document.getElementById('failed-div').innerHTML = `
        <h2>Resume Abandoned Tasks? (${failed.length})</h2> 
        ${htmlFailed}
    `;
    document.querySelector('.mastery').innerHTML = `Mastery: ${mastery}`;

    localStorage.setItem('failed-tasks', JSON.stringify(failed));
    localStorage.setItem('challenge-tasks', JSON.stringify(challenges));
}