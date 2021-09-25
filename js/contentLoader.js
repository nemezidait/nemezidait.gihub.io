function loadMainPageData(){
    $("#header-top").load("/template/headerTop.html");
    $("#nav").load("/template/nav.html");
}

$(document).ready(function () {
    loadMainPageData();
});
