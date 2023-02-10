const clearStatus = () =>
  document
    .querySelectorAll("#status p")
    .forEach((status) => document.getElementById("status").removeChild(status));

const addStatus = (status) =>
  (document.getElementById("status").innerHTML =
    document.getElementById("status").innerHTML + "<p>" + status + "</p>");

const changeStatus = (status) => {
  clearStatus();
  addStatus(status);
};

const addStatusError = (status) => {
  document.getElementById("status").innerHTML +=
    "<p class='error'>" + status + "</p>";
};

const removeStatusErrors = () =>
  document
    .querySelectorAll("#status p.error")
    .forEach((error) => document.getElementById("status").removeChild(error));

const addTitle = (status) =>
  (document.getElementById("status").innerHTML =
    document.getElementById("status").innerHTML + "<h3>" + status + "</h3>");

const createTableRow = () => document.createElement("tr");

const addTableRow = ({ tableBody, tableRow }) => {
  tableBody.appendChild(tableRow);
};

const addTableCell = ({ tableRow, value, colSpan, className }) => {
  const cell = document.createElement("td");

  cell.innerHTML = value;

  if (colSpan) {
    cell.colSpan = colSpan;
  }

  if (className) {
    cell.className = className;
  }

  tableRow.appendChild(cell);
};

const clearTableRows = ({ tableBody }) =>
  (document.getElementById(tableBody).innerHTML = "");

const hideTable = ({ tableId }) => {
  const table = document.getElementById(tableId);
  table.setAttribute("style", "display: none");
};
