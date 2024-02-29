function displayShortReports(){
    document.querySelector('#monthly-bal').innerText = getMonthlyEarning(getCurrentFullDate()) ;
    document.querySelector('#monthly-e-cost').innerText = getEstimatedCost(getCurrentFullDate()) ;
    document.querySelector('#monthly-costed').innerText = getCostedMoney(getCurrentFullDate()) ;
    document.querySelector('#monthly-r-balance').innerText =getRbalance(getCurrentFullDate());
    if((totalBalance() - getEstimatedCost(getCurrentFullDate())) < 0){
      document.querySelector('#monthly-ghatti').innerText = -(totalBalance() - getEstimatedCost(getCurrentFullDate()))  ; 
    }
    document.querySelector('#pills-home .short-report').innerHTML = 
    `${getMonthlyCostListByCat(getCurrentFullDate(),0)}`;
}
displayShortReports();
function displayDetailsReports(){
      //Displaying based on month
      let space = document.querySelector(".offcanvas-body");
      let months=[  'Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug', 'Sep','Oct','Nov','Dec'];



      let dom = months.map((item,index) =>
      {

        let thisMonth = item+','+new Date().toDateString().split(" ")[3];


       return `
      <div class="card text-center mb-3 ${thisMonth === getCurrentFullDate() && 'bg-custom'}">
          <div class="card-header">
            ${monthNameT(item)} ${numberT(new Date().toDateString().split(" ")[3])}
          </div>
          <div class="card-body ">
            <div class="d-flex justify-content-between ">
              <div>ব্যালেন্সঃ <span>${getMonthlyEarning(thisMonth)} </span>টাকা</div> 
              <div>সম্ভাব্য খরচঃ  <span>${getEstimatedCost(thisMonth)} </span>টাকা</div> 
          </div>
            <div class="d-flex justify-content-between ">
              <div>খরচ হয়েছেঃ <span>${getCostedMoney(thisMonth)} </span>টাকা</div> 

              <div>ক্যাশঃ <span>${getRbalance(thisMonth)} </span>টাকা</div> 
          </div>

          </div>
          <div class="card-footer text-body-secondary">
              <button class="btn btn-dark mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#details${index}" aria-expanded="false" aria-controls="${index}">
                Details
              </button>
            <div class="collapse" id="details${index}">
              ${getMonthlyCostListByCat(thisMonth,index)}
            </div>
          </div>
        </div>
    `
      }
);
      space.innerHTML = dom.join('');
}


function getMonthlyEarning (month){
  let earnedArray = getMoneyData().map(item => item.month === month && parseFloat(item.value));
  if(earnedArray[0]){

    return earnedArray.reduce((prev, current)=> prev + current);
  }else{
    return 0;
  }

}


function getCostedMoney(month){
  let currntMonthsItem =   getCurrentMonthItems().filter(item => item.inMonth === month);
  let costedBalanceArray = currntMonthsItem.map(item => item.consumedBudget);
  if(costedBalanceArray.length > 0){
    let costedBalance = costedBalanceArray.reduce((prev, current)=> prev + current);
    return costedBalance
  }else{
    return 0;

  }
}
function getEstimatedCost(month){
  let currntMonthsItem =   getCurrentMonthItems().filter(item => item.inMonth === month);
  let eBalanceArray = currntMonthsItem.map(item => item.budget);
  if(eBalanceArray.length > 0){
    let eBalance = eBalanceArray.reduce((prev, current)=> prev + current);
    return eBalance
  }else{
    return 0;

  }
}

function getRbalance(month){
  return getMonthlyEarning(month) - getCostedMoney(month); 
}

function getMonthlyCostListByCat(month,id){
   let totalDom = getCatData().map(catName =>
    {
      let totalConsumedBudget = 0;
     let catWiseList =  getBazarHistory().map(item => {
        if(item.cat === catName && item.inMonth === month){
          totalConsumedBudget += item.consumedBudget
        return(
        
            `<li class="list-group-item d-flex justify-content-between">
             <span>${item.name} ${item.requiredQty} ${item.unit} </span>
             <span>${item.consumedBudget} Tk</span>
            </li>
        `
        )
      
       }
      });
      return (`
      <div class="card mb-2" style="width:100%">
        <div class="card-header d-flex justify-content-between bg-dark text-white">
          <p class='mb-0 pb-0'> ${catName}</p>
          <p class='mb-0 pb-0'> ${totalConsumedBudget} Tk</p>
        </div>
        <ul class="list-group list-group-flush">
          ${catWiseList.join('')}
        </ul>
      </div>
        `)
     }
    )
    return totalDom.join('');
}

displayDetailsReports();


//REseting mont wise and year wise data 

