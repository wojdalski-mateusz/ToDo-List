{
    let tasks = [];


    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks, {
                content: newTaskContent
            }];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1)
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    const render = () => {
        let taskContent = "";

        for (const task of tasks) {
            taskContent += `
                <li class="tasksList__item js-tasksList">
                <button class="tasksList__button tasksList__button--done js-toggleDone">
                ${task.done ? "✔" : " "}
                </button>
                <span class="tasksList__content ${task.done ? "tasksList__content--done" : " "}">
                ${task.content}
                </span>
                <button class="tasksList__button tasksList__button--remove js-remove">
                🗑️
                </button>
                </li>
            `;
        }
        document.querySelector(".js-tasksList").innerHTML = taskContent;

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        })

        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        })
    }


    const onFormSubmit = (ev) => {
        ev.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask");
        const newTaskElement = newTaskContent.value.trim();

        if (newTaskElement !== "") {
            addNewTask(newTaskElement);
            newTaskContent.value = "";
        }

        newTaskContent.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}