let price = 3.26;
price = 19.20;
let cid = [
  ["PENNY", 1.01],     //0.01
  ["NICKEL", 2.05],    //0.05
  ["DIME", 3.1],       //0.10
  ["QUARTER", 4.25],   //0.25
  ["ONE", 90],         //1
  ["FIVE", 55],        //5
  ["TEN", 20],         //10
  ["TWENTY", 60],      //20
  ["ONE HUNDRED", 100] //100
];

let cidBase = [
  ["PENNY", 0.01],     //0.01
  ["NICKEL", 0.05],    //0.05
  ["DIME", 0.1],       //0.10
  ["QUARTER", 0.25],   //0.25
  ["ONE", 1],          //1
  ["FIVE", 5],         //5
  ["TEN", 10],         //10
  ["TWENTY", 20],      //20
  ["ONE HUNDRED", 100] //100
];


// // cid tests:
cid = [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];



const userCash = document.getElementById("cash");
const changeResult = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceVal = document.getElementById("price-val");

priceVal.textContent = `$${price}`;

const status1 = "Status: INSUFFICIENT_FUNDS";
const status2 = "Status: CLOSED";
const status3 = "Status: OPEN"



function changeCalculator(userCash){
  const changeArr = [];
  cid = cid.reverse();
  cidBase = cidBase.reverse();

  if(userCash<price){
    alert("Customer does not have enough money to purchase the item");
  } else if(userCash==price){
    changeResult.textContent = "No change due - customer paid with exact cash"
  }else{
    let change = userCash - price;
    console.log(change);

    let sumCid = 0;

    for(let i = 0; i< cid.length; i++ ){
      if ( (change - (change%cidBase[i][1])) > cid[i][1]){
        changeArr[i] = cid[i][1];
      } else{
        changeArr[i] = change - (change%cidBase[i][1]);
      }

      change = parseFloat(change - changeArr[i]).toFixed(2);
      cid[i][1] = parseFloat(cid[i][1] - changeArr[i]).toFixed(2);

      console.log(change);
      console.log(changeArr);
      console.log(changeArr.reduce((partialSum, a) => partialSum + a, 0));

    }

    let message;

    if (change > 0){
      console.log("insufficient");
      message = status1;
    }else{
      if((changeArr.reduce((partialSum, a) => partialSum + a, 0)) > 0){
        
      console.log("OPEN");
        message = status3;
      }else{
        
      console.log("CLOSED");
        message = status2;
  
      }

      for(let i = 0; i< changeArr.length; i++ ){
        if(changeArr[i] > 0){ 
          message = message + " " + `${cid[i][0]}: $${changeArr[i]}`;
        }
      }

    }
    
    
    console.log(message);
    changeResult.textContent = message;

  }
}

purchaseBtn.addEventListener("click", () => changeCalculator(userCash.value));

