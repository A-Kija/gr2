
const prioritySelectorDataLT = [
    { value: 1, label: 'Skubu' },
    { value: 2, label: 'Nelabai skubu' },
    { value: 3, label: 'Nesvarbu kada' }
];

const prioritySelectorDataEN = [
    { value: 1, label: 'Urgent' },
    { value: 2, label: 'Not urgent' },
    { value: 3, label: 'Whenever' }
];

let TASKS;
let Toasts = [];

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const init = _ => {
    const addButton = document.querySelector('[data-task-add]');
    addButton.addEventListener('click', addTask);
    renderPrioritySelector(prioritySelectorDataLT);


    TASKS = JSON.parse(localStorage.getItem('tasks')) || [];


    renderTasks();

}


const renderPrioritySelector = selectorData => {
    const selector = document.querySelector('[data-task-priority]');
    let html = '';
    selectorData.forEach(option => {
        html += `<option value="${option.value}">${option.label}</option>`;
    });
    selector.innerHTML = html;
}

const addTask = _ => {
    const taskInput = document.querySelector('[data-task-input]');
    const taskPriority = document.querySelector('[data-task-priority]');
    const id = getRandomIntInclusive(100000000, 999999999);

    const task = {
        id,
        task: taskInput.value,
        priority: parseInt(taskPriority.value),
        done: false
    }

    taskInput.value = '';
    taskPriority.value = 1;

    TASKS.unshift(task);

    localStorage.setItem('tasks', JSON.stringify(TASKS));

    renderTasks();

    addToast('Užduotis pridėta', 'add');


}

const renderTasks = _ => {
    
    let html = '';
    
    TASKS.forEach(t => {
        // const id = t.id;
        // const task = t.task;
        // const priority = t.priority;
        // const done = t.done;
        const { id, task, priority, done } = t;

        let li = `
                <li data-id="${id}">
                    <div class="task" data-task-view-priority="${priority}">
                        <div class="content" data-task-content contenteditable="true">${task}</div>
                        <div class="actions">
                            <button class="done ${done ? 'ok' : 'no'}" data-task-done>Atlikta</button>
                            <button class="delete" data-task-delete>Pašalinti</button>
                            <button class="save" data-task-save>Užsaugoti</button>
                        </div>
                    </div>
                </li>
                `;
        html += li;

    });

    const taskList = document.querySelector('[data-task-list]');
    taskList.innerHTML = html;
    addDeleteListener();
    addDoneListener();
    addSaveListener();
}

const renderToast = _ => {
    
    let html = '';

    Toasts.forEach(t => {
        const { id, message, type } = t;
        const li = `<li data-id="${id}" class="message ${type}">${message}</li>`;
        html += li;
    });

    const toastList = document.querySelector('[data-toast-bin]');
    toastList.innerHTML = html;

}

const addToast = (message, type) => {
    const id = getRandomIntInclusive(100000000, 999999999);
    const toast = {
        id,
        message,
        type
    }
    Toasts.unshift(toast);
    renderToast();
    setTimeout(_ => {
        Toasts = Toasts.filter(t => t.id !== id);
        renderToast();
    }, 5000);
}


const addDeleteListener = _ => {

    const lis = document.querySelectorAll('[data-task-list] li');

    lis.forEach(li => {
        const deleteButton = li.querySelector('[data-task-delete]');
        deleteButton.addEventListener('click', _ => {
            const id = parseInt(li.dataset.id);
            TASKS = TASKS.filter(task => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify(TASKS));
            renderTasks();
            addToast('Užduotis pašalinta', 'delete');
        });
    });

}

const addDoneListener = _ => {

    const lis = document.querySelectorAll('[data-task-list] li');

    lis.forEach(li => {
        const doneButton = li.querySelector('[data-task-done]');
        doneButton.addEventListener('click', _ => {
            const id = parseInt(li.dataset.id);
            TASKS = TASKS.map(task => {
                if (task.id === id) {
                    task.done = !task.done;
                }
                return task;
            });
            localStorage.setItem('tasks', JSON.stringify(TASKS));
            renderTasks();
            if (TASKS.find(task => task.id === id).done) {
                addToast('Užduotis atlikta', 'ok');
            } else {
                addToast('Užduotis atšaukta', 'no');
            }
        });
    });
}


const addSaveListener = _ => {

    const lis = document.querySelectorAll('[data-task-list] li');

    lis.forEach(li => {
        const saveButton = li.querySelector('[data-task-save]');
        saveButton.addEventListener('click', _ => {
            const id = parseInt(li.dataset.id);
            const content = li.querySelector('[data-task-content]').innerText;
            TASKS = TASKS.map(task => {
                if (task.id === id) {
                    task.task = content;
                }
                return task;
            });
            localStorage.setItem('tasks', JSON.stringify(TASKS));
            addToast('Užduotis išsaugota', 'edit');
        });
    });
}



init();
