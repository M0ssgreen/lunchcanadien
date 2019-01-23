
	$(document).on("scroll", function(){
		if
      ($(document).scrollTop() > 86){
		  $("#banner").addClass("shrink");
		}
		else
		{
			$("#banner").removeClass("shrink");
		}
    });
    
    $(document).ready(function() {
        $(".dropdown-toggle").dropdown();
    });

    