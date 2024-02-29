function checkCurrentYearItemExistense(newData){
   if(newData){
     let doesMatched = getCurrentMonthItems().find(item => item.name === newData);
     if(doesMatched){
        return false;
     }else{
        return newData;
     }
   }else{
     alert("Please give a valid data");
   }
}


function addToMonth(){
    let qty = document.querySelector("#addToMonthModal .quantity-field").value;
    let budget = document.querySelector("#addToMonthModal .budget-field").value;
    let itemName = document.querySelector("#addToMonthModal .modal-title span").innerText;
    if(qty === '' || budget === '' ){
      alert('Please fill all field');
      return;
    } 

    let getResult = checkCurrentYearItemExistense(itemName);
    if(getResult){
     //Create Object 
     let allData = getCurrentMonthItems();
     let item = getCostData().find(item => item.name === itemName); //Getting cost field object ...
     item.requiredQty = parseFloat(qty);
     item.budget = parseFloat(budget);
     item.inMonth = getCurrentFullDate();
     allData.push(item);
  
     saveCurrentMonthItemData(allData);
    }else{
       alert("Same name already taken !");
    }
}

//Get function


  function saveCurrentMonthItemData(updatedArray){
   localStorage.setItem('currentMonthItems', JSON.stringify(updatedArray));
   displayCurrentMonthList();
   fetchAllItems();
   displayShortReports();
   //Reset input field 
   document.querySelectorAll('input').forEach(item => {
      item.value = '';
   });

}

function displayCurrentMonthList(list = getCurrentMonthItems()) {
   let space = document.querySelector("#pills-memo tbody");
   let dom = list.map(item => `
      <tr class="w-100 mt-5">
         <td class='item-name'>${item.name}</td>
         <td >${parseInt(Math.ceil(item.consumedBudget/item.ppu))} / ${item.requiredQty} ${item.unit}</td>
         <td>${kConverter(item.budget)} Tk</td>
         <td>${kConverter(item.consumedBudget)} Tk</td>
         <td>${ kConverter(item.budget - item.consumedBudget)} Tk</td>
         <td>
            <button onclick='addToBazar("${item.name}")' class="mt-1 btn btn-sm btn-dark ${item.inBazar && 'disabled'}">
               <i class="${item.isFixed ? `bi bi-cash-coin` :`${item.inBazar ? 'bi bi-bag-check':'bi bi-bag'}`} "></i>
            </button>
            <button onclick='PassDataToremoveFromCurrentMonth("${item.name}")' data-bs-toggle="modal" data-bs-target="#removeFromCurrentMonth" class="mt-1 btn btn-sm btn-danger ${item.inBazar || item.consumedBudget > 0 ? 'disabled':''}">
               <i class="bi bi-x-circle "></i>
            </button>
         </td>
      </tr>
   `).join('');
   space.innerHTML = dom;
}


displayCurrentMonthList();


function PassDataToremoveFromCurrentMonth(itemName){
   document.querySelector("#removeFromCurrentMonth .modal-title span").innerText = itemName;
   document.querySelector("#removeFromCurrentMonth .old-item-name").value = itemName;

}

function removeFromCurrentMonth(){
   let targetedItem =    document.querySelector("#removeFromCurrentMonth .old-item-name").value ;
      let updatedData = getCurrentMonthItems().filter(item => item.name !== targetedItem );
   
      if(updatedData){
         saveCurrentMonthItemData(updatedData);
      }
   

}
document.querySelector('.date-space').innerText = `${numberT(new Date().toDateString().split(" ")[2] )}  ${monthNameT(new Date().toDateString().split(" ")[1])  } ${numberT(new Date().getFullYear())} `;

function kConverter(k){

   let string = k.toString();
   let length = [...string];
   if(length[0] === '-' && length.length > 4){
    let number = parseInt(string);
    return Math.ceil((-number)/1000)+' k';
   }else if(length[0] !== '-' && length.length > 3){
    let number = parseInt(string);
    return Math.ceil((number)/1000)+' k';
   }else{
      return k;
   }
 }

//Display dashboard data 
