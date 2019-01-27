var ViewModel = function () {
    var self = this;
    self.demande = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();
    self.newDemande = {
        
        dateDebut: ko.observable(),
        dateFin: ko.observable()
    }
    self.user = {
        idUser:ko.observable()
    }
    self.oldDemande = {
        status: ko.observable(true)
    }

   

    var demandeUri ='http://localhost:8080/demandes';
    var validdemandeUri ='http://localhost:8080/demande/valid';
    var supprdemandeUri ='http://localhost:8080/demandes';

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

    function getAllDemandes() {
        ajaxHelper(demandeUri, 'GET').done(function (data) {
            self.demande(data);
        });
    }

    self.getDemandeDetail = function (item) {
        ajaxHelper(demandeUri + '/' + item.id, 'GET').done(function (data) {
        self.detail(data);
        });
    }


    self.addDemande = function (formElement) {
        var demande = {
            user : {id :self.user.idUser()},
            dateDebut: self.newDemande.dateDebut(),
            dateFin: self.newDemande.dateFin(),
            
        };
    
        ajaxHelper(demandeUri, 'POST', demande)
        
    }

    self.confirmDemande = function (item) {
        var confirmDemande = {
            idDemande: item.idDemande,
            dateDebut: item.dateDebut,
            dateFin: item.dateFin,
            status: "true",
            user : {id :item.user.id}
        };

        ajaxHelper(validdemandeUri+'/'+item.idDemande, 'PUT', confirmDemande)

    }

    self.deleteDemande = function (item){

        ajaxHelper(supprdemandeUri+'/'+item.idDemande, 'DELETE', confirmDemande)

    }

     // Fetch the initial data.
     getAllDemandes();
};

ko.applyBindings(new ViewModel());
