
//Exist check
function checkCatExistense(newData){
    console.log(newData)
    if(newData){
      let doesMatched = getCatData().some(item => item === newData);
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
function saveCatData(updatedArray){
   localStorage.setItem('cats', JSON.stringify(updatedArray));
   displayCatList();
   //Reset input field 
   document.querySelectorAll('input').forEach(item => {
      item.value = '';
   })
}

//Get function
function getCatData(){
 let isExistData = localStorage.getItem('cats') ;
 if(isExistData){
    return JSON.parse(localStorage.getItem('cats'));
 }else{
    localStorage.setItem('cats',JSON.stringify([]));
    return [];
 }
}

//Add function 
function addCatData(){
   let newData = document.querySelector(".cat-name").value;
   
   if(newData ===''){
      alert("Please fill value");
      return;
   }
   let getResult = checkCatExistense(newData);
   if(getResult){
      let allData = getCatData();
      allData.push(newData);
      saveCatData(allData);
   }else{
      alert("Same name already taken !");
   }
}

// Edit Function
function editCat(){
   let newData = document.querySelector("#catEditModal .new-cat-name").value;
   let oldData = document.querySelector("#catEditModal .old-cat-name").value;
   if(newData ===''){
      alert("Please fill value");
      return;
   }
   let isNotExist = checkUnitExistense(newData);
   if(isNotExist){
   let data = getCatData().map(item => 
      {
         if(item === oldData){
            
                item = newData;
            }
            return item;
      }
      )
      saveCatData(data);
      updateCatEveryWhere(newData,oldData);

   }else{
      alert("No change ! Please change and save!")
   }

}

function deleteCat(){
   let targetedItem = document.querySelector("#catDeleteModal .deleting-value").value;
   let updatedData = getCatData().filter(item => item !== targetedItem );
   if(updatedData){
      saveCatData(updatedData);
   }
}

function displayCatList(list = getCatData()){
   let space = document.querySelector(".cat-name-list");
   let dom = list.map(item =>
      `
      <li  class="list-group-item d-flex justify-content-between mb-2">${item}
      <div class="d-flex gap-2">
         <button  onclick='passCatEditData("${item}")' data-bs-toggle="modal" data-bs-target="#catEditModal"  class="btn btn-sm btn-warning">Edit</button>
         <button onclick='passCatDeleteData("${item}")' data-bs-toggle="modal" data-bs-target="#catDeleteModal"  class="btn btn-sm btn-danger">Del</button>
      </div>
      </li>
  `
      );
  space.innerHTML = dom.join('');
     // Update the slect boxes 
     updateCatSelectBox();
}

displayCatList();



function passCatEditData(data){
   document.querySelector("#catEditModal .modal-title span").innerText = data;
   document.querySelector("#catEditModal .new-cat-name").value = data;
   document.querySelector("#catEditModal .old-cat-name").value = data;
}
function passCatDeleteData(data){
   document.querySelector("#catDeleteModal .modal-title").innerText = `Warning!`
   document.querySelector("#catDeleteModal .modal-body p").innerText= `Do you want to delete ${data}!`;
   document.querySelector("#catDeleteModal .deleting-value").value = data;
}

function updateCatSelectBox(selected=''){
   let catOptions =  getCatData().map(item =>
      `<option ${item === selected ? 'selected':''} value='${item}'>${item}</option>`
      ).join('');
   document.querySelector(".cost-cat").innerHTML = catOptions;
   document.querySelector(".edit-cat-name").innerHTML = catOptions;
}