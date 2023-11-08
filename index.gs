// la fonction va s'activer à chaque fois qu'un form est envoyé
function onFormSubmit(e) {
    try {
        // ici mettre l'id du form 
        // pour le trouver imaginons que le lien complet du form c'est ; https://docs.google.com/forms/d/13OMnVVbWG_yVHym8szWyf3iH7jY3R0ApeLRaewctOxM/edit l'id c'est 13OMnVVbWG_yVHym8szWyf3iH7jY3R0ApeLRaewctOxM
        var form = FormApp.openById("ID-FORM");

        var formResponses = form.getResponses();
        var lastResponse = formResponses[formResponses.length - 1];
        var responses = lastResponse.getItemResponses();
        var nom = responses[0].getResponse()
        var prenom = responses[1].getResponse()
        var items = form.getItems();
        var attente = false

        for (var i = 0; i < items.length; i++) {
            if (items[i].getTitle().indexOf('Inscription') !== -1) {
                var desc = items[i].getHelpText()
                var descSplit = desc.split("\n")

                // Ici la limitation des membres qu'on peut changer
                var limit = 15

                if (descSplit.length < limit) {
                    //Logger.log("desc : " + desc)
                    desc = desc + "\n" + nom + " " + prenom
                    items[i].setHelpText(desc)
                    items[i].setTitle("Inscription (" + (descSplit.length + 1) + "/15)")
                } else {
                    attente = true
                }

            }
            if (items[i].getTitle().indexOf('attente') !== -1) {
                if (attente) {
                    var desc = items[i].getHelpText()
                    desc = desc + "\n" + nom + " " + prenom
                    items[i].setHelpText(desc)
                }
            }
        }
    } catch (error) {
        Logger.log("Erreur : " + error.toString());
    }
}