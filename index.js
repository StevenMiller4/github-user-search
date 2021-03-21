// Although apikey is not needed for this excerise, it may be handy for future use of this app

const apikey = "d686df8b2476622eceda7b89255d2a6229d28175";

// Endpoint url provided by API documentation

const searchURL = "https://api.github.com/users/";

// Functions to push list items to results-list ul and update DOM with user repos

function templateUserGenerator(response) {
    let userRepos = [];
    for (let i = 0; i < response.length; i++) {
        userRepos.push(
            `<li><a href="${response[i].html_url}">${response[i].name}</a></li>`
        )
    }
    return userRepos.join('');
}

function displayResults(response) {
    const userGeneratorString = templateUserGenerator(response);
    $('#results-list').html(userGeneratorString);
    $('#results').removeClass('hidden');
}

// Function that combines searchURL with form input to make accessable for GET request, calls GET request

function getUser(userSearch) {
    const url = searchURL + userSearch + '/repos';
    console.log(url);
    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

// Function that listens for user submit, and calls getUser Function 

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const userSearch = $('#js-search-term').val();
        getUser(userSearch);
    });
}

$(watchForm);