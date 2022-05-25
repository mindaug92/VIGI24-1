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
    nameCell.innerText = item.name;

    let lastNameCell = document.createElement("td");
    lastNameCell.innerText = item.lastname;

    let ageCell = document.createElement("td");
    ageCell.innerText = item.age;

    let actionCell = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "DELETE";
    deleteButton.setAttribute("class", "btn btn-danger");
    deleteButton.addEventListener("click", () => {
      deleteStudent(item);
    });
    actionCell.appendChild(deleteButton);

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
