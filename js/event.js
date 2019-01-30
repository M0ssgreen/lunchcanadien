  var ViewModel = function () {
    var self = this;
    self.event = ko.observableArray();
    self.eventByToto = ko.observableArray();
    self.eventByMail = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observableArray();
    self.demandes = ko.observableArray();
    self.newDemande = {
        date: ko.observable(),
        nom: ko.observable(),
        dateDebut: ko.observable(),
        dateFin: ko.observable()
    }
    self.user = {
        idUser:ko.observable(),
        nom : ko.observable(),
        prenom : ko.observable(),
        mail : ko.observable(),
        mdp : ko.observable(),
        entreprise : ko.observable(),
        telephone : ko.observable(),
    }
    self.userMail = {
        mail : ko.observable(),
    }

    var idEv = getUrlVars()["id"];


    var eventUri ='http://localhost:8080/events';
    var eventByIdUri ='http://localhost:8080/event';
    var eventValidEmailTotoUri ='http://localhost:8080/eventvalide?email=toto@gmail.com';
    var eventValidEmail = 'http://localhost:8080/eventvalide?email=';
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


    function getEventDetail() {
        ajaxHelper(eventByIdUri + '/' + idEv, 'GET').done(function (ev) {
             self.event(ev);
         });

        ajaxHelper(demandeUri + '?eventId=' + idEv, 'GET').done(function (demandes) {
            self.detail(demandes);
        });
    }


    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    /**
    self.confirmDemande = function (item) {
        var confirmDemande = {
            idDemande: item.idDemande,
            dateDebut: item.dateDebut,
            dateFin: item.dateFin,
            status: "true",
            user : {id :item.user.id}
        };

        ajaxHelper(validdemandeUri+'/'+item.idDemande, 'PUT', confirmDemande).done(function (item) {
            var pos = self.demande.indexOf(item); //Récupérer l'id dans la liste demande
            var pos2 = pos-1;
            self.demande.splice(pos2, 1); //Retirer 1 élément à la position pos2
            self.demande.push(item); //réafficher l'élément 
            
             
            
            
        });

    }

    self.deleteDemande = function (item){

        ajaxHelper(supprdemandeUri+'/'+item.idDemande, 'DELETE', confirmDemande).done(function (demande) {
                var pos = self.demande.indexOf(item);
                var pos2 = pos-1;
                self.demande.splice(pos2,1);
                //self.demande.remove(function(demande){
                  //  return true;
                //});
                
            });
        

    }

     // Fetch the initial data.*/
     //getEventsByToto();
     getEventDetail();
     
};

ko.applyBindings(new ViewModel());

