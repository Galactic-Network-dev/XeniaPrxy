document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var query = document.getElementById('search-input').value.trim();
    if (isValidURL(query)) {
        // If the input is a valid URL, redirect the user to that URL
        window.location.href = query;
    } else if (query !== '') {
        // If the input is not a valid URL, perform a search using the custom search engine
        search(query);
    }
});

function isValidURL(url) {
    // Regular expression to check if the input string is a valid URL
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
}

function search(query) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://cse.google.com/cse?cx=50321224bee844598#gsc.tab=0' + encodeURIComponent(query), true);
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
