var ViewModel = function () {
    var self = this;
    self.error = ko.observable();
    self.newadresse = {
        numero: ko.observable(),
        rue: ko.observable(),
        codePostal: ko.observable(),
        ville: ko.observable()
    }
    self.idEvent = ko.observable();
    self.restaurant = ko.observable();

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

    self.addResto = function (formElement) {
        console.log("resto")
        var event = {
            id: self.idEvent(), 
            resto: self.restaurant() ,
            adresse : {
                numero :self.newadresse.numero(),
                rue :self.newadresse.rue(),
                codePostal :self.newadresse.codePostal(),
                ville :self.newadresse.ville()
            },
        };
            
        
    
        ajaxHelper(eventUri, 'PUT', event).done(function (item) {
            self.event.push(item);
        });
    }
};

ko.applyBindings(new ViewModel());