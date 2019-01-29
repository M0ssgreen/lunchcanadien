var ViewModel = function () {
    var self = this;
    self.event = ko.observableArray();
    self.restau = ko.observableArray();
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


    var mapUri ='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=48.820921,2.311699&radius=100&type=restaurant&keyword=cruise&key=AIzaSyDVscGVwebEYc-UB8pnugwoY8XrD2D8Rxg';
   
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            async:true,
            crossDomain:true,
            type: method,
            url: uri,
            dataType: 'JSONP',
            headers: { 
            "cache-control": "no-cache",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": 'GET'
               },
            cache: false,
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }


    function getAllRestau() {
        ajaxHelper(mapUri, 'GET').done(function (data) {
            console.log(data);
            self.restau(data);
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
        
        var email = self.userMail.mail();
        console.log(email)
        
            ajaxHelper(eventValidEmail+email, 'GET').done(function (data) {
                self.eventByMail(data);
         
            });
        
    }
     
   
     getAllRestau();
     
};

ko.applyBindings(new ViewModel());
