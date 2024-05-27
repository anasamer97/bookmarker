var bookmarkName = document.getElementById('bookmarkName');
var websiteURL = document.getElementById('websiteURL');
var bookmarkArray = [];


// Check if Local storage exists to prevent JS errors when another user is using the same project
if (localStorage.getItem("BookmarksList") !== null) {
    bookmarkArray = JSON.parse(localStorage.getItem("BookmarksList"));
    displayBookmarks()

}

else {
    bookmarkArray = [];
    console.log('local storage does not exist')
}




function addBookmark() {

    if (isValidBookmarkName() == true && isValidURL() == true) {
        var bookmark = {
            bookmarkName: bookmarkName.value,
            websiteURL: websiteURL.value
        }
        bookmarkArray.push(bookmark);
        localStorage.setItem('BookmarksList', JSON.stringify(bookmarkArray));
        displayBookmarks();
        clearFields();
    }


    else {
        window.alert("Wrong input details!")
    }

}

function displayBookmarks() {
    var bookmarks = '';
    for (var i = 0; i < bookmarkArray.length; i++) {
        bookmarks += `
        <tr>
        <td>${i + 1}</td>
        <td>${bookmarkArray[i].bookmarkName}</td>
        <td><button" class="btn btn-success"><a class="link-light p-2 link-underline link-underline-opacity-0" target="_blank" href="http://${bookmarkArray[i].websiteURL}"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
        </button></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-secondary p-2 "><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('bookmarksData').innerHTML = bookmarks;
}


function deleteBookmark(indexItem) {
    bookmarkArray.splice(indexItem, 1);
    localStorage.setItem('BookmarksList', JSON.stringify(bookmarkArray));
    displayBookmarks();
}


function clearFields() {
    websiteURL.value = null;
    bookmarkName.value = null;
}


function isValidBookmarkName() {
    var testString = bookmarkName.value;
    var regex = /^\w{3,10}$/
    if (regex.test(testString) == true) {
        bookmarkName.classList.add('is-valid')
        bookmarkName.classList.remove('is-invalid')
        return true;
    } else {
        bookmarkName.classList.add('is-invalid')
        bookmarkName.classList.remove('is-valid')
        return false;
    }
}


function isValidURL() {
    var testString = websiteURL.value;
    var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    if (regex.test(testString) == true) {
        websiteURL.classList.add('is-valid')
        websiteURL.classList.remove('is-invalid')
        return true;
    } else {
        websiteURL.classList.add('is-invalid')
        websiteURL.classList.remove('is-valid')
        return false;
    }
}

