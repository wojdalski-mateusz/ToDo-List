{
    const tasks = [
        {
            content: "zadanie 1"
        },
        {
            content: "zadanie 2"
        },
        {
            content: "zadanie 3"
        },
    ];


    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
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
                <li ${task.done ? "style =\"text-decoration: line-through\"" : ""}>
                <button class="js-toggleDone">${task.done ? "Zrobione" : "Niezrobione"}</button>
                ${task.content}
                <button class="js-remove">Usuń</button>
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

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}