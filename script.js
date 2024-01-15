let titles = [];
let notes = [];

function render() {

}

function addNote() {
    let title = document.getElementById('input-title');
    let note = document.getElementById('input-note');
    titles.push(title.value);
    notes.push(note.value);

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