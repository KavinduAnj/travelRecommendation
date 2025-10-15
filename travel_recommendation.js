function searchRecommendations() {
    const keyword = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; 

    if (keyword === '') {
        return;
    }

    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let results = [];

            if (keyword.includes('beach')) {
                results = data.beaches;
            } 
            else if (keyword.includes('temple')) {
                results = data.temples;
            } 
            else {
                const country = data.countries.find(c => c.name.toLowerCase().includes(keyword));
                if (country) {
                    results = country.cities;
                }
            }
            
            displayResults(results);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            resultsContainer.innerHTML = '<p style="color:white;">Could not fetch recommendations.</p>';
        });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(item => {
            const resultCard = `
                <div class="result-card">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button class="visit-button">Visit</button>
                </div>
            `;
            resultsContainer.innerHTML += resultCard;
        });
    } else {
        resultsContainer.innerHTML = '<p style="color:white;">No recommendations found.</p>';
    }
}

function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results-container').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnSearch').addEventListener('click', searchRecommendations);
    document.getElementById('btnClear').addEventListener('click', clearResults);
});