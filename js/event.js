  var ViewModel = function () {
    var self = this;
    self.event = ko.observableArray(null);
    self.eventByToto = ko.observableArray();
    self.eventByMail = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observableArray();
    self.demandes = ko.observableArray();
    self.selectedItems = ko.observableArray();
    self.feedbackRead = ko.observableArray();
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
    self.feedback = {
        commentaire : ko.observable(),
        note : ko.observable()
    }


    var onStar = parseInt($('#stars li').data('value'), 10); // The star currently selected
    var stars = $('#stars li').parent().children('li.star');

    var idEv = getUrlVars()["id"];
    var ratingValue;
    

    var eventUri ='http://localhost:8080/events';
    var eventByIdUri ='http://localhost:8080/event';
    var eventValidEmailTotoUri ='http://localhost:8080/eventvalide?email=toto@gmail.com';
    var eventValidEmail = 'http://localhost:8080/eventvalide?email=';
    var demandeUri ='http://localhost:8080/demandes';
    var validdemandeUri ='http://localhost:8080/demande/valid';
    var supprdemandeUri ='http://localhost:8080/demandes';
    var commentUri= 'http://localhost:8080/demandes/avis';
    var demandesAll='http://localhost:8080/demandesAll'

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

    function getRate(){
        for (i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
          }
        ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
    }
    self.addComment = function () {
        getRate()
        console.log(ratingValue)
        var demande = {
            user : {
                email :self.user.mail()
            },       
            commentaire :self.feedback.commentaire(),
            note :ratingValue,
            event:{
                id :idEv
            }
            
        };
    
        ajaxHelper(commentUri, 'PUT', demande) ;
        
    }

    function getFeedback(){
        ajaxHelper(demandeUri + '?eventId=' + idEv, 'GET').done(function (demandes) {
            self.feedbackRead(demandes);
        });
    }
    

     getEventDetail();
     getFeedback();
     
};

ko.applyBindings(new ViewModel());

