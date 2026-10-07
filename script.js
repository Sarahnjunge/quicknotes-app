const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const STORAGE_KEY = "quicknotes-notes";

let notes = [];

// Save notes to localStorage.
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Update the note count.
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// Display notes on the page.
function render() {
  notesList.textContent = "";

  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  if (filteredNotes.length === 0 && searchTerm !== "") {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
    updateCount();
    return;
  }

  for (const note of filteredNotes) {
    const listItem = document.createElement("li");
    listItem.classList.add("note", `category-${note.category}`);

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const categoryLabel = document.createElement("span");
    categoryLabel.classList.add("note-category");
    categoryLabel.textContent = note.category;

    const date = document.createElement("p");
    date.classList.add("note-date");
    date.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      notes = notes.filter((item) => item.id !== note.id);
      saveNotes();
      render();
    });

    listItem.appendChild(noteText);
    listItem.appendChild(categoryLabel);
    listItem.appendChild(date);
    listItem.appendChild(deleteButton);

    notesList.appendChild(listItem);
  }

  updateCount();
}

// Add a new note.
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);

  saveNotes();
  render();

  noteInput.value = "";
});

// Search as the user types.
searchInput.addEventListener("input", render);

// Load saved notes when the page opens.
const savedNotes = localStorage.getItem(STORAGE_KEY);

if (savedNotes !== null) {
  notes = JSON.parse(savedNotes);
}

render();