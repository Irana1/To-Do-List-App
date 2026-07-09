document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.querySelector(".task-form");
    const taskInput = document.querySelector(".task-input");
    const filterButtons = document.querySelectorAll(".filter-buttons .btn")
    const allFilter = document.querySelector("#all-filter");
    const activeFilter = document.querySelector("#active-filter");
    const completedFilter = document.querySelector("#completed-filter");
    const taskCounter = document.querySelector(".task-counter");
    const taskContainer = document.querySelector(".task-container");
    const clearCompleted = document.querySelector("#clear-btn");

    let taskList = [];
    let currentId = 1;
    let currentFilter = "all";

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }

    function loadTasks() {
        taskList = JSON.parse(localStorage.getItem("tasks")) || [];

        // Tracks the current ID for each task so there's no ID overlap
        if (taskList.length > 0) {
            currentId = Math.max(...taskList.map(function(task) {
                return task.id;
            })) + 1;
        }

        // Renders the tasks after loading
        taskList.forEach(function(task) {
            renderTasks();
            checkEmpty();
        })
    }

    // Function for rendering single task
    function renderTask(task) {

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-div");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;
        taskSpan.classList.toggle("completed", task.completed);
        taskSpan.addEventListener("click", function() {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
            checkEmpty();
        })

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("button-div")

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("btn");
        editButton.addEventListener("click", function() {
            task.text = window.prompt("What would you like to edit the task to?");
            taskSpan.textContent = task.text;
            saveTasks();
        })

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn");
        deleteButton.addEventListener("click", () => {
            taskList = taskList.filter(function(savedTask) {
                return savedTask.id !== task.id;
            })
            
            saveTasks();
            renderTasks();
            checkEmpty();

            taskCounter.textContent = `Tasks: ${taskList.length}`;
        })

        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);
        taskDiv.appendChild(taskSpan);
        taskDiv.appendChild(buttonDiv);
        taskContainer.appendChild(taskDiv);        
    }

    // Function for rendering multiple tasks
    function renderTasks() {
        // Clears the task container in HTML
        taskContainer.innerHTML = "";

        // FIlters out tasks based on the current selected filter using data filters
        let visibleTasks = taskList.filter(function(task) {
            if (currentFilter === "all") {
                return true;
            } else if (currentFilter === "active") {
                return task.completed === false;
            } else if (currentFilter === "completed") {
                return task.completed === true;
            }
        });

        visibleTasks.forEach(function(task) {
            renderTask(task);
        })
    }

    function checkEmpty() {
        if (taskList.length === 0) {
            taskContainer.classList.add("empty-tasks");
            taskContainer.innerHTML = `<p>No tasks yet --- add one above!</p>`;
        } else {
            taskContainer.classList.remove("empty-tasks");
        }
        taskCounter.textContent = `Tasks: ${taskList.length}`;
    }

    loadTasks();
    checkEmpty();

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
            renderTasks();
            saveTasks();
            checkEmpty();

            taskCounter.textContent = `Tasks: ${taskList.length}`;

            taskInput.value = "";
        }
    })

    // Updates the current filter based on the button's current dataset value
    filterButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            filterButtons.forEach(function(btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            currentFilter = button.dataset.filter;

            renderTasks();
            checkEmpty();
        })
    })

    // Filters the task list based on if a task is completed or not
    clearCompleted.addEventListener("click", () => {
        taskList = taskList.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        checkEmpty();
    })
})