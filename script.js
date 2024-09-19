document.addEventListener("DOMContentLoaded", () => {
  const taskManager = document.querySelector(".task-manager");
  const addTaskButton = document.getElementById("addTask");
  const newTaskInput = document.getElementById("newTask");
  const tasksList = document.getElementById("tasks");

  const taskControls = document.createElement("div");
  taskControls.id = "taskControls";
  taskManager.insertBefore(taskControls, taskManager.firstChild);

  const allTasksBtn = document.createElement("button");
  allTasksBtn.id = "allTasks";
  allTasksBtn.textContent = "Todas";
  const completedTasksBtn = document.createElement("button");
  completedTasksBtn.id = "completedTasks";
  completedTasksBtn.textContent = "Concluídas";
  const notCompletedTasksBtn = document.createElement("button");
  notCompletedTasksBtn.id = "notCompletedTasks";
  notCompletedTasksBtn.textContent = "Não Concluídas";

  taskControls.appendChild(allTasksBtn);
  taskControls.appendChild(completedTasksBtn);
  taskControls.appendChild(notCompletedTasksBtn);

  const buttons = taskControls.querySelectorAll("button");
  buttons.forEach((button) => {
    button.style.margin = "5px";
    button.style.padding = "10px 20px";
    button.style.cursor = "pointer";
    button.style.backgroundColor = "#694eca";
    button.style.border = "none";
    button.style.color = "white";
    button.style.fontSize = "16px";
    button.style.borderRadius = "5px";

    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = "#481ce9";
    });
    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = "#694eca";
    });
  });

  function filterTasks(filter) {
    const lis = tasksList.getElementsByTagName("li");
    for (let li of lis) {
      if (filter === "all") {
        li.style.display = "";
      } else if (filter === "completed" && li.classList.contains("completed")) {
        li.style.display = "";
      } else if (
        filter === "notCompleted" &&
        !li.classList.contains("completed")
      ) {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    }
  }

  allTasksBtn.addEventListener("click", () => filterTasks("all"));
  completedTasksBtn.addEventListener("click", () => filterTasks("completed"));
  notCompletedTasksBtn.addEventListener("click", () =>
    filterTasks("notCompleted")
  );

  function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
      const li = document.createElement("li");
      const textSpan = document.createElement("span");
      textSpan.textContent = taskText;
      li.appendChild(textSpan);

      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.onclick = function () {
        editTask(textSpan);
      };

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remover";
      removeButton.onclick = function () {
        this.parentNode.remove();
      };

      li.appendChild(editButton);
      li.appendChild(removeButton);
      tasksList.appendChild(li);
      newTaskInput.value = "";
    }
  }

  function editTask(taskSpan) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = taskSpan.textContent;
    taskSpan.parentNode.replaceChild(input, taskSpan);
    input.focus();

    input.addEventListener("blur", function () {
      taskSpan.textContent = this.value;
      input.parentNode.replaceChild(taskSpan, input);
    });

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        taskSpan.textContent = this.value;
        input.parentNode.replaceChild(taskSpan, input);
      }
    });
  }

  addTaskButton.addEventListener("click", addTask);
  newTaskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
