var appConstants = {
    editableImageClass: 'editable-list-element',
    movieImageClass: 'movie-list-element',
    editAnchorClass: 'edit-anchor'
}

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

function setEvents() {
    setOnEditMoviesEvent()
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
    if(listSection && listSection.length > 0){
        var mainElement = document.getElementsByTagName("main");

        for(var i=0; i<listSection.length; i++) {
            mainElement[0].insertAdjacentHTML('beforeend',
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
            renderSections(response);
            setEvents();
        }
    };
    xhttp.open("GET", "http://www.mocky.io/v2/5cf8321a30000059a0a38158");
    xhttp.send();
}

doRequest();
