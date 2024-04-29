const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const removeElement = document.querySelector("#remove-note-btn");
const timeStampElement = document.querySelector("#time-stamp");

const noteId = location.hash.substring(1);
let notes = getSavedNotes();

let note = notes.find((note) => note.id === noteId);

if (!note) {
  location.assign("./index.html");
} else {
  titleElement.value = note.title;
  bodyElement.value = note.body;
  timeStampElement.textContent = generateTimestamp(note.updatedAt);
}

titleElement.addEventListener("input", (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  timeStampElement.textContent = generateTimestamp(note.updatedAt);
  saveNotes(notes);
});

bodyElement.addEventListener("input", (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  timeStampElement.textContent = generateTimestamp(note.updatedAt);
  saveNotes(notes);
});

removeElement.addEventListener("click", () => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("./index.html");
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find((note) => {
      return note.id === noteId;
    });

    if (!note) {
      location.assign("./index.html");
    } else {
      titleElement.value = note.title;
      bodyElement.value = note.body;
      timeStampElement.textContent = generateTimestamp(note.updatedAt);
    }
  }
});
