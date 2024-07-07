let price = 3.26;
let cid = [
  ['PENNY', 1.01],     //0.01
  ['NICKEL', 2.05],    //0.05
  ['DIME', 3.1],       //0.10
  ['QUARTER', 4.25],   //0.25
  ['ONE', 90],         //1
  ['FIVE', 55],        //5
  ['TEN', 20],         //10
  ['TWENTY', 60],      //20
  ['ONE HUNDRED', 100] //100
];

let cidBase = [
  ['PENNY', 0.01],     //0.01
  ['NICKEL', 0.05],    //0.05
  ['DIME', 0.1],       //0.10
  ['QUARTER', 0.25],   //0.25
  ['ONE', 1],          //1
  ['FIVE', 5],         //5
  ['TEN', 10],         //10
  ['TWENTY', 20],      //20
  ['ONE HUNDRED', 100] //100
];


// // cid tests:
// price = 19.50;
// cid = [['PENNY', 0.01], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]];

// cid = [['PENNY', 0.5], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]];



const userCash = document.getElementById('cash');
const changeResult = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const priceVal = document.getElementById('price-val');

priceVal.textContent = `$${price}`;

const status1 = 'Status: INSUFFICIENT_FUNDS';
const status2 = 'Status: CLOSED';
const status3 = 'Status: OPEN'

const cashRegContent = document.getElementById('funds-remaining');


function initCashRegContent(){

  for(let i = 0; i<cidBase.length; i++){
    const div = document.createElement('div');
    div.classList.add('denom-info');
    div.textContent = `${cidBase[i][0]} ($${cidBase[i][1]}) :`;
    cashRegContent.appendChild(div);

    pieces = Math.ceil(cid[i][1]/cidBase[i][1]);
    const subdiv = document.createElement('div');
    subdiv.classList.add('denom-info');
    subdiv.textContent = `${pieces} pieces (total ammount: $${cid[i][1].toFixed(2)})`;
    cashRegContent.appendChild(subdiv);
  }
}

function changeCalculator(userCash){
  const denomInfo = document.getElementsByClassName('denom-info');
  
  const denomInfoArr = Array.from(denomInfo);

  denomInfoArr.forEach( element => {
    cashRegContent.removeChild(element);
  });
  

  const changeArr = [];

  
  
  // let cidBackUp = [...cid]; changes in either array will affect the other
  const cidBackUp = JSON.parse(JSON.stringify(cid));
  cid = cid.reverse();
  cidBase = cidBase.reverse();

  if(userCash<price){
    alert('Customer does not have enough money to purchase the item');
  } else if(userCash==price){
    changeResult.textContent = 'No change due - customer paid with exact cash'
  }else{
    let change = userCash - price;
    console.log(change);


    for(let i = 0; i< cid.length; i++ ){

      console.log(`change: ${change}; cidBase[i][1]: ${cidBase[i][1]}`)
      console.log(`change: ${change}; cid[i][1]: ${cid[i][1]}`)
      if ( (change - (change % cidBase[i][1])) > cid[i][1]){
        
        changeArr[i] = parseFloat((cid[i][1]).toFixed(2));
      } else{
        
        changeArr[i] = parseFloat((Math.floor(change / cidBase[i][1])*cidBase[i][1]).toFixed(2));
      }

      change = parseFloat((change - changeArr[i]).toFixed(2));
      // change = change - changeArr[i];
      cid[i][1] = cid[i][1] - changeArr[i];

      console.log(change);
      console.log(changeArr);
      console.log(changeArr.reduce((partialSum, a) => partialSum + a, 0));

    }

    let message;
    console.log(cid);

    //ensure PENNY is the first to be displayed
    if(cid[0][0] !== 'PENNY')
    {  cid = cid.reverse();
       cidBase = cidBase.reverse();}

    if (change > 0){
      console.log('insufficient');
      message = status1;
      cid = JSON.parse(JSON.stringify(cidBackUp));
      initCashRegContent();
    }else{
      if((cid.reduce((partialSum, a) => partialSum + a[1], 0)) > 0){
        
      console.log('OPEN');
        message = status3;
        initCashRegContent();
      }else{
        
      console.log('CLOSED');
        message = status2;
        initCashRegContent();
  
      }

      for(let i = 0; i< changeArr.length; i++ ){
        if(changeArr[i] > 0){ 
          message = message + ' ' + `${cid[i][0]}: $${changeArr[i]}`;
        }
      }

    }
    
    console.log(message);
    changeResult.textContent = message;

  }
}

initCashRegContent();
purchaseBtn.addEventListener('click', () => changeCalculator(userCash.value));

