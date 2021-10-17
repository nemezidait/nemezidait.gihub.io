function getDidciplinesSettings() {
    let request = new XMLHttpRequest();
    request.open("GET", "disciplinesSettings.json", false);
    request.send(null);
    return JSON.parse(request.responseText);
}

function getDidcipline(courseObj) {
  let result = '<div class="probootstrap-service-2 probootstrap-animate"><div class="image"><div class="image-bg"><img src="' + courseObj.logo +'"></div></div>';
  result += '<div class="text"><span class="probootstrap-meta"><i class="icon-calendar2"></i> запущен в 2021 году</span>';
  result += '<h3>' + courseObj.name + '</h3><p>' + courseObj.description+ '</p>';
  result += '<p><a href="' + courseObj.path + '" class="btn btn-primary">Начать</a> <span class="enrolled-count">Всего один клик до мечты!</span></p></div>';
  return result + '</div>';
}

function getDidciplineBlock(courseObj1, courseObj2 = null) {
  let result = '<div class="col-md-6">' + getDidcipline(courseObj1);
  if (courseObj2){
     result += getDidcipline(courseObj2);
  }
  return result + '</div>';
}

function insertDidciplines(courses) {
  let length = courses.length;
  if (courses.length % 2 != 0) {
    length--;  
  }
  let html = '';
  for(let i = 0; i < length; i += 2){
    html += getDidciplineBlock(courses[i], courses[i + 1]);
  }
  
  if (length != courses.length) {
    html += getDidciplineBlock(courses[length]);
  }
    
  document.getElementById("disciplinesBody").innerHTML = html;
}

function loadDidciplines(){
    const settings = getDidciplinesSettings();
    insertDidciplines(settings.disciplines);
}
