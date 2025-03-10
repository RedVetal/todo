// Ждем, пока весь DOM загрузится
document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы DOM
    const taskInput = document.getElementById('taskInput'); // Поле ввода задачи
    const addTaskBtn = document.getElementById('addTaskBtn'); // Кнопка добавления задачи
    const taskList = document.getElementById('taskList'); // Список задач
  
    // Загружаем задачи из LocalStorage или создаем пустой массив
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Функция для отображения задач
    function renderTasks() {
      taskList.innerHTML = ''; // Очищаем список задач
  
      // Проходим по всем задачам
      tasks.forEach((task, index) => {
        // Создаем элемент списка
        const li = document.createElement('li');
        li.textContent = task.text; // Добавляем текст задачи
  
        // Если задача выполнена, добавляем класс completed
        if (task.completed) {
          li.classList.add('completed');
        }
  
        // Создаем кнопку удаления
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.addEventListener('click', () => {
          tasks.splice(index, 1); // Удаляем задачу из массива
          localStorage.setItem('tasks', JSON.stringify(tasks)); // Обновляем LocalStorage
          renderTasks(); // Перерисовываем задачи
        });
  
        // Добавляем обработчик для отметки задачи как выполненной
        li.addEventListener('click', () => {
          task.completed = !task.completed; // Меняем статус задачи
          localStorage.setItem('tasks', JSON.stringify(tasks)); // Обновляем LocalStorage
          renderTasks(); // Перерисовываем задачи
        });
  
        // Добавляем кнопку удаления в элемент списка
        li.appendChild(deleteBtn);
        // Добавляем элемент списка в список задач
        taskList.appendChild(li);
      });
    }
  
    // Добавляем обработчик для кнопки добавления задачи
    addTaskBtn.addEventListener('click', () => {
      const text = taskInput.value.trim(); // Получаем текст задачи и убираем лишние пробелы
  
      // Если текст не пустой, добавляем задачу
      if (text !== '') {
        tasks.push({ text, completed: false }); // Добавляем задачу в массив
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Обновляем LocalStorage
        taskInput.value = ''; // Очищаем поле ввода
        renderTasks(); // Перерисовываем задачи
      }
    });
  
    // Инициализация: отображаем задачи при загрузке страницы
    renderTasks();
  });