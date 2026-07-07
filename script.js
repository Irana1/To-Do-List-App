document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.querySelector("#task-form");
    const taskInput = document.querySelector("#task-input");
    const taskContainer = document.querySelector("#task-container");

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText === "") {
            console.log("Input cannot be empty");
        } else {
            const taskDiv = document.createElement("div");
            taskDiv.textContent = taskText;
            taskContainer.appendChild(taskDiv);
            taskInput.value = "";
        }
    })
})