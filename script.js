const eurKztInput = document.getElementById('eur-kzt');
const rubKztInput = document.getElementById('rub-kzt');
const lirKztInput = document.getElementById('lir-kzt');

const currencyListTableEur = document.getElementById('currency-list-table-eur');
const currencyListTableLir = document.getElementById('currency-list-table-lir');

const priceInput = document.getElementById('price');
const currencyInput = document.getElementById('currency');
const quantityInput = document.getElementById('quantity');

const eurPriceResultElem = document.getElementById('eur-price-result');
const eurQuantityResultElem = document.getElementById('eur-quantity-result');
const eurTotalResultElem = document.getElementById('eur-total-result');

const lirPriceResultElem = document.getElementById('lir-price-result');
const lirQuantityResultElem = document.getElementById('lir-quantity-result');
const lirTotalResultElem = document.getElementById('lir-total-result');

const rubPriceResultElem = document.getElementById('rub-price-result');
const rubQuantityResultElem = document.getElementById('rub-quantity-result');
const rubTotalResultElem = document.getElementById('rub-total-result');

const kztPriceResultElem = document.getElementById('kzt-price-result');
const kztQuantityResultElem = document.getElementById('kzt-quantity-result');
const kztTotalResultElem = document.getElementById('kzt-total-result');

const numberFormatter = new Intl.NumberFormat('ru-RU');

const eurIcon = '&#8364;';
const lirIcon = '&#8378;';
const rubIcon = '&#8381;';
const kztIcon = '&#8376;';

function updateCurrencyListTables()
{
    const eurKzt = parseFloat(eurKztInput.value);
    const rubKzt = parseFloat(rubKztInput.value);
    const lirKzt = parseFloat(lirKztInput.value);

    const eurLir = eurKzt / lirKzt;
    const rubEur = eurKzt / rubKzt;

    const tbodyLir = currencyListTableLir.querySelector('tbody');
    tbodyLir.innerHTML = '';

    const liras = [10,100,500,1000,2000,3000,4000,5000,10000];

    liras.forEach(lira => {
        const euro = (lira / eurLir).toFixed(1);
        const ruble = (lira * lirKzt / rubKzt).toFixed(1);
        const tenge = (lira * lirKzt).toFixed(1);

        const tr = document.createElement('tr');

        const thLir = document.createElement('th');
        thLir.innerHTML = `${numberFormatter.format(lira)} ${lirIcon}`;

        const tdEur = document.createElement('td');
        tdEur.innerHTML = `${numberFormatter.format(euro)} ${eurIcon}`;

        const tdRub = document.createElement('td');
        tdRub.innerHTML = `${numberFormatter.format(ruble)} ${rubIcon}`;

        const tdKzt = document.createElement('td');
        tdKzt.innerHTML = `${numberFormatter.format(tenge)} ${kztIcon}`;

        tr.appendChild(thLir);
        tr.appendChild(tdEur);
        tr.appendChild(tdRub);
        tr.appendChild(tdKzt);

        tbodyLir.appendChild(tr);
    });

    const tbodyEur = currencyListTableEur.querySelector('tbody');
    tbodyEur.innerHTML = '';

    const euros = [1,5,10,20,30,40,50,100,200];

    euros.forEach(euro => {
        const lira = (euro * eurLir).toFixed(1);
        const ruble = (euro * rubEur).toFixed(1);
        const tenge = (euro * eurKzt).toFixed(1);

        const tr = document.createElement('tr');

        const thEur = document.createElement('th');
        thEur.innerHTML = `${numberFormatter.format(euro)} ${eurIcon}`;

        const tdLir = document.createElement('td');
        tdLir.innerHTML = `${numberFormatter.format(lira)} ${lirIcon}`;

        const tdRub = document.createElement('td');
        tdRub.innerHTML = `${numberFormatter.format(ruble)} ${rubIcon}`;

        const tdKzt = document.createElement('td');
        tdKzt.innerHTML = `${numberFormatter.format(tenge)} ${kztIcon}`;

        tr.appendChild(thEur);
        tr.appendChild(tdLir);
        tr.appendChild(tdRub);
        tr.appendChild(tdKzt);

        tbodyEur.appendChild(tr);
    });
}

function calculateResult()
{
    const price = parseFloat(priceInput.value);
    const currency = currencyInput.value;
    const quantity = parseFloat(quantityInput.value);

    const eurKzt = parseFloat(eurKztInput.value);
    const rubKzt = parseFloat(rubKztInput.value);
    const lirKzt = parseFloat(lirKztInput.value);

    const eurLir = eurKzt / lirKzt;
    const rubEur = eurKzt / rubKzt;

    let eurPrice = 0;
    let lirPrice = 0;
    let rubPrice = 0;
    let kztPrice = 0;

    if(currency === 'eur') {
        eurPrice = price;
        lirPrice = price * eurLir;
        rubPrice = price * rubEur;
        kztPrice = price * eurKzt;
    } else if(currency === 'lir') {
        eurPrice = price / eurLir;
        lirPrice = price;
        rubPrice = price / eurLir * rubEur;
        kztPrice = price * lirKzt;
    }

    let eurPriceStr = eurPrice.toFixed(1);
    let eurTotalStr = (eurPrice * quantity).toFixed(1);

    let lirPriceStr = lirPrice.toFixed(1);
    let lirTotalStr = (lirPrice * quantity).toFixed(1);

    let rubPriceStr = rubPrice.toFixed(1);
    let rubTotalStr = (rubPrice * quantity).toFixed(1);

    let kztPriceStr = kztPrice.toFixed(1);
    let kztTotalStr = (kztPrice * quantity).toFixed(1);

    eurPriceResultElem.innerHTML = `${numberFormatter.format(eurPriceStr)} ${eurIcon}`;
    eurQuantityResultElem.innerHTML = quantity;
    eurTotalResultElem.innerHTML = `${numberFormatter.format(eurTotalStr)} ${eurIcon}`;

    lirPriceResultElem.innerHTML = `${numberFormatter.format(lirPriceStr)} ${lirIcon}`;
    lirQuantityResultElem.innerHTML = quantity;
    lirTotalResultElem.innerHTML = `${numberFormatter.format(lirTotalStr)} ${lirIcon}`;

    rubPriceResultElem.innerHTML = `${numberFormatter.format(rubPriceStr)} ${rubIcon}`;
    rubQuantityResultElem.innerHTML = quantity;
    rubTotalResultElem.innerHTML = `${numberFormatter.format(rubTotalStr)} ${rubIcon}`;

    kztPriceResultElem.innerHTML = `${numberFormatter.format(kztPriceStr)} ${kztIcon}`;
    kztQuantityResultElem.innerHTML = quantity;
    kztTotalResultElem.innerHTML = `${numberFormatter.format(kztTotalStr)} ${kztIcon}`;

    updateCurrencyListTables();
}

priceInput.addEventListener('change', calculateResult);
priceInput.addEventListener('change', calculateResult);
priceInput.addEventListener('change', calculateResult);

currencyInput.addEventListener('change', calculateResult);
currencyInput.addEventListener('change', calculateResult);
currencyInput.addEventListener('change', calculateResult);

quantityInput.addEventListener('change', calculateResult);
quantityInput.addEventListener('change', calculateResult);
quantityInput.addEventListener('change', calculateResult);

eurKztInput.addEventListener('change', calculateResult);
rubKztInput.addEventListener('change', calculateResult);
lirKztInput.addEventListener('change', calculateResult);

calculateResult();