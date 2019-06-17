var appConstants = {
    editableImageClass: 'editable-list-element',
    movieImageClass: 'movie-list-element',
    editAnchorClass: 'edit-anchor',
    searchElementID: 'search',
    moviesSection: 'movies-section'
}

var dataResponse = [];

function toggleImageListEditView(imageElement) {
    if (imageElement.classList.contains(appConstants.editableImageClass)) {
        imageElement.classList.remove(appConstants.editableImageClass)
    } else {
        imageElement.classList.add(appConstants.editableImageClass)
    }
}

function onAnchorClick(event) {
    var sectionList = event.target.parentElement.nextElementSibling;
    var imageListElements = sectionList.getElementsByClassName(
        appConstants.movieImageClass
    );
    for (var i = 0; i < imageListElements.length; i++) {
        toggleImageListEditView(imageListElements[i]);
    }
}

function setOnEditMoviesEvent() {
    var anchorElements = document.getElementsByClassName(appConstants.editAnchorClass);
    for (var i = 0; i < anchorElements.length; i++) {
        anchorElements[i].addEventListener('click', onAnchorClick);
    }
}

function filterMovies(movie) {
    var inputSearchElement = document.getElementById(appConstants.searchElementID);
    var inputSearchValue = inputSearchElement.value;
    return movie.name.toUpperCase().includes(inputSearchValue.toUpperCase())
}

function filterSection(section) {
    section.movies = section.movies.filter(filterMovies);
    return section.movies.length
}

function onFilterMovies() {
    var dataResponseFilter = JSON.parse(JSON.stringify(dataResponse));
    dataResponseFilter = dataResponseFilter.filter(filterSection);
    renderSections(dataResponseFilter);
}

function setOnFilterMovies(){
    var searchElement = document.getElementById(appConstants.searchElementID);
    searchElement.addEventListener('keyup', onFilterMovies);
}

function setEvents() {
    setOnEditMoviesEvent();
    setOnFilterMovies();
}

function deleteElementFromDOM(event) {
    event.target.parentElement.remove();
}

function processRequest(response) {
    try {
        return JSON.parse(response);
    } catch (e) {
        return null
    }
}
function renderMovies (listMovies) {
    if(listMovies && listMovies.length > 0){
        var movies = '';
        for(var i=0; i < listMovies.length; i++) {
            movies += "<li class=\"movie-list-element\">" +
                    "<img class=\"delete-icon\" onclick=\"deleteElementFromDOM(event)\" src=\"assets/close-icon.svg\" alt=\"Close icon\">" +
                    "<img class=\"movie-img\" src="+listMovies[i].imgPath+" alt="+listMovies[i].imgAlt+">" +
                    "</li>"
        }
        return movies;
    }
}

function renderSections (listSection) {
    var sectionMovies = document.getElementById(appConstants.moviesSection);
    sectionMovies.innerText = '';
    if(listSection && listSection.length > 0){

        for(var i=0; i<listSection.length; i++) {
            sectionMovies.insertAdjacentHTML('beforeend',
                "<section class=\"categories-banner\">" +
                "<h1>"+listSection[i].sectionName+" <a class=\"edit-anchor\" href=\"#\">Edit</a></h1>" +
                "<ul>"+renderMovies(listSection[i].movies)+"</ul>" +
                "</section>" +
                "");
        }
    }
}
function doRequest() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = processRequest(this.responseText);
            dataResponse = response;
            renderSections(dataResponse);
            setEvents();
        }
    };
    xhttp.open("GET", "https://baratododiacrawler.herokuapp.com");
    xhttp.send();
}

doRequest();
