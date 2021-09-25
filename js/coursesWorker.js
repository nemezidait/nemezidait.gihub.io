function getCoursesSettings() {
    let request = new XMLHttpRequest();
    request.open("GET", "/courses/coursesSettings.json", false);
    request.send(null);
    return JSON.parse(request.responseText);
}

function getCourse(courseObj) {
  let result = '<div class="probootstrap-service-2 probootstrap-animate fadeInUp probootstrap-animated"><div class="image"><div class="image-bg"><img src="' + courseObj.logo +'"></div></div>';
  result += '<div class="text"><span class="probootstrap-meta"><i class="icon-calendar2"></i> запущен в 2021 году</span>';
  result += '<h3>' + courseObj.name + '</h3><p>' + courseObj.description+ '</p>';
  result += '<p><a href="' + courseObj.path + '" class="btn btn-primary">Открыть</a> <span class="enrolled-count">Начни изучение уже сейчас!</span></p></div>';
  return result + '</div>';
}

function getCourseBlock(courseObj1, courseObj2 = null) {
  let result = '<div class="col-md-6">' + getCourse(courseObj1);
  if (courseObj2){
     result += getCourse(courseObj2);
  }
  return result + '</div>';
}

function insertCourses(courses) {
  let length = courses.length;
  if (courses.length % 2 != 0) {
    length--;  
  }
  let html = '';
  for(let i = 0; i < length; i += 2){
    html += getCourseBlock(courses[i], courses[i + 1]);
  }
  
  if (length != courses.length) {
    html += getCourseBlock(courses[length]);
  }
  
  $("#coursesBody").html(html);
}

function loadCourses(){
    const settings = getCoursesSettings();
    insertCourses(settings.courses);
}

$(document).ready(function () {
  
  
});
