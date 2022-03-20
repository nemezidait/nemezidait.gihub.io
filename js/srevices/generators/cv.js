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
<div class="form-group col-md-12">
    <label for="work-description">Обязанности и достижения*</label>
    <textarea required cols="30" rows="5" class="form-control" id="work-description"
        name="work-description"
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
    <input required placeholder="Русский" type="text" class="form-control" id="language" name="language">
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
    // Add delete button to the nativa language element
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

/* Education */

function createEducationElement() {
    let container = document.createElement('section');
    container.innerHTML = `<div class="form-group col-md-6">
    <label for="date-start">Начало обучения*</label>
    <input type="date" class="form-control" id="date-start"
        name="date-start">
</div>
<div id="date-end-container" class="form-group col-md-6">
    <label for="date-end">Окончание обучения*</label>
    <input type="date" class="form-control" id="date-end"
        name="date-end">
</div>
<div class="form-group col-md-12">
    <label for="schoolName">Название учебного заведения*</label>
    <input required placeholder="СПБГУ" type="text" class="form-control" id="schoolName" name="schoolName">
</div>
<div class="form-group col-md-6">
    <label for="scpeciality">Направление*</label>
    <input required placeholder="Информационные технологии" type="text" class="form-control" id="scpeciality" name="scpeciality">
</div>
<div class="form-group col-md-6">
    <label for="grade">Степень</label>
    <select class="form-control" id="grade">
        <option selected value="primary">Начальное</option>
        <option value="middle">Среднее специальное</option>
        <option value="bachelor">Бакалавр</option>
        <option value="master">Магистр</option>
        <option value="phd">Кандидат наук</option>
        <option value="doctor">Доктор</option>
      </select>
</div>`;
    return container;
}

function addEducationToList(){
    let educationElement = createEducationElement();
    // Add delete button to the education element
    let deleteButtonContainer = document.createElement('h5');
    deleteButtonContainer.classList.add('mb-0', 'col-md-12');
    let deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = 'Удалить';
    deleteButton.classList.add('btn', 'btn-danger', 'btn-full-size');
    deleteButtonContainer.appendChild(deleteButton);
    educationElement.appendChild(deleteButtonContainer);
    let educationList = document.getElementById('education-list');
    deleteButton.onclick = () => {
        educationList.removeChild(educationElement);
    };
    educationList.appendChild(educationElement);
}

/* END Education */