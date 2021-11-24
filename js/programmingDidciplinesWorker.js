function getDidciplinesSettings() {
    let request = new XMLHttpRequest();
    request.open("GET", "disciplinesSettings.json", false);
    request.send(null);
    return JSON.parse(request.responseText);
}

function getDidcipline(didciplineObj) {
  let result = '<div class="probootstrap-service-2 probootstrap-animate"><div class="image"><div class="image-bg"><img src="' + didciplineObj.logo +'"></div></div>';
  result += '<div class="text"><span class="probootstrap-meta"><i class="icon-calendar2"></i> запущен в 2021 году</span>';
  result += '<h3>' + didciplineObj.name + '</h3><p>' + didciplineObj.description+ '</p>';
  result += '<p><a href="' + didciplineObj.path + '" class="btn btn-primary">Начать</a> <span class="enrolled-count">Всего один клик до мечты!</span></p></div>';
  return result + '</div>';
}

function getDidciplineBlock(didciplineObj1, didciplineObj2 = null) {
  let result = '<div class="col-md-6">' + getDidcipline(didciplineObj1);
  if (didciplineObj2){
     result += getDidcipline(didciplineObj2);
  }
  return result + '</div>';
}

function insertDidciplines(didciplines) {
  let length = didciplines.length;
  if (didciplines.length % 2 != 0) {
    length--;  
  }
  let html = '';
  for(let i = 0; i < length; i += 2){
    html += getDidciplineBlock(didciplines[i], didciplines[i + 1]);
  }
  
  if (length != didciplines.length) {
    html += getDidciplineBlock(didciplines[length]);
  }
    
  document.getElementById("disciplinesBody").innerHTML = html;
}

function loadDidciplines(){
    const settings = getDidciplinesSettings();
    insertDidciplines(settings.didciplines);
}
