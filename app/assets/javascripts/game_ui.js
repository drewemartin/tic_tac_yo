$( document ).ready(function() {
    console.log( "document loaded" );
    playTicTacYo();

    function newGame(){
      //set up for post game
    }

    function playTicTacYo(){
      var xScoreArray = [];
      var oScoreArray = [];
      var turnCounter = 1;

      $('td').click(function() {
        if(turnCounter % 2 != 0){
          $(this).html("<span class='animated bounceIn'><i class='fa fa-heart'></i>" + "</span>");
          $(this).off('click');
          console.log("i was clicked");
          xScoreArray.push($(this).attr('id'));
          turnCounter++;
          console.log("turnCounter is equal to "+turnCounter);
          console.log(xScoreArray);
        }
        else{
              $(this).html("<span class='animated bounceIn'><i class='fa fa-heart-o'></i>" + "</span>");
          $(this).off('click');
          console.log("i was clicked");
          oScoreArray.push($(this).attr('id'));
          turnCounter++;
          console.log("turnCounter is equal to "+turnCounter);
          console.log(oScoreArray);
        }
      });
    }; 

    //sandy's script
     var even = $('.even');
     var odd = $('.odd');
    setInterval(function() {  
      odd.parent().css('opacity', '1'); 
      odd.parent().addClass('animated flipInY');     
    }, 1000);

      setInterval(function() {
      even.parent().css('opacity', '1');
      even.parent().addClass('animated flipInX');
    }, 2000);
      


    setInterval(function() {
      even.addClass('animated bounceOut');
      }, 4000);

    setInterval(function() {
      odd.addClass('animated bounceOut');
      }, 5000);
      
});

  