// HTML-Elemente aus dem DOM
const form = document.querySelector('.todo-form'); 
const input = document.querySelector('.todo-input'); 
const todoList = document.querySelector('.todo-list'); 

// Ein Array, das alle Aufgaben speichert
let todos = []; // let, da sich der Inhalt des Arrays ändern wird

// EventListener für das Formular zum Hinzufügen neuer Aufgaben
form.addEventListener('submit', (event)=>{
    event.preventDefault(); // Stoppt das Standardverhalten des Formulars
    // Erfasst den Text der neuen Aufgabe und entfernt Leerzeichen
    const taskText = input.value.trim();
    
    // Beendet die Funktion, falls das Eingabefeld leer ist
    if (taskText === '') return;

    // Erstellt ein neues Aufgaben-Objekt
    const newTask = {
        id: Date.now(), // Vergibt der Aufgabe eine ID
        text: taskText, // Text der Aufgabe
        completed: false, // Status der Aufgabe (anfangs unerledigt)
    };

    // Fügt die neue Aufgabe zum Array hinzu
    todos.push(newTask);
    //updateTodoList();

    saveTodos(); // Speichert die Änderung auf localStorage

    alert('Ihre Aufgabe wurde gespeichert.')

    // Leert das Eingabefeld
    input.value = '';

    // Aktualisieret die Anzeige der Aufgaben
    renderTodos();
});

// Funktion zum Anzeigen der Aufgaben
function renderTodos() {
    // Leert die bestehende Liste
    todoList.innerHTML = '';

    // Iteriere über das todos-Array und erstelle die HTML-Struktur
    todos.forEach((task)=>{
        // Erstellt ein <li>-Element als Container für die Aufgabe
        const li = document.createElement('li');

        // Checkbox zum Markieren der Aufgabe
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed; // Setzt den Status der Checkbox
        checkbox.setAttribute('aria-label', 'Aufgabe erledigen');

        // EventListener für die Checkbox
        checkbox.addEventListener('change', ()=>{
            task.completed = checkbox.checked;
            saveTodos();
            renderTodos(); // Aktualisiere die Anzeige
        });

        // Text der Aufgabe
        const span = document.createElement('span');
        span.textContent = task.text;
        
        // Falls die Aufgabe erledigt ist, Linie durch den Text ziehen
        if (task.completed) {
            span.style.textDecoration = 'line-through';
        }

        // Button zum Löschen der Aufgabe
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.setAttribute('aria-label', 'Aufgabe löschen');

        // EventListener für den Löschen-Button
        deleteButton.addEventListener('click', ()=>{
            todos = todos.filter((t) => t.id !== task.id); // Entfernt die Aufgabe aus dem Array
            alert('Ihre Aufgabe wurde gelöscht.')
            saveTodos();
            renderTodos(); // Aktualisiert die Anzeige
        });

        // Fügt die Elemente zum <li> hinzu
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        // Fügt das <li> zur Aufgabenliste hinzu
        todoList.appendChild(li);
    });
}

function saveTodos(){ // Funktion zum speichern der Aufgabe auf localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos(){ // Funktion zum abrufen der gespeicherten Aufgabe auf localStorage
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos){
        todos = JSON.parse(savedTodos);
    } else{
        todos = [];
    }
}

loadTodos(); // Ruft die Liste mit den aktuellen Aufgaben auf
renderTodos(); // Zeigt die aufgerufenen Aufgaben an