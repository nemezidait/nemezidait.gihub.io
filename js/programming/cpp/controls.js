"use strict";

function setStdout(value){
    document.getElementById('stdout').value = value;
}

function showTestSpinner(){
    $('#testSpinner').modal('show');
}

async function runTest(){
    const settings = await getLessonSettings();
    const openedFileName = getOpenedFileName();
    updateStoredCode(settings, openedFileName);
    const storageName = getStorageName(settings);
    const savedCode = JSON.parse(localStorage.getItem(storageName));
    
    if (!validateCode(dictionaryFromSavedCode(savedCode), settings.task.validationRules)){
        return;   
    }
    checkTest(savedCode, settings.task.testCases);
}

async function compile(){
    const settings = await getLessonSettings();
    const openedFileName = getOpenedFileName();
    updateStoredCode(settings, openedFileName);
    const storageName = getStorageName(settings);
    const savedCode = JSON.parse(localStorage.getItem(storageName));
    
    const stdin = getStdin();
    
    compileGccCpp(savedCode.mainFile.code,
                  savedCode.additionalFiles.map(c => ({ file: c.name, code: c.code })),
                  savedCode.additionalFiles?.map(c => c.name)?.filter(c => c.endsWith('.cpp')).map(c => c + '\n'),
                  stdin)
    .then(result => {
        let stdoutValue = 'status: ' + result.status + '\n';
        if (result.compiler_error)
        {
            stdoutValue += result.status === '0' ? 'Warnings:\n' : 'Errors:\n';
            stdoutValue += result.compiler_error;
        }
        if (result.status === '0')
        {
            stdoutValue += '\nResult:\n' + result.program_output;
        }
        
        setStdout(stdoutValue);
    });
}

async function clearSolution(){
    const settings = await getLessonSettings();
    initStorageWithTemplateCode(
            settings,
            () => {
                const openedFileName = getOpenedFileName();
                loadStoredCode(settings, openedFileName);
            });
}
