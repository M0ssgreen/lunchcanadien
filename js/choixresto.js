var ViewModel = function () {
    var self = this;
    self.adresse = {
        numero: ko.observable(),
        rue: ko.observable(),
        codePostal: ko.observable(),
        ville: ko.observable()
    }
    self.newEvent = {
        id:ko.observable(),
        resto : ko.observable()
    }

    var eventUri ='http://localhost:8080/event/resto';

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
    self.addResto = function (formElement) {
        console.log("resto")
        var event = {
            id: self.newEvent.id(), 
            resto: self.newEvent.resto() ,
            adresse : {
                numero :self.adresse.numero(),
                rue :self.adresse.rue(),
                codePostal :self.adresse.codePostal(),
                ville :self.adresse.ville()}
            };
            
        
    
        ajaxHelper(eventUri, 'PUT', event).done(function (item) {
            self.event.push(item);
        });
    }
};

ko.applyBindings(new ViewModel());