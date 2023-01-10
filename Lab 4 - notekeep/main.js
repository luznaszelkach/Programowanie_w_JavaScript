import { Note } from "./note.js";

document.addEventListener("DOMContentLoaded", function(){
    AddAllNotesToView()
});

document.querySelector("#AddNoteButton").addEventListener('click', AddNewNote);
document.querySelector('#SaveButton').addEventListener('click', NoteCreatorSaveNote)
document.querySelector('#CancelButton').addEventListener('click', HideNoteCreator)
document.querySelector('#DeleteButton').addEventListener('click', NoteCreatorDeleteNote)
document.querySelector('#colorChose').addEventListener('input', ChangeNoteCreatorColor)

let IdOfNoteToEditOrDelete

function ChangeNoteCreatorColor(){
    document.querySelector('.NoteBox').style.backgroundColor = document.querySelector('#colorChose').value
}


function AddNewNote(){
    IdOfNoteToEditOrDelete = 0
    document.querySelector('#NoteTitleInfo').value = ""
    document.querySelector('#textPlace').value = ""
    document.querySelector('#NoteImportantInfo').checked = false
    document.querySelector('#colorChose').value = '5dd1de'
    document.querySelector('.NoteBox').style.backgroundColor = '#5dd1de'
    ShowNoteCreator()
}

function ShowNoteCreator(){
    document.querySelector('.NoteBackground').style.visibility = "visible";
}

function HideNoteCreator(){
    document.querySelector('.NoteBackground').style.visibility = "hidden";
}



function NoteCreatorEditNote(ev){
    const fullId = ev.target.id
    const id = parseInt(fullId.split('-')[1])
    IdOfNoteToEditOrDelete = id
    const egNote = new Note()
    const note = egNote.GetNote(id)

    document.querySelector('#NoteTitleInfo').value = note.name
    document.querySelector('#textPlace').value = note.text
    document.querySelector('#colorChose').value = note.colour
    document.querySelector('#NoteImportantInfo').checked = note.important
    document.querySelector('.NoteBox').style.backgroundColor = note.colour

    ShowNoteCreator()

}

function NoteCreatorDeleteNote(){
    if (IdOfNoteToEditOrDelete != 0) {
        const egNote = new Note()
        egNote.DeleteNote(IdOfNoteToEditOrDelete)
        RemoveNoteFromView()

        HideNoteCreator()
    }
}

function AddAllNotesToView(){
    const egNote = new Note()
    const notes = egNote.GetNotes()
    notes.forEach(note => {
        AddNoteToView(note)
    });
}

function RemoveNoteFromView(){
    let node = document.getElementById(`note-${IdOfNoteToEditOrDelete}`);
    if (node.parentNode) {
    node.parentNode.removeChild(node);
    }
}

function AddNoteToView(note){
    const examplenote = document.querySelector('#exampleNote')
    const newNote = examplenote.cloneNode(true);
    newNote.style.backgroundColor = note.colour;
    newNote.setAttribute('id', `note-${note.id}` );
    newNote.querySelector('.NoteName').innerText = note.name
    newNote.querySelector('.NoteDate').innerText = note.date
    newNote.querySelector('.NoteTekst').innerText = note.text
    if (note.important) {
        document.querySelector('#ImportantNotes').appendChild(newNote)
    }
    else{
        document.querySelector('#CommonNotes').appendChild(newNote)
    }
    newNote.addEventListener('click', NoteCreatorEditNote)
}

function NoteCreatorSaveNote(){
    if (IdOfNoteToEditOrDelete == 0) {
        const note = new Note()
        note.name = document.querySelector('#NoteTitleInfo').value
        note.text = document.querySelector('#textPlace').value
        note.colour = document.querySelector('#colorChose').value
        note.important = document.querySelector('#NoteImportantInfo').checked
        note.date = new Date().toISOString()
        const newNote = note.SaveNote(note)
        HideNoteCreator()
        AddNoteToView(newNote)
    }
    else{
        const note = new Note()
        note.id = IdOfNoteToEditOrDelete
        note.name = document.querySelector('#NoteTitleInfo').value
        note.text = document.querySelector('#textPlace').value
        note.colour = document.querySelector('#colorChose').value
        note.important = document.querySelector('#NoteImportantInfo').checked

        const newNote = note.UpdateNote(note)
        HideNoteCreator()
        RemoveNoteFromView()
        AddNoteToView(newNote)
    }
}