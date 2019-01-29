/*$(document).ready(function() {
    $.getJSON('http://localhost:8080/events' , function(evs){
          
        for (i in evs){
            $('#elem').append('<tr><td>' + evs[i].idEvent + '</td><td>' + evs[i].dateDebut + ' à ' + evs[i].dateFin + '</td><td>' + evs[i].nbUser+ '</td><td><form  action="event.html"><input type="text" hidden="" value="evs[i].idEvent" name="idevent" ><button type="submit" value="afficher votre lunch" class="btn btn-outline-secondary">affiche</button></form></td></tr>');
        }
        
      });
    
       // $('#elem').html('<tr><td>1text</td><td>2text</td><td>3text</td></tr>');
             
      
  });*/

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


    var eventUri ='http://localhost:8080/events';
    var eventByIdUri ='http://localhost:8080/event';
    var eventValidEmailTotoUri ='http://localhost:8080/eventvalide?email=toto@gmail.com';
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

    function getAllEvents() {
        ajaxHelper(eventUri, 'GET').done(function (data) {
            self.event(data);
        });
    }
    function getEventsByToto() {
        ajaxHelper(eventValidEmailTotoUri, 'GET').done(function (data) {
            self.eventByToto(data);
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
                email :self.user.mail(),
                telephone :self.user.telephone()},
                
            
            event : {
                quantieme: self.newDemande.date() +'T00:00:00.000Z',
                nom: self.newDemande.nom() 
            },
            
        };
    
        ajaxHelper(eventUri, 'POST', demande).done(function (item) {
            self.demande.push(item);
        });
        
    }

    self.getMyEvent = function () {
        document.getElementById("eventAll").hidden = true;
        document.getElementById("eventMail").hidden = false;
        var email = self.userMail.mail();
        console.log(email)
        
            ajaxHelper(eventValidEmail+email, 'GET').done(function (data) {
                self.eventByMail(data);
         
            });
        
    }

    self.getEventDetail = function (item) {
        ajaxHelper()
        ajaxHelper(eventByIdUri + '/' + item.id, 'GET').done(function (data) {
        self.detail(data);
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
     getEventsByToto();
     
     getAllEvents();
     
};

ko.applyBindings(new ViewModel());

