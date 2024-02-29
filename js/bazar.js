function checkCurrentBazarList(newData){
    if(newData){
      let doesMatched = getCurrentBazarList().find(item => item.name === newData);
      if(doesMatched){
         return false;
      }else{
         return newData;
      }
    }else{
      alert("Please give a valid data");
    }
 }
function addToBazar(itemName){

    let getResult = checkCurrentBazarList(itemName);
    if(getResult){
     //Create Object 
     let item = getCurrentMonthItems().find(item => item.name === itemName); //Getting cost field object from current month ...
     item.inBazar = true;
     item.requiredQty=0;
     item.budget=0;
     item.consumedBudget=0;
     let fullYearsItem = getCurrentMonthItems().map(oldItem => {if(oldItem.name === itemName ){oldItem.inBazar = true;} return oldItem});
  
      saveCurrentMonthItemData(fullYearsItem);
      let allData = getCurrentBazarList();
      allData.push(item);
     saveCurrentBazarList(allData);

     
    }else{
       alert("Same name already taken !");
    }
}
function removeFromBazar(itemName){
     //Create Object 
     let currentBazarListUpdated = getCurrentBazarList().filter(item => item.name !== itemName && item );//Getting cost field object from current month ...

     let fullYearsItem = getCurrentMonthItems().map(oldItem => {if(oldItem.name === itemName ){oldItem.inBazar = false;} return oldItem});
  
     saveCurrentMonthItemData(fullYearsItem);
     saveCurrentBazarList(currentBazarListUpdated);
  
}


function saveCurrentBazarList(updatedArray){
    localStorage.setItem('bazarList', JSON.stringify(updatedArray));
    displayCurrentBazarList();
    displayCurrentMonthList();
    getShopingStatus();
    displayShortReports();
    updatePocketBal();
    //Reset input field 
    document.querySelectorAll('input').forEach(item => {
       item.value = '';
    });

 }

    function getCurrentBazarList(){
      let isExistData = localStorage.getItem('bazarList') ;
      if(isExistData){
         return  JSON.parse(localStorage.getItem('bazarList'));
        
      }else{
         localStorage.setItem('bazarList',JSON.stringify([]));
         return [];
      }
      }


      function displayCurrentBazarList(list = getCurrentBazarList()){
        let space = document.querySelector("#pills-bazar tbody");
        let dom  = list.map(item => 
           `
           <tr class="w-100 mt-5 ${item.consumedBudget > 0 && 'bg-custom'}">
           <td>${item.name}</td>
           <td class=' bg-dark text-white' ><span class='p-1' onblur='updateEstPrice(this.innerText,"${item.ppu}", "${item.name}")' contenteditable='true'>${item.requiredQty} </span> <span> ${item.unit} </span></td>
           <td id='${item.name}-budget'><span class='p-1 ' onblur='updateBudget(this.innerText, "${item.name}")' contenteditable='true'>${item.budget}</span> Tk</td>
           <td class='bg-danger text-white ' id='${item.name}-consumed'>
           <span class='p-1 ' onblur='updateCost(this.innerText, "${item.name}")' contenteditable='true' >${item.consumedBudget} </span><span> Tk  </span>
           </td>
           <td >${item.budget - item.consumedBudget} Tk</td>
           <td ><button onclick='removeFromBazar("${item.name}")' class='bazar-btn btn btn-sm btn-danger bi bi-x-circle  '></button></td>
       </tr>
       
           `
           ).join('');
           space.innerHTML = dom;

           if(getCurrentBazarList().length > 0){
               document.querySelector('#pills-bazar tfoot').classList.remove('d-none');
               let totalBudget = getCurrentBazarList().map(item => item.budget);
               document.querySelector('.bazar-budget').innerText = totalBudget.reduce((prevValue, current) => prevValue + current);
               let totalCost = getCurrentBazarList().map(item => item.consumedBudget);
               document.querySelector('.bazar-cost').innerText = totalCost.reduce((prevValue, current) => prevValue + current);
               let rBalance = getCurrentBazarList().map(item => {return item.budget - item.consumedBudget});
               document.querySelector('.bazar-balance').innerText = rBalance.reduce((prevValue, current) => prevValue + current);
           }else{
            document.querySelector('#pills-bazar tfoot').classList.add('d-none');
           }
         
     }

     function updateEstPrice(qty, ppu, itemName){
      let updatedBudget = parseFloat(ppu) * parseFloat(qty);
      let updatedData =  getCurrentBazarList().map(item => {
         if(item.name === itemName  ){
            item.requiredQty = parseFloat(qty);
            item.budget = parseFloat(updatedBudget);
         }
         return item;
      });
      saveCurrentBazarList(updatedData);

     }
      function updateCost(cost, itemName){
      
        let updatedData =  getCurrentBazarList().map(item => {
           if(item.name === itemName  ){
              item.consumedBudget = parseFloat(cost);
           }
           return item;
        });
        
       saveCurrentBazarList(updatedData);

      }
      function updatePocketBal(){
        let takenBal =  document.querySelector('.takenBal').innerText;
        saveTakenBal(takenBal);
        let totalCost;
        if(getCurrentBazarList().length > 0){
         totalCost = getCurrentBazarList().map(item => item.consumedBudget).reduce((prevValue, current) => prevValue + current);
        }else{
         totalCost = 0;
        }
        if((getTakenBal() - totalCost) > 0){
         document.querySelector('.r-bal').innerText =  getTakenBal() - totalCost;

        }
      }
      function getTakenBal(){
         let isExistData = localStorage.getItem('takenBal') ;
         if(isExistData){
            return  parseInt(localStorage.getItem('takenBal'));
           
         }else{
            localStorage.setItem('takenBal',0);
            return 0;
         }
         }
         function saveTakenBal(balance){
            localStorage.setItem('takenBal', balance);
            displaTakenBal();
         }
   
         function displaTakenBal(){
            if(getTakenBal() <= 0){
               document.querySelector('.r-bal').innerText = 0;
            }
               document.querySelector('.takenBal').innerText = getTakenBal();
         }
   
     
      function updateBudget(customBudget, itemName){
        let updatedData =  getCurrentBazarList().map(item => {
           if(item.name === itemName  ){
              item.budget = parseFloat(customBudget);
           }
           return item;
        });
       saveCurrentBazarList(updatedData);

      }


      function addToBazarHistory(){
         //1st update this month data total cost and in bazar status
         let fullYearsItem = getCurrentMonthItems().map(yearItem => {
            let matchedItem = getCurrentBazarList().find(item => item.name === yearItem.name && item);
            if(matchedItem){
               if(yearItem.name === matchedItem.name )
               {
                  yearItem.inBazar = false;
                  yearItem.consumedBudget = yearItem.consumedBudget + matchedItem.consumedBudget
               } 
               return yearItem;
            }else{
               return yearItem;
            }
            // console.log(matchedItem.name);
         });

         saveCurrentMonthItemData(fullYearsItem)
         //2nd step 
         let dateString = new Date().toDateString();
         let monthName = getCurrentFullDate();
         let fullDate = dateString.split(" ")[2]+','+getCurrentFullDate();
         let oldData = getBazarHistory();
         let newData = getCurrentBazarList();
         let updatedData = [...oldData, ...newData];
         saveToBazarHistory(updatedData);
         saveCurrentBazarList([]); //Removing all from bazar list


      }
      function getBazarHistory(){
         let isExistData = localStorage.getItem('bazarHistory') ;
         if(isExistData){
            return  JSON.parse(localStorage.getItem('bazarHistory'));
           
         }else{
            localStorage.setItem('bazarHistory',JSON.stringify([]));
            return [];
         }
      }
      function saveToBazarHistory(updatedArray){
         localStorage.setItem('bazarHistory', JSON.stringify(updatedArray));
                  saveTakenBal(0);
         // displayCurrentMonthList();
         //Reset input field 
    
      }

      // Bazar buttons locking system 
      function startShoping(){
         let isExistData = localStorage.getItem('isShopingStrated') ;
         if(isExistData){
            if(localStorage.getItem('isShopingStrated') === '1'){
               localStorage.setItem('isShopingStrated','0');

            }else{
               localStorage.setItem('isShopingStrated','1');
            }
         }else{
            localStorage.getItem('isShopingStrated') === '1'
         }
         getShopingStatus();
      }
      
      function lockButton(){
         localStorage.setItem('isShopingStrated','1');
         getShopingStatus();
      }
      

         function getShopingStatus(){
            let value =  localStorage.getItem('isShopingStrated');
            if(value === '1'){
               document.querySelectorAll('.bazar-btn').forEach(item => item.classList.add('disabled'));
               document.querySelector(".start-shop").innerText = 'Finish Shoping';
            }else{
               document.querySelectorAll('.bazar-btn').forEach(item => item.classList.remove('disabled'));
               document.querySelector(".start-shop").innerText = 'Start Shoping';

            }
         }
         // Bazar buttons locking system ended
         displayCurrentBazarList();
         getShopingStatus();
         displaTakenBal();