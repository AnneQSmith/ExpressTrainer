// DOM Ready =============================================================
$(document).ready(function() {

    $('#trackworkout').bind("keypress", function(e) {
        //not sure why the following never prints out:
       console.log('in submit  prevention before test; e.keyCode = ' + e.keyCode);
       e.preventDefault();
       //if I use the below code, nothing works :-(
      //  var code = e.keyCode || e.which;
      // if (code == 13) {               
      //   e.preventDefault();
      //   return false;
      // }
    });

  $(".ToggleProgress").click(function(e){
    console.log(' we actually wound up in the toggleprogress on click function');
    e.preventDefault();

    //console.log(target);  even this line of
   // $(this).attr("currentvalue").value +=1;
    // how do I increment the value back on the page and persist it/how do I attach this to the associated form field?

  })

  $(".ExerciseProgress").focusout(function(){
    var progress = $(this).val();
    var target = $(this).attr("placeholder");
    $(this).attr("currentvalue").value = $(this).val()
    if (progress >= target){
        $(this).css("border-color", "#006400"); 
        $(this).css("background-color", "#87BF96");        
    }
    else {
        $(this).css("border-color", "#BA3100");    
        $(this).css("background-color", "#C96A6A");       
    }

    console.log('current entry= '+ progress+ ' target = '+ target);
  })

});
