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
    }

    const render = () => {
        let taskContent = "";

        for (const task of tasks) {
            taskContent += `
                <li>
                ${task.content}
                <button class="js-remove">
                Usuń
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