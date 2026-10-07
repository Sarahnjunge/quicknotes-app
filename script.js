const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

// Display all notes on the page.
function render() {
  notesList.textContent = "";

  for (const note of notes) {
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

    listItem.appendChild(noteText);
    listItem.appendChild(categoryLabel);
    listItem.appendChild(date);
    listItem.appendChild(deleteButton);

    notesList.appendChild(listItem);
  }
}

// Add a new note when the form is submitted.
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);

  render();

  noteInput.value = "";
});