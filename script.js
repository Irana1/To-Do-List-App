document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.querySelector("#task-form");
    const taskInput = document.querySelector("#task-input");
    const taskContainer = document.querySelector("#task-container");

    let taskList = [];
    let currentId = 1;

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

            taskList.push(task);

            const taskDiv = document.createElement("div");

            const taskSpan = document.createElement("span");
            taskSpan.textContent = task.text;
            taskSpan.addEventListener("click", function() {
                task.completed = !task.completed;
                taskSpan.classList.toggle("completed", task.completed);
            })

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", function() {
                task.text = window.prompt("What would you like to edit the task to?");
                taskSpan.textContent = task.text;
            })

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                taskDiv.remove();
            })

            taskDiv.appendChild(taskSpan);
            taskDiv.appendChild(editButton);
            taskDiv.appendChild(deleteButton);
            taskContainer.appendChild(taskDiv);

            taskInput.value = "";
            
            console.log(taskList);
        }
    })
})