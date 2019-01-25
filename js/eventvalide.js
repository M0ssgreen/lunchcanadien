$(document).ready(function() {
        $.getJSON('http://localhost:8080/events' , function(evs){
              
            for (i in evs){
            	if (evs[i].status == 1)
                $('#elem').append('<tr><td>' + evs[i].idEvent + '</td><td>' + evs[i].dateDebut + ' à ' + evs[i].dateFin + '</td><td>' + evs[i].nbUser+ '</td><td><form  action="event.html"><input type="text" hidden="" value="evs[i].idEvent" name="idevent" ><button type="submit" value="afficher votre lunch" class="btn btn-outline-secondary">affiche</button></form></td></tr>');
            }
            
          });
        
           // $('#elem').html('<tr><td>1text</td><td>2text</td><td>3text</td></tr>');
                 
          
      });

      $(document).ready(function() {
});