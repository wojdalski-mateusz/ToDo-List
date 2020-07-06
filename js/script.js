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

    const render = () => {
        let taskContent = "";

        for (const task of tasks) {
            taskContent += `
                <li>
                ${task.content}
                </li>
            `;
        }
        document.querySelector(".js-tasksList").innerHTML = taskContent;
    }

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

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