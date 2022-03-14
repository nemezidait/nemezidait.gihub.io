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
    loadHtmlDocument("/template/nav.html").then(text => document.getElementById('nav').innerHTML = text)
        .then(_ => {
			if ((window.innerWidth > 800) && (window.innerHeight > 600)) {
				$('.probootstrap-navbar .navbar-nav li.dropdown').hover(function () {
					$(this).find('> .dropdown-menu').stop(true, true).delay(200).fadeIn(500).addClass('animated-fast fadeInUp');
				}, function () {
					$(this).find('> .dropdown-menu').stop(true, true).fadeOut(200).removeClass('animated-fast fadeInUp')
				});
			}
        });
};
