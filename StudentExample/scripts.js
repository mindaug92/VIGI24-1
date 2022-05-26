let loadStudents = async () => {
  try {
    const response = await fetch(`http://localhost:3000/student`);
    let students = await response.json();
    renderStudentsTable(students);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

let addStudent = async (student) => {
  try {
    const response = await fetch(`http://localhost:3000/student`, {
      method: "POST",
      body: JSON.stringify(student),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

let deleteStudent = async (student) => {
  try {
    const response = await fetch(
      `http://localhost:3000/student/${student.id}`,
      {
        method: "DELETE",
      }
    );
    let message = await response.text();
    alert(message);
    window.location.reload();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

let updateStudent = async (student) => {
  try {
    const response = await fetch(
      `http://localhost:3000/student/${student.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(student),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    let message = await response.text();
    alert(message);
    window.location.reload();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

let enableEditMode = async (row, student) => {
  let nameCell = row.querySelector("#name");
  nameCell.innerHTML = `<input type="text" value=${nameCell.innerText}>`;

  let lastNameCell = row.querySelector("#lastname");
  lastNameCell.innerHTML = `<input type="text" value=${lastNameCell.innerText}>`;

  let ageCell = row.querySelector("#age");
  ageCell.innerHTML = `<input type="text" value=${ageCell.innerText}>`;

  let actionCell = row.querySelector("#actions");
  actionCell.innerHTML = "";

  let cells = {
    nameCell,
    lastNameCell,
    ageCell,
    actionCell,
  };

  createEditModeActions(cells, row, student);
};

let createButton = async (innerText, id, className, eventListener) => {
  let button = document.createElement("button");
  button.innerText = innerText;
  button.setAttribute("id", id);
  button.setAttribute("class", className);
  button.addEventListener("click", eventListener);
  return button;
};

let createViewModeActions = async (actionCell, row, item) => {
  let deleteButton = await createButton(
    "DELETE",
    "btn-delete",
    "btn btn-danger",
    () => deleteStudent(item)
  );

  let editButton = await createButton(
    "EDIT",
    "btn-edit",
    "btn btn-warning",
    () => enableEditMode(row, item)
  );

  actionCell.append(editButton, deleteButton);
};

let createEditModeActions = async (cells, row, item) => {
  let saveButton = await createButton(
    "SAVE",
    "btn-save",
    "btn btn-success",
    () => {
      updateStudent({
        id: item.id,
        name: cells.nameCell.querySelector("input").value,
        lastname: cells.lastNameCell.querySelector("input").value,
        age: cells.ageCell.querySelector("input").value,
      });
    }
  );

  let cancelButton = await createButton(
    "CANCEL",
    "btn-cancel",
    "btn btn-danger",
    async () => {
      cells.nameCell.innerHTML = item.name;
      cells.lastNameCell.innerHTML = item.lastname;
      cells.ageCell.innerHTML = item.age;
      cells.actionCell.innerHTML = "";
      await createViewModeActions(cells.actionCell, row, item);
    }
  );

  cells.actionCell.append(saveButton, cancelButton);
};

let renderStudentsTable = async (students) => {
  let studentsTable = document.getElementById("student-table");
  renderTableHead(students, studentsTable);
  renderTableBody(students, studentsTable);
};

let renderTableHead = async (data, table) => {
  let thead = document.createElement("thead");
  let tr = document.createElement("tr");
  let keys = Object.keys(data[0]);

  for (let key of keys) {
    let th = document.createElement("th");
    th.innerText = key.toUpperCase();
    tr.appendChild(th);
  }

  let th = document.createElement("th");
  th.innerText = "ACTIONS";
  tr.appendChild(th);

  thead.appendChild(tr);
  table.appendChild(thead);
};

let renderTableBody = async (data, table) => {
  let tbody = document.createElement("tbody");

  for (let item of data) {
    let tr = document.createElement("tr");

    let idCell = document.createElement("th");
    idCell.innerText = item.id;

    let nameCell = document.createElement("td");
    nameCell.setAttribute("id", "name");
    nameCell.innerText = item.name;

    let lastNameCell = document.createElement("td");
    lastNameCell.setAttribute("id", "lastname");
    lastNameCell.innerText = item.lastname;

    let ageCell = document.createElement("td");
    ageCell.setAttribute("id", "age");
    ageCell.innerText = item.age;

    let actionCell = document.createElement("td");
    actionCell.setAttribute("id", "actions");
    await createViewModeActions(actionCell, tr, item);

    tr.append(idCell, nameCell, lastNameCell, ageCell, actionCell);

    tbody.appendChild(tr);
    table.appendChild(tbody);
  }
};

let renderForm = async () => {
  let form = document.getElementById("student-form");
  form.addEventListener("submit", (event) => {
    let student = {
      name: event.target.name.value,
      lastname: event.target.lastname.value,
      age: +event.target.age.value,
    };

    addStudent(student);
  });
};

let render = async () => {
  loadStudents();
  renderForm();
};

render();
