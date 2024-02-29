
//Exist check
function checkCostExistense(newData){
    console.log(newData);
    if(newData){
        let costArray = getCostData();
        let doesMatched = costArray.some(item => item.name === newData);
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
function saveCostData(updatedArray){
   localStorage.setItem('costs', JSON.stringify(updatedArray));
   displayCostList();
   //Reset input field 
   document.querySelectorAll('input').forEach(item => {
      item.value = '';
   });
   fetchAllItems();

}

//Get function
function getCostData(){
const costsEntries = []; // Create an array with an object
 let isExistData = localStorage.getItem('costs') ;
 if(isExistData){
    return  JSON.parse(localStorage.getItem('costs'));
   
 }else{
    localStorage.setItem('costs',JSON.stringify(costsEntries));
    return [];
 }
}

//Add function 
function addCostData (){
   let costName = document.querySelector(".cost-name").value;
   let costCat = document.querySelector(".cost-cat").value;
   let costUnit = document.querySelector(".cost-unit").value;
   if(costName === ''){
      alert('Please insert khoroch item');
      return;
   }
   if(costCat === ''){
      alert('Please select category');
      return;
   }
   if(costUnit === ''){
      alert('Please select unit');
      return;
   }

   let getResult = checkCostExistense(costName);
   if(getResult){
    //Create Object 
    let costData = {
        'name':costName,
        'cat':costCat,
        'unit':costUnit,
        'ppu':0,
        'inBazar':false,
        'inMonth':'',
        'requiredQty':0,
        'budget':0,
        'consumedBudget':0,
        'isFixed':false
    }
      let allData = getCostData();
    allData.push(costData);
    console.log(allData)
    saveCostData(allData);
   }else{
      alert("Same name already taken !");
   }
}

// Edit Function
function editCost(){
   let newData = document.querySelector("#costEditModal .new-cost-name").value;
   let oldData = document.querySelector("#costEditModal .old-cost-name").value;
   let newUnit = document.querySelector("#costEditModal .edit-unit-name").value;
   let newCat = document.querySelector("#costEditModal .edit-cat-name").value;
   let isNotExist
   if(oldData === newData){
      isNotExist = true;
   }else{
      isNotExist  = checkCostExistense(newData);

   }
   if(isNotExist){
   let data = getCostData().map(item => 
      {
         if(item.name === oldData){
                item.name = newData;
                item.cat = newCat;
                item.unit = newUnit;
                updateFullYearItemEveryWhere(newData,newCat,newUnit,oldData)

            }
            return item;
      }
      );

   saveCostData(data);

   }else{
      alert("Already exist !")
   }

}


function deleteCost(){
   let targetedItem = document.querySelector("#costDeleteModal .deleting-value").value;
   let updatedData = getCostData().filter(item => item.name !== targetedItem );

   if(updatedData){
      saveCostData(updatedData);
   }
}

function displayCostList(list=getCostData()){
   let space = document.querySelector(".cost-name-list");
   let dom = list.map(item =>
      `
      <li  class="list-group-item d-flex justify-content-between mb-2">${item.name}
      <div class="d-flex gap-2">
         <button onclick='handleIsFixed("${item.name}")'   class="btn btn-sm ${item.isFixed ? 'btn-dark': 'btn-secondary'}">${item.isFixed ? '': 'Not'} Fixed Bill </button>
         <button onclick='passCostEditData(${JSON.stringify(item)})' data-bs-toggle="modal" data-bs-target="#costEditModal"  class="btn btn-sm btn-warning">Edit</button>
         <button onclick='passCostDeleteData("${item.name}")' data-bs-toggle="modal" data-bs-target="#costDeleteModal"  class="btn btn-sm btn-danger ">Del</button>
      </div>
      </li>
  `
      );
  space.innerHTML = dom.join('');
   // Update the slect boxes 
}



function handleIsFixed(itemName){
   console.log(itemName);

   let data = getCostData().map(item => 
      {
         if(item.name === itemName){
                item.isFixed ? item.isFixed = false : item.isFixed = true;
            }
            return item;
      }
      );
   let updateData = getCurrentMonthItems().map(item => 
      {
         if(item.name === itemName){
                item.isFixed ? item.isFixed = false : item.isFixed = true;
            }
            return item;
      }
      );


   saveCostData(data);
   saveCurrentMonthItemData(updateData);
}
function passCostEditData(item){
   document.querySelector("#costEditModal .modal-title span").innerText = item.name;
   document.querySelector("#costEditModal .new-cost-name").value = item.name;
   document.querySelector("#costEditModal .old-cost-name").value = item.name;
   updateCatSelectBox(item.cat);
   updateUnitSelectBox(item.unit);
}
function passCostDeleteData(data){
   document.querySelector("#costDeleteModal .modal-title").innerText = `Warning!`
   document.querySelector("#costDeleteModal .modal-body p").innerText= `Do you want to delete ${data}!`;
   document.querySelector("#costDeleteModal .deleting-value").value = data;
}
displayCostList();
