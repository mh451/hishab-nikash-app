
//Exist check
function checkMoneyExistense(newData){
    if(newData){
      let doesMatched = getMoneyData().some(item => item.name === newData);
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
function saveMoneyData(updatedArray){
   localStorage.setItem('balances', JSON.stringify(updatedArray));
   displayMoneyList();
   displayShortReports();
   //Reset input field 
   document.querySelectorAll('input').forEach(item => {
      item.value = '';
   });

}

//Get function
function getMoneyData(){
 let isExistData = localStorage.getItem('balances') ;
 if(isExistData){
    return JSON.parse(localStorage.getItem('balances'));
 }else{
    localStorage.setItem('balances',JSON.stringify([]));
    return [];
 }
}

//Add function 
function addMoneyData(){
   let moneyName = document.querySelector(".money-name").value;
   let moneyValue = document.querySelector(".money-value").value;

   if(moneyName === '' || moneyValue === ''){
      alert("Please fill all field");
      return;
   }
   let getResult = checkMoneyExistense(moneyName);
   if(getResult){
       //Create Object 
    let costData = {
        'name':moneyName,
        'value':moneyValue,
        'month':getCurrentFullDate()
    }
      let allData = getMoneyData();
      allData.push(costData);
      console.log(allData)
      saveMoneyData(allData);
   }else{
      alert("Same name already taken !");
   }
}

// Edit Function
function editMoney(){
   let newName = document.querySelector("#moneyEditModal .new-money-name").value;
   let oldName = document.querySelector("#moneyEditModal .old-money-name").value;
   let newValue = document.querySelector("#moneyEditModal .new-money-value").value;
   let oldValue = document.querySelector("#moneyEditModal .old-money-value").value;
   
   if(newName ===''){
      alert("Please fill name");
      return;
   }
   if(newValue ===''){
      alert("Please fill value");
      return;
   }

   let isNotExist = checkMoneyExistense(newValue);
   if(isNotExist){
   let data = getMoneyData().map(item => 
      {
         if(item.name === oldName){
                item.name = newName;
                item.value = newValue;
            }
            return item;
      }
      )
   saveMoneyData(data);

   }else{
      alert("No change ! Please change and save!")
   }

}


function deleteMoney(){
   let targetedItem = document.querySelector("#moneyDeleteModal .deleting-value").value;
   let updatedData = getMoneyData().filter(item=> item.name !== targetedItem );
   if(updatedData){
      saveMoneyData(updatedData);
   }
}

function displayMoneyList(){
   let space = document.querySelector(".money-name-list");
   let dom = getMoneyData().map(item =>
      `
      <li  class="list-group-item d-flex justify-content-between mb-2">${item.name} => ${item.value}
      <div class="d-flex gap-2">
         <button onclick='passMoneyEditData("${item.name}", "${item.value}")' data-bs-toggle="modal" data-bs-target="#moneyEditModal"  class="btn btn-sm btn-warning">Edit</button>
         <button onclick='passMoneyDeleteData("${item.name}", "${item.value}")' data-bs-toggle="modal" data-bs-target="#moneyDeleteModal"  class="btn btn-sm btn-danger">Del</button>
      </div>
      </li>
  `
      );
  space.innerHTML = dom.join('');
   // Update the slect boxes 
}

displayMoneyList();


function passMoneyEditData(itemName, itemValue){
   document.querySelector("#moneyEditModal .modal-title span").innerText = itemName;
   document.querySelector("#moneyEditModal .new-money-name").value = itemName;
   document.querySelector("#moneyEditModal .old-money-name").value = itemName;
   document.querySelector("#moneyEditModal .new-money-value").value = itemValue;
   document.querySelector("#moneyEditModal .old-money-value").value = itemValue;
}
function passMoneyDeleteData(itemName, itemValue){
   document.querySelector("#moneyDeleteModal .modal-title").innerText = `Warning!`
   document.querySelector("#moneyDeleteModal .modal-body p").innerText= `Do you want to delete ${itemName}!`;
   document.querySelector("#moneyDeleteModal .deleting-value").value = itemName;
}


function totalBalance(){
    let balanceArray = getMoneyData().map(item => item.month === getCurrentFullDate() && parseInt(item.value ));
    let totalBlance =  balanceArray.reduce((prevTotal, item ) => prevTotal + item);
    return totalBlance;
}

