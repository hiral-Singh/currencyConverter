const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

const dropdowns = document.querySelectorAll(".dropdown select");
for (let select of dropdowns) {
    for (let country in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = country;
        newOption.value = country;
        if (select.name=="from" && country=="USD") {
            newOption.selected=true;
        }else if(select.name=="to" && country=="INR") {
            newOption.selected=true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
updateFlag(event.target);
    })
}

const updateFlag = (element)=>{
let currency=element.value;
let countryCode=countryList[currency];
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
} ;

btn.addEventListener("click", async (evnt)=>{
    evnt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal=="" || amtVal<1){
        amtVal=1;
        amount.value=1;
    }
    let value = await getCountryValue(toCurr.value);
    let finalAmt=value*amtVal;
    console.log(`Value for ${toCurr.value}:`, finalAmt);
    let msg = document.querySelector(".msg");
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
});

const fetchCurrencyData = async () => {
    try {
        const fromCurrency = fromCurr.value;
        const URL = `https://api.currencyapi.com/v3/latest?apikey=fca_live_sfKNDrlCjomjdQNecAPW0Z56p8lI58hifOqtgh2t&base_currency=${fromCurrency}`;
        let response = await fetch(URL);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const getCountryValue = async (toCurr) => {
    const data = await fetchCurrencyData();
    if (data && data.data && data.data[toCurr]) {
        return data.data[toCurr].value;
    } 
    }
