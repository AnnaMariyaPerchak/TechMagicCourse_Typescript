var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let tableBody = document.getElementById("data");
let table = document.getElementById("table");
let head = document.getElementById("head");
let paginationEl = document.getElementById("pagination");
let currentPage = 1;
let rows = 15;
let i;
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('https://jsonplaceholder.typicode.com/posts ');
        let data = yield response.json();
        return data;
    });
}
function renderData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield getData().then(data => {
            drawTable(tableBody, data);
            displayList(data, table, rows, currentPage);
            setupPagination(data, paginationEl, rows);
            //updateObjectInArray шукає перший попавшийсься йому елемент з вказаним userId і
            // в ньому міняє вказане поле на останнє значення,яке вказують в переліку параметрів
            console.log(updateObjectInArray(data, data[95].userId, 2));
        });
    });
}
let drawHeader = (table) => {
    let header = table.createTHead();
    let row = header.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.innerHTML = "ID";
    cell1.setAttribute("align", "center");
    cell2.innerHTML = "User ID";
    cell2.setAttribute("align", "center");
    cell3.innerHTML = "Title";
    cell3.setAttribute("align", "center");
    cell4.innerHTML = "Body";
    cell4.setAttribute("align", "center");
};
let drawTable = (tbody, array) => {
    let tr, td;
    for (let i = 0; i < array.length; i++) {
        tr = tbody.insertRow(tbody.rows.length);
        td = tr.insertCell(tr.cells.length);
        td.setAttribute("align", "center");
        td.innerHTML = array[i].id;
        td = tr.insertCell(tr.cells.length);
        td.setAttribute("align", "center");
        td.innerHTML = array[i].userId;
        td = tr.insertCell(tr.cells.length);
        td.setAttribute("align", "center");
        td.innerHTML = array[i].title;
        td = tr.insertCell(tr.cells.length);
        td.setAttribute("align", "center");
        td.innerHTML = array[i].body;
    }
};
function displayList(items, wrapper, rowsPerPage, page) {
    wrapper.innerHTML = "";
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let paginatedItems = items.slice(start, end);
    drawHeader(table);
    drawTable(table, paginatedItems);
}
function setupPagination(items, wrapper, rowsPerPage) {
    wrapper.innerHTML = "";
    let pageCount = Math.ceil(items.length / rowsPerPage);
    for (let i = 1; i < pageCount + 1; i++) {
        const btn = paginationButton(i, items);
        wrapper.appendChild(btn);
    }
}
function paginationButton(page, items) {
    const button = document.createElement("button");
    button.textContent = page.toString();
    if (currentPage === page) {
        button.classList.add("active");
    }
    button.addEventListener("click", function () {
        currentPage = page;
        displayList(items, table, rows, currentPage);
        let currentBtn = document.querySelector(".pagination button.active");
        currentBtn === null || currentBtn === void 0 ? void 0 : currentBtn.classList.remove("active");
        button.classList.add("active");
    });
    return button;
}
function updateObjectInArray(array, key, newKeyValue) {
    let index = array.findIndex(el => key === el.userId);
    i = index;
    array[index].userId = newKeyValue;
    setTimeout(() => alert(`You change user id of ${index} element from ${key} to ${newKeyValue}`), 3000);
    return array[index];
}
renderData();
//# sourceMappingURL=main.js.map