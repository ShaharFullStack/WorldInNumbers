"use strict";
const searchButton = document.getElementById('searchButton');
if (searchButton) {
    searchButton.addEventListener('click', searchCountries);
}
const allButton = document.getElementById('allButton');
if (allButton) {
    allButton.addEventListener('click', fetchAllCountries);
}
const clearScreenBtn = document.getElementById('clearScreenBtn');
if (clearScreen) {
    clearScreenBtn === null || clearScreenBtn === void 0 ? void 0 : clearScreenBtn.addEventListener('click', clearScreen);
}
function searchCountries() {
    const countryInput = document.getElementById('countryInput');
    const countryName = countryInput.value.trim();
    if (countryName) {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => response.json())
            .then(data => showStats(data))
            .catch(error => console.error('ERROR! No data loaded:', error));
    }
}
function fetchAllCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => showStats(data))
        .catch(error => console.error('ERROR! No data loaded:', error));
}
function clearScreen() {
    const statsDiv = document.getElementById('statistics');
    if (statsDiv)
        statsDiv.innerHTML = " ";
}
function showStats(data) {
    const statsDiv = document.getElementById('statistics');
    if (statsDiv) {
        statsDiv.innerHTML = '';
        const numberOfCountries = data.length;
        const totalPopulation = data.reduce((sum, country) => sum + country.population, 0);
        const averagePopulation = totalPopulation / numberOfCountries;
        let statsTable = `
            <table border="1">
                <tr>
                    <th>Statistic</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Number of Countries</td>
                    <td>${numberOfCountries}</td>
                </tr>
                <tr>
                    <td>Total Population</td>
                    <td>${totalPopulation}</td>
                </tr>
                <tr>
                    <td>Average Population</td>
                    <td>${averagePopulation}</td>
                </tr>
            </table>
            <br/>
        `;
        let countryTable = `
            <table border="1">
                <tr>
                    <th>Flag</th>
                    <th>Name</th>
                    <th>Capital</th>
                    <th>Population</th>
                    <th>Currency & Symbol</th>
                </tr>
        `;
        data.forEach(country => {
            let currencies = "Symbol not found";
            if (country.currencies) {
                const currencyNames = [];
                for (let i in country.currencies) {
                    const currency = country.currencies[i];
                    currencyNames.push(`${currency.name} (${currency.symbol})`);
                }
                currencies = currencyNames.join(", ");
            }
            countryTable += `
                <tr>
                    <td><img src="${country.flags.png}" alt="${country.name.common}"></td>
                    <td>${country.name.common}</td>
                    <td>${country.capital}</td>
                    <td>${country.population}</td>
                    <td>${currencies}</td>
                </tr>
            `;
        });
        countryTable += '</table><br/>';
        const regions = [];
        const regionNames = [];
        data.forEach(country => {
            const region = country.region;
            let index = regionNames.indexOf(region);
            if (index === -1) {
                regionNames.push(region);
                regions.push(1);
            }
            else {
                regions[index]++;
            }
        });
        let regionTable = `
            <table border="1">
                <tr>
                    <th>Region</th>
                    <th>Number of Countries</th>
                </tr>
        `;
        for (let i = 0; i < regionNames.length; i++) {
            regionTable += `
                <tr>
                    <td>${regionNames[i]}</td>
                    <td>${regions[i]}</td>
                </tr>
            `;
        }
        regionTable += '</table>';
        statsDiv.innerHTML = statsTable + countryTable + regionTable;
    }
}
//# sourceMappingURL=main.js.map