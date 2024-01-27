const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);

        select.addEventListener("change", (e) => {
            updateFlag(e.target);
        });
    }
}

const updateExchange = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval == "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    //console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let res = amtval * rate;

    msg.innerText = `${amtval} ${fromCurr.value} = ${res} ${toCurr.value}`;
};

const updateFlag = (ele) => {
    let currCode = ele.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    updateExchange();
});

window.addEventListener("load", () => {
    updateExchange();
});