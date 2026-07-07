document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.querySelector("#task-form");
    const taskInput = document.querySelector("#task-input");
    const taskContainer = document.querySelector("#task-container");

    let taskList = [];
    let currentId = 1;

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }

    function loadTasks() {
        taskList = JSON.parse(localStorage.getItem("tasks")) || [];

        if (taskList.length > 0) {
            currentId = Math.max(...taskList.map(function(task) {
                return task.id;
            })) + 1;
        }

        taskList.forEach(function(task) {
            renderTasks(task);
        })
    }

    function renderTasks(task) {
        const taskDiv = document.createElement("div");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;
        taskSpan.classList.toggle("completed", task.completed);
        taskSpan.addEventListener("click", function() {
            task.completed = !task.completed;
            taskSpan.classList.toggle("completed", task.completed);
            saveTasks();
        })

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function() {
            task.text = window.prompt("What would you like to edit the task to?");
            taskSpan.textContent = task.text;
            saveTasks();
        })

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            taskList = taskList.filter(function(savedTask) {
                return savedTask.id !== task.id;
            })
            
            taskDiv.remove();
            saveTasks();
        })

        taskDiv.appendChild(taskSpan);
        taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton);
        taskContainer.appendChild(taskDiv);        
    }

    loadTasks();

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText === "") {
            window.alert("Input cannot be empty.");
            taskInput.value = ""
        } else {
            const task = {
                id: currentId++,
                text: taskText,
                completed: false
            }

            taskList.push(task)
            renderTasks(task);
            saveTasks();

            taskInput.value = "";
        }
    })
})