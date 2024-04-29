function getSavedNotes() {
  const notesJSON = localStorage.getItem("notes");

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (error) {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

////////
function removeNote(id) {
  const index = notes.findIndex((note) => note.id === id);

  if (index > -1) {
    notes.splice(index, 1);
  }
}

function genrateNoteDOM(note) {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const status = document.createElement("p");

  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Note";
  }
  noteEl.setAttribute("href", `./edit.html#${note.id}`);
  noteEl.classList.add("list-item");
  noteEl.appendChild(textEl);
  textEl.classList.add("list-item__title");

  status.textContent = generateTimestamp(note);
  status.classList.add("list-item__subtitle");
  noteEl.appendChild(status);

  return noteEl;
}

function sortNotes(notes, sortBy) {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) return -1;
      else if (a.updatedAt < b.updatedAt) return 1;
      else return 0;
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      else if (a.createdAt < b.createdAt) return 1;
      else return 0;
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      else if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      else return 0;
    });
  } else return notes;
}

///////////
function renderNotes(notes, filters) {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  document.querySelector("#notes").innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = genrateNoteDOM(note);
      document.querySelector("#notes").appendChild(noteEl);
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.textContent = "No notes to show";
    messageEl.classList.add("empty-message");
    console.log(messageEl.textContent);
    document.querySelector("#notes").appendChild(messageEl);
  }
}

const generateTimestamp = (note) =>
  `last edited ${moment(note.updatedAt).fromNow()}`;
