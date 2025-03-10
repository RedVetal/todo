document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
    // Загрузка задач из LocalStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Функция для отображения задач
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
          li.classList.add('completed');
        }
  
        // Кнопка удаления
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.addEventListener('click', () => {
          tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        });
  
        // Отметка задачи как выполненной
        li.addEventListener('click', () => {
          task.completed = !task.completed;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        });
  
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }
  
    // Добавление новой задачи
    addTaskBtn.addEventListener('click', () => {
      const text = taskInput.value.trim();
      if (text !== '') {
        tasks.push({ text, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
      }
    });
  
    // Инициализация
    renderTasks();
  });