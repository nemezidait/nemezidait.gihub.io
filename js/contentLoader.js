async function loadHtmlDocument(path){
    try{
        return await fetch(path).then(response => response.ok ? response.text() : '');
    }
    catch(error){
        console.log(error);
        return '';
    }
}

document.body.onload = function() {
    loadHtmlDocument("/template/headerTop.html").then(text => document.getElementById('header-top').innerHTML = text);
    loadHtmlDocument("/template/nav.html").then(text => document.getElementById('nav').innerHTML = text);
};
