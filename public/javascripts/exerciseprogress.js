// DOM Ready =============================================================
$(document).ready(function() {


  $(".ExerciseProgress").focusout(function(){
    var progress = $(this).val();
    var target = $(this).attr("placeholder");
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
