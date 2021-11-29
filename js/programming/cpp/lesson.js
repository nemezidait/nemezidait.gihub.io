"use strict";

var editor = null, diffEditor = null;

function initializeFileHeaders(mainFile, additionalFiles){
    let htmls = '<input type="button" onclick="switchCodeFile(\'' + mainFile + '\')" id="' + getFileButtonId(mainFile) + '" class="btn btn-info" value="'+ mainFile +'" />';
    additionalFiles.forEach((name, i) =>{
        htmls += '<input type="button" onclick="switchCodeFile(\'' + name + '\')" id="' + getFileButtonId(name) + '" class="btn btn-light" value="'+ name +'" />'
    });
    
    let codeFiles = document.getElementById('codeFiles');
    codeFiles.innerHTML = htmls;
    
    updateOpenedFileValue(mainFile);
}

function updateOpenedFileValue(fileName){
    let openedFileName = document.getElementById('openedFileName');
    openedFileName.value = fileName;
}

function getOpenedFileName(){
    return document.getElementById('openedFileName').value;
}

async function switchCodeFile(fileName){
    if(!editor){
        return;
    }
    
    const openedFileName = getOpenedFileName();
    
    if (openedFileName === fileName){
        return;
    }
    
    const settings = await getLessonSettings();
    updateStoredCode(settings, openedFileName);
    loadStoredCode(settings, fileName);
    
    const openedFileNameId = getFileButtonId(openedFileName);
    let openedCodeFile = document.getElementById(openedFileNameId);
    openedCodeFile.classList.remove("btn-info");
    openedCodeFile.classList.add("btn-light"); 
    
    const newFileId = getFileButtonId(fileName);
    let newCodeFile = document.getElementById(newFileId);
    newCodeFile.classList.remove("btn-light");
    newCodeFile.classList.add("btn-info"); 
            
    updateOpenedFileValue(fileName);
}

function updateStoredCode(settings, openedFileName){
    let currentCode = editor.getValue();
    const storageName = getStorageName(settings);
    const savedCode = JSON.parse(localStorage.getItem(storageName));
    
    if (savedCode.mainFile.name === openedFileName) {
        savedCode.mainFile.code = currentCode;
    }
    else{
        savedCode.additionalFiles.find(x => x.name === openedFileName).code = currentCode;
    }
    
    localStorage.setItem(storageName, JSON.stringify(savedCode));
}

function loadStoredCode(settings, fileName) {
    const storageName = getStorageName(settings);
    const savedCode = JSON.parse(localStorage.getItem(storageName));
    
    let code = '';
    if (savedCode.mainFile.name === fileName) {
        code = savedCode.mainFile.code;
    }
    else{
        code = savedCode.additionalFiles.find(x => x.name === fileName).code;
    }
    
    $('.loading.editor').show();
    editor.getModel().setValue(code);
    $('.loading.editor').fadeOut({ duration: 300 });
}

async function settingsLoader(settingsPath) {
    return await fetch(settingsPath).then((response) => response.json());
}

async function loadHtmlDocument(path){
    try{
        return await fetch(path).then(result => response.ok ? result.text() : '');
    }
    catch(error){
        console.log(error);
        return '';
    }
}

async function getLessonSettings(){
    return await settingsLoader(LessonSettings);
}

async function getThemeSettings(){
    return await settingsLoader(ThemeSettings);
}

async function getThemesSettings(){
     return await settingsLoader(ThemesSettings);
}

function getFileButtonId(fileName){
 return fileName.replaceAll('.', '_');
}

function getStorageName(settings){
    return 'cpp_cource_' + settings.lessonId;
}

function initStorageWithTemplateCode(settings, callback)
{    
    const mainCodeURL = settings.codePath + '/' + settings.mainCodeTemplate;
    // fill main code file
    xhr(mainCodeURL, function (err, data) {
            if (err) {
                onFileLoadError(err);
                return;
            }
            const codeTemplates = {
                mainFile: {
                     name: settings.mainCodeTemplate,
                     code: data,
                },
                additionalFiles: []
            };
            
            // load additional code templates
            loadAdditionalCodeTemplates(
                settings.codePath,
                settings.codeTemplates,
                0,
                (fileName, code) => codeTemplates.additionalFiles.push({name: fileName, code: code }),
                () => {
                     const storageName = getStorageName(settings);
                     localStorage.setItem(storageName, JSON.stringify(codeTemplates));
                },
                callback   
            );
        });
}

function loadAdditionalCodeTemplates(cadePath, fileNames, currentIdx, onLoaded, onFinished, callback)
{
        if (currentIdx >= fileNames.length){
                onFinished();
                callback();
                return;
        }
        
        xhr(cadePath + '/' + fileNames[currentIdx], function (err, data) {
            if (err) {
                onFileLoadError(err);
                return;
            }
            onLoaded(fileNames[currentIdx], data);
            loadAdditionalCodeTemplates(cadePath, fileNames, currentIdx + 1, onLoaded, onFinished, callback);
        });
}

function onFileLoadError(err){
        if (editor) {
            if (editor.getModel()) {
                editor.getModel().dispose();
            }
            editor.dispose();
            editor = null;
        }
        $('.loading.editor').fadeOut({ duration: 200 });
        $('#editor').empty();
        $('#editor').append('<p class="alert alert-error">Failed to load ' + languageCode + ' sample</p>');  
}

function loadSample(languageCode, code) {
    if (!editor) {
        $('#editor').empty();
        editor = monaco.editor.create(document.getElementById('editor'), {
            model: null,
        });
    }

    var oldModel = editor.getModel();
    var newModel = monaco.editor.createModel(code, languageCode);
    editor.setModel(newModel);
    if (oldModel) {
        oldModel.dispose();
    }
    changeTheme(0);
}

function changeTheme(theme) {
    var newTheme = (theme === 0 ? 'vs-dark' : 'vs');
    monaco.editor.setTheme(newTheme);
}

var preloaded = {};
(function () {
    var elements = Array.prototype.slice.call(document.querySelectorAll('pre[data-preload]'), 0);

    elements.forEach(function (el) {
        var path = el.getAttribute('data-preload');
        preloaded[path] = el.innerText || el.textContent;
        el.parentNode.removeChild(el);
    });
})();

function xhr(url, cb) {
    if (preloaded[url]) {
        return cb(null, preloaded[url]);
    }
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'text',
        error: function () {
            cb(this, null);
        }
    }).done(function (data) {
        cb(null, data);
    });
}

function getStdin(){
    return document.getElementById('stdin').value;
}

function getLessonsHtmlMenuList(lessons, currentLessonId){
    let menuList = '';
    lessons.forEach((lesson, i) =>{
        if (lesson.lessonId === currentLessonId) {
            menuList += '<li class="active"><a>' + lesson.name + '</a></li>';
        }
        else {
            menuList += '<li><a href="..' + lesson.path + '">' + lesson.name + '</a></li>';
        }
    });
    return menuList;
}

async function insertHtmlText(lessonSettings){
    // set lesson body text
    loadHtmlDocument("text.html").then(text => document.getElementById('text-content').innerHTML = text);
    loadHtmlDocument("task.html").then(text => document.getElementById('task-content').innerHTML = text);
    loadHtmlDocument("extendedText.html").then(text => text ?
                      document.getElementById('extended-text-content').innerHTML = text :
                      document.getElementById('extended-text-content').style.display = 'none');
    
    const themeSettings = await getThemeSettings();
    const  themesSettings = getThemesSettings();
    const currentTheme = themesSettings.themes.find(x => x.id === themeSettings.themeId);
    const currentLesson = themeSettings.lessons.find(x => x.lessonId === lessonSettings.lessonId);
    document.title = 'C++ ' + currentTheme.name + ' ' + currentLesson.name;
    $("#themeName").text(currentTheme.name);
    $("#lessonName").text(currentLesson.name);

    // fill menu
    document.getElementById('lessonMenu').innerHTML = getLessonsHtmlMenuList(themeSettings.lessons, lessonSettings.lessonId);
}

function dictionaryFromSavedCode(savedCode){
    let savedCodeDictionary = {};
    savedCodeDictionary[savedCode.mainFile.name] = savedCode.mainFile.code;
    
    savedCode.additionalFiles.forEach((af, i) => {
        savedCodeDictionary[af.name] = af.code;
    });
    
    return savedCodeDictionary;
}

function validateCode(savedCodeDictionary, validationRules) {
    for(let i = 0; i < validationRules.length; ++i){
        const validationRule = validationRules[i];
        let rule = new RegExp(validationRule.expression, 'g');
        if (!rule.test(savedCodeDictionary[validationRule.fileName])) {
            showErrorModal('Ошибка валидации!', 'Файл: ' + validationRule.fileName + '\n' + validationRule.errorMessage);
            return false;
        }
    }
    return true;
}

function checkTest(savedCode, testCases, testIndex = 0)
{
    if(testCases.length <= testIndex){
        showSuccessModal();
        return;
    }
    
    const testCase = testCases[testIndex];
    const stdin = testCase.stdin;
    compileGccCpp(savedCode.mainFile.code,
              savedCode.additionalFiles.map(c => ({ file: c.name, code: c.code })),
              savedCode.additionalFiles.map(c => c.name).join(' '),
              stdin)
    .then(result => {
        if (result.status !== '0') {
            showErrorModal('Ошибка! Тест ' + (testIndex + 1), 'Ошибка выполнения:\n' + result.compiler_error);
        }
        else {
            if (result.program_output == testCase.stdout) {
                // go to the next test case
                checkTest(savedCode, testCases, testIndex + 1);
            }
            else {
                showErrorModal('Неверный вывод! Тест ' + (testIndex + 1), 'Ввод: ' + stdin + '\nОжидаемый вывод: ' + testCase.stdout + '\nВывод: ' + result.program_output);
            }
        }
    });
}

function showSuccessModal() {
    $('#resultModalTitle').html('Тесты пройдены!');
    const formattedBody = '<div class="alert alert-success" role="alert"><h6>Все тесты успешно пройдены!<h6></div>';
    $('#resultModalBody').html(formattedBody);
    $('#testSpinner').modal('hide');
    $('#resultModal').modal('show');
}

function showErrorModal(title, body) {
    $('#resultModalTitle').html(title);
    const formattedBody = '<div class="alert alert-danger" role="alert" style="white-space: pre-line">' + body + '</div>';
    $('#resultModalBody').html(formattedBody);
    $('#testSpinner').modal('hide');
    $('#resultModal').modal('show');
}

function fillSampleData(settings){
    $('#sample-stdin').text(settings.task.sampleStdin);
    $('#stdin').text(settings.task.sampleStdin);
    $('#sample-stdout').text(settings.task.sampleStdout);
}

$(document).ready(() => {
    getLessonSettings().then((settings) => {
    
        insertHtmlText(settings);
        fillSampleData(settings);

        const storageName = getStorageName(settings);
        const savedCodeJson = localStorage.getItem(storageName);
        const languageMode = 'cpp';
        if (savedCodeJson) {
            // saved code from db
            const savedCode = JSON.parse(savedCodeJson);
            $('.loading.editor').show();
            loadSample(languageMode, savedCode.mainFile.code);
            updateOpenedFileValue(savedCode.mainFile.name);
            $('.loading.editor').fadeOut({ duration: 300 });
        }
        else {
            // defaul sample
            initStorageWithTemplateCode(
                settings,
                () => {
                    const savedCode = JSON.parse(localStorage.getItem(storageName));
                    $('.loading.editor').show();
                    loadSample(languageMode, savedCode.mainFile.code);
                    updateOpenedFileValue(savedCode.mainFile.name);
                    $('.loading.editor').fadeOut({ duration: 300 });
                });
        }


        initializeFileHeaders(settings.mainCodeTemplate, settings.codeTemplates);
    });

    window.onresize = function () {
        if (editor) {
            editor.layout();
        }
        if (diffEditor) {
            diffEditor.layout();
        }
    };
});

