$(document).on('ready page:load', function(){
  
  $('#init').off('click');


  if (players){ 
    console.log(players.firebase_url);
    var inviteRef = new Firebase(players.firebase_url)
    var currentGameRef = new Firebase(players.firebase_url + "/game");
    
    inviteRef.on('child_changed', function(snapshot) {
      var game = snapshot.val();
      if(game.game_state === "game_started"){
        $('#init').on("click");
      }
    });

    currentGameRef.child('start_game').on('value', function(snapshot) {
        var start_game = snapshot.val();

        if ( start_game !== null && start_game === 1 ) {
          console.log("start_game fired");
          $('td').text('');
          $("#init").hide();
          $('#reset').show();

          players.start_game = 0;
          play();
        };        
    });

      
      $('#init').click(function(){
        currentGameRef.set({
          board: players.board, 
          x_or_o_turn: players.x_or_o_turn, 
          turn: players.turn, 
          start_game: 1,
          redo: players.redo,
          start_game_button: false,
          game_tester: "Drew"
        });


      });

      // currentGameRef.once('value',function(snapshot){
      //   var game = snapshot.val();
      //   console.log("break -> you should see this only once")
      //   if(game != null){
      //     players.start_game = game.start_game
      //   };
      //   if(players.start_game === 1){
      //     console.log("start_game fired");
      //     $('td').text('');
      //     $("#init").hide();
      //     $('#reset').show();

      //     players.start_game = 0;
      //     play();
      //   };                 
      // });

      currentGameRef.on('child_changed', function(snapshot){
        var game = snapshot.val()
        console.log("child_changed");
        switch ( snapshot.name() ) {
              case 'board':
                updateBoard(game);
                break;

              case 'turn':
                updateTurn(game);
                break;
        }

      });

    function play(){
      console.log("Play function -> fired");
      $("td").click(function(){
        var self = $(this)   

        if(players.turn % 2 !== 0 && $(this).text() === ''){
          gameMove("x",self);
        }//end of primary if conditional for td.click
        
        else if(players.turn % 2 === 0 && $(this).text() === ''){
          gameMove("o",self)
        }//end of else conditional for td.click

      });//end of click function 
    };

    function gameMove(x_o, td){
      players.turn++;
      td.text(x_o);
      td.off("click");
      players.board[td.attr('id')] = x_o;
      currentGameRef.update({turn: players.turn, board: players.board});
      console.log(players.board)
    };

  

    function updateBoard(board) {
      // alert("updateBoard")
      players.board = board;
      $('td').each(function(index) {
        $(this).text(board[index]);

        if (board[index] === 'x') {
          $(this).html("<span class='animated bounceIn'><i class='fa fa-heart'></i>" + "</span>")
        } else if(board[index] === 'o')  {
          $(this).html("<span class='animated bounceIn'><i class='fa fa-heart-o'></i>" + "</span>")
        }
      });
      
    }

    function updateTurn (turn) {
          players.turn = turn;
    }


  


    function scoreChecker(playerMove){
    return((players.board[0] == playerMove &&
        players.board[1] == playerMove &&
        players.board[2] == playerMove) ||

      (players.board[0] == playerMove &&
        players.board[3] == playerMove &&
        players.board[6] == playerMove) ||

      (players.board[0] == playerMove &&
        players.board[4] == playerMove &&
        players.board[8] == playerMove) ||

      (players.board[1] == playerMove &&
        players.board[4] == playerMove &&
        players.board[7] == playerMove) ||

      (players.board[2] == playerMove &&
        players.board[5] == playerMove &&
        players.board[8] == playerMove) ||

      (players.board[2] == playerMove &&
        players.board[4] == playerMove &&
        players.board[6] == playerMove) ||

      (players.board[3] == playerMove &&
        players.board[4] == playerMove &&
        players.board[5] == playerMove) ||

      (players.board[6] == playerMove &&
        players.board[7] == playerMove &&
        players.board[8] == playerMove))
       
    }
  }// end of initial if(players) statement

}); //end of document.ready




