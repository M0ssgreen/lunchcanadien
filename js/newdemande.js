var ViewModel = function () {
    var self = this;
    self.event = ko.observableArray();
    
    self.error = ko.observable();
    self.detail = ko.observable();
    self.newDemande = {
        date: ko.observable(),
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
    }
    


    var eventUri ='http://localhost:8080/events';
    var demandeUri ='http://localhost:8080/events';
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

    function getAllEvents() {
        ajaxHelper(eventUri, 'GET').done(function (data) {
            self.event(data);
        });
    }

    self.getDemandeDetail = function (item) {
        ajaxHelper(demandeUri + '/' + item.id, 'GET').done(function (data) {
        self.detail(data);
        });
    }


    self.addDemande = function (formElement) {
        console.log("demande")
        var demande = {
            user : {
                nom :self.user.nom(),
                prenom :self.user.prenom(),
                mail :self.user.mail(),
                mdp :self.user.mdp(),
                entreprise :self.user.entreprise()},
            
            event : {
                date: self.newDemande.date()},
            
        };
    
        ajaxHelper(eventUri, 'POST', demande)//.done(function (item) {
            //self.demande.push(item);
        //});
        
    }

    /**self.confirmDemande = function (item) {
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
     getAllEvents();
};

ko.applyBindings(new ViewModel());
