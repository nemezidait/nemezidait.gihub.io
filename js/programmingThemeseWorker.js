function getThemesSettings() {
    let request = new XMLHttpRequest();
    request.open("GET", "themesSettings.json", false);
    request.send(null);
    return JSON.parse(request.responseText);
}

function getTheme(themeObj) {
  let result = '<div class="probootstrap-service-2 probootstrap-animate"><div class="image"><div class="image-bg"><img src="' + themeObj.logo +'"></div></div>';
  result += '<div class="text"><span class="probootstrap-meta"><i class="icon-calendar2"></i> запущен в 2021 году</span>';
  result += '<h3>' + themeObj.name + '</h3><p>' + themeObj.description+ '</p>';
  result += '<p><a href="' + themeObj.path + '" class="btn btn-primary">Начать</a> <span class="enrolled-count">Всего один клик до мечты!</span></p></div>';
  return result + '</div>';
}

function getThemeBlock(themeObj1, themeObj2 = null) {
  let result = '<div class="row"><div class="col-md-6">' + getTheme(themeObj1);
  if (themeObj2){
     result += getTheme(themeObj2);
  }
  return result + '</div></div>';
}

function insertThemes(themes) {
  let length = themes.length;
  if (themes.length % 2 != 0) {
    length--;  
  }
  let html = '';
  for(let i = 0; i < length; i += 2){
    html += getThemeBlock(themes[i], themes[i + 1]);
  }
  
  if (length != themes.length) {
    html += getThemeBlock(themes[length]);
  }
    
  document.getElementById("themesBody").innerHTML = html;
}

function loadThemes(){
    const settings = getThemesSettings();
    insertThemes(settings.themes);
}
