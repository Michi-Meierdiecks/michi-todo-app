function addTask(event) {
    event.preventDefault();

    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');
    var savedTaskList = document.getElementById('savedTaskList');

    if (taskInput.value.trim() !== '') {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value));
        li.classList.add('task-item');

       
        var deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode('Löschen'));
        deleteButton.onclick = function() {
            deleteTask(li);
        };
        li.appendChild(deleteButton);

        taskList.appendChild(li);

        
        saveTask(taskInput.value);

        taskInput.value = '';
    }

    return false;
}

function saveTask(task) {
   
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  
    tasks.push(task);

   
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var taskList = document.getElementById('taskList');
    var savedTaskList = document.getElementById('savedTaskList');
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];


    taskList.innerHTML = '';
    savedTaskList.innerHTML = '';


    tasks.forEach(function(task) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(task));
        li.classList.add('task-item');

    
        var deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode('Löschen'));
        deleteButton.onclick = function() {
            deleteTask(li);
        };
        li.appendChild(deleteButton);

        savedTaskList.appendChild(li);
    });
}

function deleteTask(taskElement) {
    var savedTaskList = document.getElementById('savedTaskList');
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var taskText = taskElement.textContent;
    tasks = tasks.filter(function(task) {
        return task !== taskText;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    savedTaskList.removeChild(taskElement);
}

function clearLocalStorage() {

    localStorage.removeItem('tasks');

    var savedTaskList = document.getElementById('savedTaskList');
    savedTaskList.innerHTML = '';
}

loadTasks();
