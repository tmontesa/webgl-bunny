// Credit:
// Taken from class files, initShader2.js.

function loadFileAJAX(filename) {
    var xhr = new XMLHttpRequest();
    var status = document.location.protocol === "file:" 
        ? 0 : 200;

    xhr.open('GET', filename, false);
    xhr.send(null);

    return xhr.status == status 
        ? xhr.responseText : null;
};