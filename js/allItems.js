function fetchAllItems(list = getCostData()){
    let space = document.querySelector("#pills-items tbody");
    let dom  =list.map(item => {
        let inCurrentMonth = getCurrentMonthItems().some(current => current.name === item.name);
        return `
        <tr  class="w-100 mt-5" ${inCurrentMonth ? 'style=background-color:#dfd;':''}  >
            <td>${item.name}</td>
            <td>
                <button onclick='passUpdateUnitPriceData("${item.name}","${item.value}","${item.unit}")' data-bs-toggle="modal" data-bs-target="#setUnitPriceModal" class='btn btn-sm btn-dark text-light '>${item.isFixed?('Fixed' + '('+item.ppu+')')  :`${item.ppu ?? 'X'} tk per ${item.unit}`}</button>
            </td>
            <td>
            <button onclick='passCostDataToAddInMonth("${item.name}","${item.unit}","${item.ppu}")' data-bs-toggle="modal" data-bs-target="#addToMonthModal" class='${inCurrentMonth ? 'bi bi-check-all':'bi bi-plus-square'} btn btn-sm btn-success text-white ${inCurrentMonth ? "disabled" : ""}'> ${inCurrentMonth ? "  Added" : " Add to Month"} </button>
            </td>
          </tr>
`
        }).join('');
        space.innerHTML = dom;

    }

 

 fetchAllItems();
function passCostDataToAddInMonth(itemName, itemUnit, itemPPU){
    document.querySelector("#addToMonthModal .modal-title span").innerText = itemName;
    document.querySelector("#addToMonthModal .unit-space").innerText = `${itemUnit}/${itemPPU}`;
    document.querySelector("#addToMonthModal .ppu").value = itemPPU;
}
function makeEstBudget(){
    let itemUnitPrice = document.querySelector("#addToMonthModal .ppu").value;
    let inputVal = document.querySelector("#addToMonthModal .quantity-field").value;
    let estBudget = parseFloat(itemUnitPrice) * parseFloat(inputVal);
    document.querySelector("#addToMonthModal .budget-field").value = estBudget;
}

function passUpdateUnitPriceData(itemName,itemValue, itemUnit){
    document.querySelector("#setUnitPriceModal .new-PPU").value = itemValue;
    document.querySelector("#setUnitPriceModal .modal-title span.unit").innerText = itemUnit;
    document.querySelector("#setUnitPriceModal .modal-title span.itemName").innerText = itemName;
}

function updateUnitPrice(){
    let newPPU =  parseInt(document.querySelector("#setUnitPriceModal .new-PPU").value ) ;
    itemName = document.querySelector("#setUnitPriceModal .modal-title span.itemName").innerText;
    console.log(newPPU);
    let updatedData = getCostData().map(item => 
        {
           if(item.name === itemName){
                  item.ppu = newPPU;
                  item.budget = item.requiredQty * newPPU;
              }
              return item;
        }
        );
    let updatedCurrentMonthData = getCurrentMonthItems().map(item => 
        {
           if(item.name === itemName){
                  item.ppu = newPPU;
                  item.budget = item.requiredQty * newPPU;

              }
              return item;
        }
        );
     saveCostData(updatedData);
     saveCurrentMonthItemData(updatedCurrentMonthData);
}


