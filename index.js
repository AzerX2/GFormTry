const { google } = require('googleapis');

require('dotenv').config();

const api = google.forms({
    version: 'v1',
    auth: process.env.G_API
});

let formid = process.env.FORM_ID;

function onFormSubmit(e) {
    var responses = e.values; // Récupère les réponses du formulaire
    var form = FormApp.openById(formid); // Remplacez par l'ID de votre formulaire

    // Récupère le formulaire
    var formItems = form.getItems(FormApp.ItemType.TEXT);

    var fullName = responses[1] + " " + responses[2]; // Combinez nom et prénom

    for (var i = 0; i < formItems.length; i++) {
        var item = formItems[i];
        if (item.getTitle().startsWith("Inscription")) {
            var inscriptionItem = item.asTextItem();
            var currentResponse = inscriptionItem.createResponse(fullName);
            // Ajoute la réponse à la catégorie "Inscription"
            form.getResponse(e.response.getId()).withItemResponse(currentResponse).submit();
        }
    }
}


let lastResponse = 0;
api.forms.responses.list({
    formId: formid
}).then((response) => {
    const responses = response.data.responses;
    if (lastResponse != responses[responses.length - 1]) {
        onFormSubmit(responses[responses.length - 1]);
        lastResponse = responses[responses.length - 1];
    }
});

setInterval(() => {
    api.forms.responses.list({
        formId: formdata.id
    }).then((response) => {
        const responses = response.data.responses;
        if (lastResponse != responses[responses.length - 1]) {
            onFormSubmit(responses[responses.length - 1]);
            lastResponse = responses[responses.length - 1];
        }
    });
}, 10000);