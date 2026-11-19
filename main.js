// Завдання з телеграму

const form = document.querySelector(".todo-form");
const input = form.querySelector(".todo-input");
const list = document.querySelector(".todo-list");
const counter = document.querySelector(".todo-counter");

function saveTasks() {
  const tasks = [...list.querySelectorAll("li")].map((li) => ({
    text: li.querySelector("span").textContent,
    done: li.getAttribute("data-done") === "true",
  }));

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach((task) => {
    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;

    li.appendChild(taskSpan);
    li.setAttribute("data-done", String(task.done));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✕";

    li.appendChild(deleteButton);
    list.appendChild(li);
  });

  updateCounter();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = input.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  li.appendChild(taskSpan);
  li.setAttribute("data-done", "false");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "✕";

  li.appendChild(deleteButton);
  list.appendChild(li);

  input.value = "";
  input.focus();

  saveTasks();
  updateCounter();
});

list.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (button) {
    const li = button.closest("li");

    if (li) {
      li.remove();
      saveTasks();
      updateCounter();
    }

    return;
  }

  const li = event.target.closest("li");

  if (li) {
    const isDone = li.getAttribute("data-done") === "true";

    li.setAttribute("data-done", isDone ? "false" : "true");

    saveTasks();
    updateCounter();
  }
});

function updateCounter() {
  const totalTasks = list.querySelectorAll("li").length;

  const doneTasks = list.querySelectorAll('li[data-done="true"]').length;

  counter.textContent = `Виконано: ${doneTasks} / ${totalTasks}`;
}

loadTasks();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => {
        console.log("PWA готово к работе!");
      })
      .catch((error) => {
        console.error("Ошибка регистрации PWA:", error);
      });
  });
}
