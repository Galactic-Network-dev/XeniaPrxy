document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var query = document.getElementById('search-input').value.trim();
    if (query !== '') {
        search(query);
    }
});

function search(query) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.google.com/search?q=' + encodeURIComponent(query), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                displayResults(xhr.responseText);
            } else {
                displayError('Failed to retrieve search results');
            }
        }
    };
    xhr.send();
}

function displayResults(results) {
    var resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = results;
}

function displayError(error) {
    var resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '<p>' + error + '</p>';
}
