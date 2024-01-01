const dropList = document.querySelectorAll('.drop-list select'),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select"),
    getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for (currency_code in country_code) {
        // selecting default values
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1) {
            selected = currency_code == "LKR" ? "selected" : "";
        }




        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        //inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    //changing flags
    dropList[i].addEventListener("change", e=>{
        loadFlag(e.target);
    })

}
function loadFlag(element){
    for(let base_code in country_code){
        if(base_code == element.value){// if currency code of country lis is equel to option value
            let imgTag = element.parentElement.querySelector("img");
            //passing the country code of a selected currency code in a imh url
            imgTag.src=`https://flagcdn.com/48x36/${country_code[base_code].toLowerCase()}.png`
        }
    }
}
window.addEventListener("load", () => {
    getExchangeRate();
})
getButton.addEventListener("click", e => {
    e.preventDefault();//preventing form from submiting
    getExchangeRate();
});

// changing  exchange icon
const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click",()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})




function getExchangeRate() {
    const amount = document.querySelector('.amount input');
    let exchangeRateTxt = document.querySelector('.exchange-rate');
    const amountVal = amount.value;
    if (amountVal == '' || amountVal == "0") {
        amount.value = '1';
    }
    exchangeRateTxt.innerHTML = "Getting exchange rate..."
    let url = ` https://v6.exchangerate-api.com/v6/f8b2961d96a8154b3946d667/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {

        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);

        exchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`

    }).catch(()=>{
        exchangeRateTxt.innerHTML="Something went wrong..."
    });
}