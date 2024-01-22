document.getElementById('countryForm').addEventListener('submit', function(cname) {
    cname.preventDefault();
    const countryName = document.getElementById('countryName').value.trim();
    if (countryName) {
        fetchCountryInfo(countryName);
    } else {
        alert("Please enter a country name");
    }
});

function fetchCountryInfo(countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Country not found: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayCountryInfo(data[0]))
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
}

function displayCountryInfo(country) {
    const { flags, coatOfArms, currencies, capital, languages } = country;
    const countryInfoDiv = document.getElementById('countryInfo');
    countryInfoDiv.innerHTML = `
        <img src="${flags.png}" alt="Flag" class="flag">
        ${coatOfArms.png ? `<img src="${coatOfArms.png}" alt="Coat of Arms" class="coatOfArms">` : ''}
        <div class="currency"><strong>Currency:</strong> ${joinValues(currencies, 'name')}</div>
        <div class="capital"><strong>Capital:</strong> ${capital.join(', ')}</div>
        <div class="languages"><strong>Languages:</strong> ${joinValues(languages)}</div>
    `;
}

function joinValues(obj, prop = null) {
    return Object.values(obj).map(value => prop ? value[prop] : value).join(', ');
}
