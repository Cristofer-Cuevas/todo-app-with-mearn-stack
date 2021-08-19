const addBtn = document.querySelector(".add-btn");
const addInp = document.querySelector(".add-inp");
const form = document.querySelector(".form");
const taskName = document.querySelectorAll(".taskName");
const deleteBtn = document.querySelectorAll(".delete-btn");
const finishedBtn = document.querySelectorAll(".finished-btn");
const statusRow = Array.from(document.querySelectorAll(".table-data-status"));
const tableRows = Array.from(document.querySelector(".tbody").rows);

const tasks = [];

taskName.forEach((name) => {
  tasks.push(name.textContent);
});

console.log(tasks);

const tasksLength = tasks.length >= 10;

const lengthError = document.querySelector(".length-error");
const tasksLengthError = document.querySelector(".tasks-length-error");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (regEx.test(addInp.value) == false) {
    console.log("hola");
    lengthError.classList.add("show-error");
  } else if (tasksLength == true) {
    console.log("executed");
    tasksLengthError.classList.add("show-error");
  } else {
    form.submit();
  }
});

finishedBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    const taskStatus = (statusRow[index].textContent = "Completed");

    console.log(tasks[index]);

    fetch("http://127.0.0.1:3000/profileform", {
      method: "PUT",
      // cache: false,
      body: JSON.stringify({
        todoname: tasks[index],
        todostatus: taskStatus,
      }),
      headers: { "Content-type": "application/json" },
    });

    tableRows[index].classList.add("table-row");
  });
});

statusRow.forEach((status) => {
  // The parent element of the status celda is table row so we adding to that row the background in case the task is marked as completed
  if (status.textContent == "Completed") {
    status.parentElement.classList.add("table-row");
  }
});

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    fetch("http://127.0.0.1:3000/profileform", {
      method: "delete",
      // cache: false,
      body: JSON.stringify({
        todoname: tasks[index],
      }),
      headers: { "Content-type": "application/json" },
    }).then((res) => location.reload());
  });
});

const regEx = /^(?:\b\w+\b[\s\r\n]*){1,7}$/;

const addInpLenght = () => {
  if (regEx.test(addInp.value) == false) {
    pError.classList.add("show-error");
  }
};

console.log(addInp);
