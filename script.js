let titles = [];
let notes = [];
let deletedTitles = [];
let deletedNotes = [];

load();

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const note = notes[i];
        content.innerHTML += /* html */ `
            <div class="added-note">
                <b>${title} </b> <br>
                <div>${note}</div> <br>
                <button class="delete-button" onclick="noteToTrash(${i})">delete</button>
            </div>`;
    }
}

function save() {
    let titleAsText = JSON.stringify(titles);
    let noteAsText = JSON.stringify(notes);
    localStorage.setItem('titles', titleAsText);
    localStorage.setItem('notes', noteAsText);
}


function load() {
    let titleAsText = localStorage.getItem('titles');
    let noteAsText = localStorage.getItem('notes');
    if (titleAsText && noteAsText) {
        titles = JSON.parse(titleAsText);
        notes = JSON.parse(noteAsText);
    }
}

function addNote() {
    let title = document.getElementById('input-title');
    let note = document.getElementById('input-note');

    if (title.value === '' && note.value === '') {
        alert('Beide Eingabefelder müssen ausgefüllt werden.')
    } else {
        titles.push(title.value);
        notes.push(note.value);
        title.value = '';
        note.value = '';
        render();
        save();
    }
}

function noteToTrash(i) {
    deletedTitles.push(titles[i]);
    deletedNotes.push(notes[i]);
    titles.splice(i, 1);
    notes.splice(i, 1);
    render();
    save();
}

function recoverNote(i) {
    titles.push(deletedTitles[i]);
    notes.push(deletedNotes[i]);
    deletedTitles.splice(i, 1);
    deletedNotes.splice(i, 1);
    render();
    save();
}

function flushNote(i) {
    deletedTitles.splice(i, 1);
    deletedNotes.splice(i, 1);
    /* renderTrash(); */
    render();
    save();
}

/* function renderTrash() {

} */

function showTrash() {
    document.getElementById('trash').classList.add('show-overlay-menu');
    trash.innerHTML = '';
    trash.innerHTML += `
        <button class="hide-button" onclick="hideTrash()">close</button>
    `;

    for (let i = 0; i < deletedTitles.length; i++) {
        const deletedTitle = deletedTitles[i];
        const deletedNote = deletedNotes[i];
        trash.innerHTML += /* html */ `
            <div>
                <div class="added-note-trash">
                    <div>
                        <b>${deletedTitle} </b> <br>
                        <span>${deletedNote}</span> <br>
                    </div>
                    <div>
                        <img id="trash-icon" onclick="flushNote(${i})" src="./img/trash.png" alt="trash icon">
                        <img id="restore-icon" onclick="recoverNote(${i})" src="./img/restore.png" alt="restore icon">
                    </div>
                </div>
            </div> `;
    }
}

function hideTrash() {
    document.getElementById('trash').classList.remove('show-overlay-menu');
}