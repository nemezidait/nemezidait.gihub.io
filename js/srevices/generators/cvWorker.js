async function getCvTemplatesSettings() {
    try{
        return await fetch("data/templatesSettings.json").then(response => response.ok ? response.json() : null);
    }
    catch(error){
        console.log(error);
        return null;
    }
}

/* templates.html */

async function loadTemplates() {

}

/* END templates.html */