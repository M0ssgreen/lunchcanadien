var ViewModel = function () {
    var self = this;
    self.demande = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();
    self.newDemande = {
        idUser : ko.observable(),
        dateDebut: ko.observable(),
        dateFin: ko.observable(),
    }

    var demandeUri ='http://localhost:8080/demandes';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    self.addDemande = function (formElement) {
        var demande = {
            idUser: self.newDemande.idUser(),
            dateDebut: self.newDemande.dateDebut(),
            dateFin: self.newDemande.dateFin(),
        };
    
        ajaxHelper(demandeUri, 'POST', demande)
        
    }

    
};

ko.applyBindings(new ViewModel());
