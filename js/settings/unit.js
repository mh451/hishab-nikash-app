
//Exist check
function checkUnitExistense(newData){
    if(newData){
      let doesMatched = getUnitData().some(item => item === newData);
      if(doesMatched){
         return false;
      }else{
         return newData;
      }
    }else{
      alert("Please give a valid data");
    }
}

//Save function (Common)
function saveUnitData(updatedArray){
   localStorage.setItem('units', JSON.stringify(updatedArray));
   displayUnitList();
   //Reset input field 
   document.querySelectorAll('input').forEach(item => {
      item.value = '';
   });

}

//Get function
function getUnitData(){
 let isExistData = localStorage.getItem('units') ;
 if(isExistData){
    return JSON.parse(localStorage.getItem('units'));
 }else{
    localStorage.setItem('units',JSON.stringify([]));
    return [];
 }
}

//Add function 
function addUnitData (){
   let newData = document.querySelector(".unit-name").value;
   let getResult = checkUnitExistense(newData);
   if(getResult){
      let allData = getUnitData();
      allData.push(newData);
      saveUnitData(allData);
   }else{
      alert("Same name already taken !");
   }
}

// Edit Function
function editUnit(){
   let newData = document.querySelector("#unitEditModal .new-unit-name").value;
   let oldData = document.querySelector("#unitEditModal .old-unit-name").value;
   console.log("new Data " + newData + " Old data "+ oldData);
   let isNotExist = checkUnitExistense(newData);
   if(isNotExist){
   let data = getUnitData().map(item => 
      {
         if(item === oldData){
                item = newData;
            }
            return item;
      }
      )

   saveUnitData(data);
   updateUnitEveryWhere(newData,oldData);

   }else{
      alert("No change ! Please change and save!")
   }

}


function deleteUnit(){
   let targetedItem = document.querySelector("#unitDeleteModal .deleting-value").value;
   let updatedData = getUnitData().filter(item => item !== targetedItem );
   if(updatedData){
      saveUnitData(updatedData);
   }
}

function displayUnitList(){
   let space = document.querySelector(".unit-name-list");
   let dom = getUnitData().map(item =>
      `
      <li  class="list-group-item d-flex justify-content-between mb-2">${item}
      <div class="d-flex gap-2">
         <button onclick='passUnitEditData("${item}")' data-bs-toggle="modal" data-bs-target="#unitEditModal"  class="btn btn-sm btn-warning">Edit</button>
         <button onclick='passUnitDeleteData("${item}")' data-bs-toggle="modal" data-bs-target="#unitDeleteModal"  class="btn btn-sm btn-danger">Del</button>
      </div>
      </li>
  `
      );
  space.innerHTML = dom.join('');
   // Update the slect boxes 
   updateUnitSelectBox();
}

displayUnitList();


function passUnitEditData(data){
   document.querySelector("#unitEditModal .modal-title span").innerText = data;
   document.querySelector("#unitEditModal .new-unit-name").value = data;
   document.querySelector("#unitEditModal .old-unit-name").value = data;
}
function passUnitDeleteData(data){
   document.querySelector("#unitDeleteModal .modal-title").innerText = `Warning!`
   document.querySelector("#unitDeleteModal .modal-body p").innerText= `Do you want to delete ${data}!`;
   document.querySelector("#unitDeleteModal .deleting-value").value = data;
}
function updateUnitSelectBox(selected=''){
   let unitOptions =  getUnitData().map(item =>
      `<option ${item === selected ? 'selected':''}>${item}</option>`
      ).join('');
   document.querySelector(".cost-unit").innerHTML = unitOptions;
   document.querySelector(".edit-unit-name").innerHTML = unitOptions;
}

