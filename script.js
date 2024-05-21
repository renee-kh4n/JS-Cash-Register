let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const userCash = document.getElementById("cash");
const changeResult = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceVal = document.getElementById("price-val");

priceVal.textContent = `$${price}`;


function changeCalculator(userCash){

  if(userCash<price){
    alert("Customer does not have enough money to purchase the item");
  } else if(userCash==price){
    changeResult.textContent = "No change due - customer paid with exact cash"
  }
}

purchaseBtn.addEventListener("click", () => changeCalculator(userCash.value));