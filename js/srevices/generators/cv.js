/* Work expirience */
function hasExpirienceChanged() {
    let hasNoExpiriense = document.getElementById('has-no-expirience');
    let workExpirience = document.getElementById('work-expirience');
    let noExpirience = document.getElementById('no-expirience');

    if (hasNoExpiriense.checked == true) {
        workExpirience.style.display = 'none';
        noExpirience.style.display = 'block';
    } else {
        noExpirience.style.display = 'none';
        workExpirience.style.display = 'block';
    }
}

function currentJob(control) {
    let dateEnd = control.parentElement.parentElement.querySelector('#date-end-container');
    if (control.checked == true) {
        dateEnd.style.display = 'none';
    } else {
        dateEnd.style.display = 'block';
    }
}

function createWorkExpirienceElement() {
    let container = document.createElement('section');
    container.innerHTML = `<div class="form-group col-md-6">
    <label for="company-name">Название компании*</label>
    <input placeholder="Nemezida IT" type="text" class="form-control" id="company-name" name="company-name"
        required>
</div>
<div class="form-group col-md-6">
    <label for="company-position">Позиция*</label>
    <input placeholder="Junior Frontend developer" type="text" class="form-control" id="company-position" name="company-position"
        required>
</div>
<div class="form-group col-md-6">
    <label for="date-start">Начало работы*</label>
    <input type="date" class="form-control" id="date-start"
        name="date-start">
</div>
<div id="date-end-container" class="form-group col-md-6">
    <label for="date-end">Окончание работы*</label>
    <input type="date" class="form-control" id="date-end" name="date-end">
</div>
<div class="form-check col-md-12">
    <input type="checkbox" class="form-check-input"
        id="current-job" onclick="currentJob(this)">
    <label class="form-check-label" for="current-job">Текущее место работы</label>
</div>
<div id="msg" class="form-group col-md-12">
    <label for="message">Обязанности и достижения*</label>
    <textarea cols="30" rows="5" class="form-control" id="message"
        name="message"
        placeholder="Занимался поддержкой и улучшением текущего функционала сайта. Ускорил поиск по сайту. Перевёл основную часть legacy страниц на React."></textarea>
</div>`;
    return container;
}

function addWorkExpirienceToList() {
    let workExpirienceElement = createWorkExpirienceElement();
    // Add delete button to the work expirience element
    let deleteButtonContainer = document.createElement('h5');
    deleteButtonContainer.classList.add('mb-0', 'col-md-12');
    let deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = 'Удалить';
    deleteButton.classList.add('btn', 'btn-danger', 'btn-full-size');
    deleteButtonContainer.appendChild(deleteButton);
    workExpirienceElement.appendChild(deleteButtonContainer);
    let workExpirienceList = document.getElementById('work-expirience-list');
    deleteButton.onclick = () => {
        workExpirienceList.removeChild(workExpirienceElement);
    };
    workExpirienceList.appendChild(workExpirienceElement);
}

/* END Work expirience */

/* Native languages */

function createNativeLanguageElement() {
    let container = document.createElement('section');
    container.innerHTML = `<div class="form-group col-md-6">
    <label for="language">Язык*</label>
    <input placeholder="Русский" type="text" class="form-control" id="language" name="language">
</div>
<div class="form-group col-md-6">
    <label for="grade">Уровень владения</label>
    <select class="form-control" id="grade">
        <option selected value="native">Родной</option>
        <option value="pre-intermediate">Начальный</option>
        <option value="intermediate">Средний</option>
        <option value="upper-intermediate">Продвинутый</option>
      </select>
</div>`;
    return container;
}

function addNativeLanguageToList(){
    let nativeLanguageElement = createNativeLanguageElement();
    // Add delete button to the work expirience element
    let deleteButtonContainer = document.createElement('h5');
    deleteButtonContainer.classList.add('mb-0', 'col-md-12');
    let deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = 'Удалить';
    deleteButton.classList.add('btn', 'btn-danger', 'btn-full-size');
    deleteButtonContainer.appendChild(deleteButton);
    nativeLanguageElement.appendChild(deleteButtonContainer);
    let nativeLanguagesList = document.getElementById('native-languages-list');
    deleteButton.onclick = () => {
        nativeLanguagesList.removeChild(nativeLanguageElement);
    };
    nativeLanguagesList.appendChild(nativeLanguageElement);
}

/* END Native languages */