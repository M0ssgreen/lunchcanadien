var ViewModel = function () {
    var self = this;
    self.newAdresse = {
        numero: ko.observable(),
        rue: ko.observable(),
        codePostal: ko.observable(),
        ville: ko.observable()
    }
    self.event = {
        id:ko.observable(),
        resto : ko.observable()
    }

    var eventUri ='http://localhost:8080/';

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
        var choixResto = {
            adresse : {
                numero :self.newAdresse.numero(),
                rue :self.newAdresse.rue(),
                codePostal :self.newAdresse.codepostal(),
                ville :self.newAdresse.ville()},
                
            
            event : {
                id: self.event.id(), 
                resto: self.event.resto() 
            },
            
        };
    
        ajaxHelper(eventUri, 'POST', choixResto).done(function (item) {
            self.choixResto.push(item);
        });
  
    
}
};

ko.applyBindings(new ViewModel());