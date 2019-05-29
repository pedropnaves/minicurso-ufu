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

function main() {
    setEvents();
}

function deleteElementFromDOM(event) {
    event.target.parentElement.remove();
}

main();
