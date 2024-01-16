let titles = [];
let notes = [];

let deletedTitles = [];
let deletedNotes = [];

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < titles.length; i++) {
        content.innerHTML += /* html */ `
            <div class="added-note">
                <h3>${titles[i]} </h3> <br>
                <div>${notes[i]}</div> <br>
                <button class="delete-button" onclick="deleteNote(${i})">delete</button>
            </div>
        `;
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
    }
    render();
    save();
}

function deleteNote() {

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

function showMenu() {
    document.getElementById('menu').classList.add('show-overlay-menu');
}

function hideMenu() {
    document.getElementById('menu').classList.remove('show-overlay-menu');
}