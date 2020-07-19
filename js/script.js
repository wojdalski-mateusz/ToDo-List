{
    let tasks = [];
    let hideDoneTasks = false;

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
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done, },
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const markTasksAsDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let taskContent = "";

        for (const task of tasks) {
            taskContent += `
                <li class="tasksList__item ${task.done && hideDoneTasks ? "tasksList__item--hidden" : ""} js-tasksList">
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
        };
        document.querySelector(".js-tasksList").innerHTML = taskContent;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class="buttons__liveButton js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button>

        <button class="buttons__liveButton js-markAllAsDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ wszystkie
        </button>
        `;
    };

    const bindButtonEvents = () => {
        const markAllAsDoneButton = document.querySelector(".js-markAllAsDone");

        if (markAllAsDoneButton) {
            markAllAsDoneButton.addEventListener("click", markTasksAsDone);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks")

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindToggleDoneEvents();
        renderButtons();
        bindButtonEvents();
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
