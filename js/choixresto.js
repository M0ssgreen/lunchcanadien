var ViewModel = function () {
    var self = this;
    self.idEv = getUrlVars()["id"];
    self.error = ko.observable();
    self.newadresse = {
        numero: ko.observable(),
        rue: ko.observable(),
        codePostal: ko.observable(),
        ville: ko.observable()
    }
    self.newevent = {
        id: ko.observable(),
        resto: ko.observable()
    }
    

    var eventUri ='http://localhost:8080/event/resto';

    function ajaxHelper(uri, method, data) {
        self.error('');
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
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    self.addResto = function (formElement) {
        console.log("resto");
        alert("Vos données ont bien été envoyées");
        var join = {
            event : {
                //id: self.newevent.id(), 
                id: self.idEv,
                resto: self.newevent.resto() 
            },
            adresse : {
                numero : self.newadresse.numero(),
                rue : self.newadresse.rue(),
                codePostal : self.newadresse.codePostal(),
                ville : self.newadresse.ville()
            }
        } ;  
        
    
        ajaxHelper(eventUri, 'PUT', join).done(function (item) {
            self.join.push(item);
        });
        
        
    }
};

ko.applyBindings(new ViewModel());