document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load todos from local storage
    loadTodos();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (input.value.trim()) {
            addTodoItem(input.value.trim());
            input.value = '';
            saveTodos();
        }
    });

    function addTodoItem(todo) {
        const li = document.createElement('li');
        li.textContent = todo;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            editTodoItem(li);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            saveTodos();
        });

        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        list.appendChild(li);
    }

    function editTodoItem(li) {
        // Clear existing content to replace with edit elements
        const currentText = li.childNodes[0].textContent; // The text of the to-do item
        li.innerHTML = ''; // Clear existing content

        const newTextInput = document.createElement('input');
        newTextInput.type = 'text';
        newTextInput.value = currentText;
        newTextInput.classList.add('edit-input'); // Optional: add a class for styling

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('save-button'); // Optional: add a class for styling
        saveButton.addEventListener('click', () => {
            const newText = newTextInput.value.trim();
            if (newText) {
                li.textContent = newText;
                // Re-add the buttons after updating text
                addButtonsToListItem(li);
                saveTodos();
            }
        });

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel-button'); // Optional: add a class for styling
        cancelButton.addEventListener('click', () => {
            // Re-add the buttons after canceling edit
            addButtonsToListItem(li);
        });

        // Append new elements
        li.appendChild(newTextInput);
        li.appendChild(saveButton);
        li.appendChild(cancelButton);
    }

    function addButtonsToListItem(li) {
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            editTodoItem(li);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            saveTodos();
        });

        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            todos.push({
                text: li.childNodes[0].textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            if (todo.completed) {
                li.classList.add('completed');
            }

            addButtonsToListItem(li);
            list.appendChild(li);
        });
    }
});
