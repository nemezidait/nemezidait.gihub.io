"use strict";

var editor = null, diffEditor = null;
const languageMode = 'cpp';

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

function switchCodeFile(fileName){
    if(!editor){
        return;
    }
    
    const openedFileName = getOpenedFileName();
    
    if (openedFileName === fileName){
        return;
    }
    
    const settings = getLessonSettings();
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
        savedCode.additionalFiles.filter(x => x.name === openedFileName).code = currentCode;
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
        code = savedCode.additionalFiles.filter(x => x.name === fileName).code;
        console.log(savedCode.additionalFiles.filter(x => x.name === fileName));
    }
    
    $('.loading.editor').show();
    loadSample(languageMode, code);
    $('.loading.editor').fadeOut({ duration: 300 });
}

function getLessonSettings(){
    let request = new XMLHttpRequest();
    request.open("GET", "config.json", false);
    request.send(null);
    return JSON.parse(request.responseText);
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

function compile(){
       
}

$(document).ready(function () {
    const settings = getLessonSettings();
    const storageName = getStorageName(settings);
    const savedCodeJson = localStorage.getItem(storageName);
    
    if (savedCodeJson) {
        // saved code from db
        const savedCode = JSON.parse(savedCodeJson);
        $('.loading.editor').show();
        loadSample(languageMode, savedCode.mainFile.code);
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
                $('.loading.editor').fadeOut({ duration: 300 });
            });
    }
    
    initializeFileHeaders(settings.mainCodeTemplate, settings.codeTemplates);

    window.onresize = function () {
        if (editor) {
            editor.layout();
        }
        if (diffEditor) {
            diffEditor.layout();
        }
    };
});
