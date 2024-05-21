let price = 1.87;
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



const userCash = document.getElementById("cash");
const changeResult = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceVal = document.getElementById("price-val");

priceVal.textContent = `$${price}`;

const status1 = "Status: INSUFFICIENT_FUNDS";
const status2 = "Status: CLOSED";
const status3 = "Status: OPEN"



function changeCalculator(userCash){

  cid = cid.reverse();

  if(userCash<price){
    alert("Customer does not have enough money to purchase the item");
  } else if(userCash==price){
    changeResult.textContent = "No change due - customer paid with exact cash"
  }else{
    let change = userCash - price;

    let sumCid = 0;

    for(let i = 0; i< cid.length; i++ ){
      sumCid = sumCid + cid[i][1];
    }
    console.log(sumCid);

    if(sumCid < change){
      changeResult.textContent = status1;
    }

    

  }
}

purchaseBtn.addEventListener("click", () => changeCalculator(userCash.value));


// let cidBase = [
//   ["PENNY", 0.01],     //0.01
//   ["NICKEL", 0.05],    //0.05
//   ["DIME", 0.1],       //0.10
//   ["QUARTER", 0.25],   //0.25
//   ["ONE", 1],          //1
//   ["FIVE", 5],         //5
//   ["TEN", 10],         //10
//   ["TWENTY", 20],      //20
//   ["ONE HUNDRED", 100] //100
// ];



//reference https://www.youtube.com/watch?v=to6z5U8B8aY&t=85s