let tableBody = document.getElementById("data") as HTMLTableElement;
let table = document.getElementById("table") as HTMLTableElement;
let head = document.getElementById("head") as HTMLTableElement;
let paginationEl = document.getElementById("pagination") as HTMLDivElement;

  
let currentPage = 1;
let rows = 15;
let i:number

type Post={
    userId:number,
    id:number,
    title:string,
    body:string
}

async function getData():Promise<Post[]>{
  let response=await fetch('https://jsonplaceholder.typicode.com/posts ')
  let data=await response.json()
  return data
}
async function renderData(){
    await getData().then(data=>{
      drawTable(tableBody,data)
      displayList(data, table, rows, currentPage);
      setupPagination(data, paginationEl, rows);
      //updateObjectInArray шукає перший попавшийсься йому елемент з вказаним userId і
      // в ньому міняє вказане поле на останнє значення,яке вказують в переліку параметрів
      console.log(updateObjectInArray<Post>(data,data[95].userId,2))
    })
}

let drawHeader=(table:HTMLTableElement)=>{
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
}

let drawTable = (tbody,array:Post[]) => {
  let tr, td;
  for (let i = 0; i < array.length; i++) {
    tr = tbody.insertRow(tbody.rows.length);
    td = tr.insertCell(tr.cells.length);
    td.setAttribute("align", "center");
    td.innerHTML = array[i].id

    td = tr.insertCell(tr.cells.length);
    td.setAttribute("align", "center");
    td.innerHTML = array[i].userId

    td = tr.insertCell(tr.cells.length);
    td.setAttribute("align", "center");
    td.innerHTML = array[i].title

    td = tr.insertCell(tr.cells.length);
    td.setAttribute("align", "center");
    td.innerHTML = array[i].body
  }
};

function displayList(items:Post[],wrapper: HTMLDivElement,rowsPerPage: number,page: number) {
  wrapper.innerHTML = "";
  page--;

  let start = rowsPerPage * page;
  let end = start + rowsPerPage;

  let paginatedItems = items.slice(start, end);
  drawHeader(table)
  drawTable(table,paginatedItems)
}

function setupPagination(items:Post[],wrapper: HTMLDivElement,rowsPerPage: number) {
  wrapper.innerHTML = "";

  let pageCount = Math.ceil(items.length / rowsPerPage);

  for (let i = 1; i < pageCount + 1; i++) {
    const btn = paginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

function paginationButton(page: number, items:Post[]) {
  const button = document.createElement("button");
  button.textContent = page.toString();

  if (currentPage === page) {
    button.classList.add("active");
  }

  button.addEventListener("click", function () {
    currentPage = page;
    displayList(items, table, rows, currentPage);

    let currentBtn = document.querySelector(
      ".pagination button.active"
    ) as HTMLDivElement;
    currentBtn?.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}


function updateObjectInArray<Post>(array,key:number,newKeyValue:number):Post{
let index = array.findIndex(el => key === el.userId)
i=index
array[index].userId=newKeyValue
setTimeout(()=>alert(`You change user id of ${index} element from ${key} to ${newKeyValue}`),3000)
return array[index]
}

renderData()