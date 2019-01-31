var ViewModel = function () {
    var self = this;
    self.event = ko.observableArray();
    //self.eventByToto = ko.observableArray();
    self.eventByMail = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();
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
    self.availableEntreprise = ko.observableArray(),
    self.nomEntreprise = ko.observableArray()
    //self.idEntreprise = getIdEntreprises(self.availableEntreprise)

    var entrepriseUri ='http://localhost:8080/entreprises';
    var idEntrepriseUri='http://localhost:8080/entreprisechoix/';
    var eventUri ='http://localhost:8080/events';
    //var eventValidEmailTotoUri ='http://localhost:8080/eventvalide?email=toto@gmail.com';
    var eventValidEmail = 'http://localhost:8080/eventvalide?email=';
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
/** 
    function getAllEntreprises(){
        ajaxHelper(entrepriseUri, 'GET').done(function (data) {
            self.availableEntreprise(data);
        });
    }

    function getIdEntreprises(data){
        ajaxHelper(idEntrepriseUri+data, 'GET').done(function (data) {
            self.idEntreprise(data);
        });
    }*/

   /* function getAllEvents() {
        ajaxHelper(eventUri, 'GET').done(function (data) {
            self.event(data);
        });
    }*/
    /*function getEventsByToto() {
        ajaxHelper(eventValidEmailTotoUri, 'GET').done(function (data) {
            self.eventByToto(data);
        });
    }*/
    
    /** self.getDemandeDetail = function (item) {
        ajaxHelper(demandeUri + '/' + item.id, 'GET').done(function (data) {
        self.detail(data);
        });
    }*/


    self.addDemande = function () {
        console.log("addDemande")
        //getIdEntreprises(self.availableEntreprise)
        var demande = {
            user : {
                //id:10,
                nom :self.user.nom(),
                prenom :self.user.prenom(),
                email :self.user.mail(),
                telephone :self.user.telephone()},
                //entreprise : 10326,
            //entreprise : {nom:self.idEntreprise()},
            event : {
                quantieme: self.newDemande.date() +'T00:00:00.000Z',
                nom: self.newDemande.nom() 
            },
            
        };
    
        ajaxHelper(eventUri, 'POST', demande).done(function (item) {
            //self.demande.push(item);
            
        });

        alert("Vos données ont bien été envoyées");
        
    }

    self.getMyEvent = function () {
        
        var email = self.userMail.mail();
        console.log(email)
        
            ajaxHelper(eventValidEmail+email, 'GET').done(function (data) {
                self.eventByMail(data);
         
            });
        
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
     
     //getAllEvents();
     //getAllEntreprises();
     
     
};

ko.applyBindings(new ViewModel());
