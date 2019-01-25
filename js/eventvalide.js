$(document).ready(function() {
            $("#decl").click(function(event) {
                $.getJSON('http://localhost:8080/event/1' , function(ev){
                    $('#eventvalide').html('<p> Id : ' + ev.idEvent + '</p>');
                    $('#eventvalide').append('<p> date de début : ' + ev.dateDebut + '</p>')
                    $('#eventvalide').append('<p> date de fin : ' + ev.dateFin + '</p>')
                    $('#eventvalide').append('<p> nombre de participants : ' + ev.nbUser + '</p>')
                    $('#eventvalide').append('<p> statut : ' + ev.status + '</p>')
                });
            });
        });