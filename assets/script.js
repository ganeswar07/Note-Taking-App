// Selecting the 'Add' button and the container for notes
const add = document.querySelector("#add");
const notelist = document.querySelector("#note");

// Function to save notes to localStorage
const saveNotes = () => {
  const notes = document.querySelectorAll(".card textarea");
  const data = [];
  // Iterating through textareas and pushing their values to the data array
  notes.forEach((note) => data.push(note.value));
  // Checking if there are any notes to save
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

// Function to dynamically add a note
const addnote = (text = " ") => {
  const note = document.createElement("div");
  note.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-3");
  note.innerHTML = `
    <div class="card">
         <div class="card-header d-flex justify-content-end align-items-center text-bg-dark gap-3 ">
            <i class="fa-solid fa-floppy-disk fa-xl "></i>
             <i class="fa-solid fa-trash fa-xl"></i>
         </div>
        <div class="card-body p-0">
             <textarea name="text" id="textarea" cols="30" rows="10"
                   class="w-100 h-100 border-0 p-3">${text}</textarea>
         </div>
     </div>
    `;

    // Adding a click event listener to the 'Trash' icon
  note.querySelector(".fa-trash").addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

    // Adding a click event listener to the 'Floppy Disk' icon
  note.querySelector(".fa-floppy-disk").addEventListener("click", function () {
    saveNotes();
    this.classList.toggle("clicked");
    setTimeout(() => {
      this.classList.remove("clicked");
    }, 1000);
  });

    // Adding a focusout event listener to the textarea to save notes when it loses focus
  note.querySelector("textarea").addEventListener("focusout", () => {
    saveNotes();
  });
  notelist.appendChild(note);
};

// Function to load notes from localStorage on page load
const loadNote = () => {
  const notes = JSON.parse(localStorage.getItem("notes"));
  if (notes === null) {
    addnote();
  } else {
    notes.forEach((note) => {
      addnote(note);
    });
  }
};

// Initial loading of notes when the page is ready
loadNote();

// Adding a click event listener to the 'Add' button to create a new note
add.addEventListener("click", () => {
  addnote();
});
