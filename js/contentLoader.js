async function loadHtmlDocument(path){
    try{
        return await fetch(path).then(response => response.ok ? response.text() : '');
    }
    catch(error){
        console.log(error);
        return '';
    }
}

$(document).ready(() => {
    loadHtmlDocument("/template/headerTop.html").then(text => document.getElementById('header-top').innerHTML = text);
    loadHtmlDocument("/template/nav.html").then(text => document.getElementById('nav').innerHTML = text)
        .then(() => $('#navbar-collapse').on('hide.bs.collapse', function () {
                                          $('#navbar-collapse').collapse('hide');
                                        }));
});
