
let currentYearName = new Date().toDateString().split(" ")[3];
function openNewMonth(data){
   document.querySelector(".newMonthModal").click();
   document.querySelector("#newMonthModalAlert .monthName").innerText= data.value;
}
function getCurrentYear(){
   let isExistData = localStorage.getItem('currentYear') ;
   if(isExistData){
      return localStorage.getItem('currentYear');
   }else{
      localStorage.setItem('currentYear',currentYearName);
      return currentYearName;
   }
}
function saveCurrentYear(){
    localStorage.set('currentYear', currentYearName);
}

function getCurrentMonth(){
   let isExistData = localStorage.getItem('currentMonth') ;
   if(isExistData){
      return localStorage.getItem('currentMonth');
   }else{
      localStorage.setItem('currentMonth',new Date().toDateString().split(" ")[1]);
      return new Date().toDateString().split(" ")[1];
   }
}
function saveCurrentMonth(){
   let shiftableMonth = document.querySelector("#newMonthModalAlert .monthName").innerText;
    localStorage.setItem('currentMonth', shiftableMonth);
    addToBazarHistory();
    saveCurrentMonthItemData([]);

}
function getCurrentFullDate(){
   return getCurrentMonth()+','+currentYearName;
}


function getCurrentMonthItems(){
    let isExistData = localStorage.getItem('currentMonthItems') ;
    if(isExistData){
       return JSON.parse(localStorage.getItem('currentMonthItems'));
    }else{
       localStorage.setItem('currentMonthItems',JSON.stringify([]));
       return [];
    }
   }

function search(e,getData, displayData){
 let userInput = e.target.value;
 console.log(userInput);
  if(userInput.length > 0){
   let matchedData = getData().filter(item => item.name.toLowerCase().includes(userInput.toLowerCase()));
   displayData(matchedData);
   
  }else{
   displayData();
  }
}

function updateUnitEveryWhere(newData,oldData){
   saveCostData(getCostData().map(item => item.unit === oldData ? {...item,unit:newData}: item));
   saveCurrentMonthItemData(getCurrentMonthItems().map(item => item.unit === oldData ? {...item,unit:newData}: item));
   saveCurrentBazarList(getCurrentBazarList().map(item => item.unit === oldData ? {...item,unit:newData}: item));
   saveToBazarHistory(getBazarHistory().map(item => item.unit === oldData ? {...item,unit:newData}: item));
}
function updateCatEveryWhere(newData,oldData){
   saveCostData(getCostData().map(item => item.cat === oldData ? {...item,cat:newData}: item));
   saveCurrentMonthItemData(getCurrentMonthItems().map(item => item.cat === oldData ? {...item,cat:newData}: item));
   saveCurrentBazarList(getCurrentBazarList().map(item => item.cat === oldData ? {...item,cat:newData}: item));
   saveToBazarHistory(getBazarHistory().map(item => item.cat === oldData ? {...item,cat:newData}: item));
}
function updateFullYearItemEveryWhere(newData, newCat, newUnit,oldData){
   saveCostData(getCostData().map(item => item.name === oldData ? {...item,cat:newCat,unit:newUnit,name:newData}: item));
   saveCurrentMonthItemData(getCurrentMonthItems().map(item => item.name === oldData ? {...item,cat:newCat,unit:newUnit,name:newData}: item));
   saveCurrentBazarList(getCurrentBazarList().map(item => item.name === oldData ? {...item,cat:newCat,unit:newUnit,name:newData}: item));
   saveToBazarHistory(getBazarHistory().map(item => item.name === oldData ? {...item,cat:newCat,unit:newUnit,name:newData}: item));
}

