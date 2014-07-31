$(document).on('ready page:load', function(){
  // FIREBASE
  // 1. Initialize the board -> New Game
  // 1a. Send initialized board to Firebase
  // var board = ["", "", "", "", "", "", "", "", ""]
  // 2. Someone makes a move (i.e. clicks on a square)
  // 3. Update the board on Firebase (Firebase.set())
  // 4. Update currentTurn on Firebase
  // 5. Check for a win

  $('#init').off('click');


  if (players){ 
    console.log(players.firebase_url);
    var inviteRef = new Firebase(players.firebase_url)
    var currentGameRef = new Firebase(players.firebase_url + "/game");
    
    inviteRef.on('child_changed', function(snapshot) {
      var game = snapshot.val();
      if(game.start_game === "game_started"){
        $('#init').on("click");
        update_board_turn();
      }

    });

      
      $('#init').click(function(){
        start_game = true;
        //alert(players.x_or_o_turn);
        console.log("#init clicked -> New Game");
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

      currentGameRef.on('value',function(snapshot){
        var game = snapshot.val();
        console.log("break -> you should see this at least once")
        players.start_game = game.start_game;
        if(players.start_game === 1){
          console.log("start_game fired");
          $('td').text('');
          $("#init").hide();
          $('#reset').show();
          update_board_turn();
          players.start_game = 0;
          play();
        };                 
      });

    function play(){
      console.log("Play function -> fired")
      $("td").click(function(){
        var self = $(this)   
        console.log(board);

        if(players.turn % 2 != 0 && $(this).text() == ''){
          gameMove("x")
        
        }//end of primary if conditional for td.click
        
        else if(players.turn % 2 == 0 && $(this).text() == ''){
          gameMove("o")
        }//end of else conditional for td.click

      });//end of click function 
    };

    function gameMove(x_o){
      players.turn++
      self.text(x_o);
      self.off("click");
      board[$(this).attr('id')] = x_o;
      currentGameRef.update({turn: players.turn, board: board});
    };

    function update_board_turn(){
      board = game.board
      players.turn = game.turn
    };


  


    function scoreChecker(playerMove){
    return((board[0] == playerMove &&
        board[1] == playerMove &&
        board[2] == playerMove) ||

      (board[0] == playerMove &&
        board[3] == playerMove &&
        board[6] == playerMove) ||

      (board[0] == playerMove &&
        board[4] == playerMove &&
        board[8] == playerMove) ||

      (board[1] == playerMove &&
        board[4] == playerMove &&
        board[7] == playerMove) ||

      (board[2] == playerMove &&
        board[5] == playerMove &&
        board[8] == playerMove) ||

      (board[2] == playerMove &&
        board[4] == playerMove &&
        board[6] == playerMove) ||

      (board[3] == playerMove &&
        board[4] == playerMove &&
        board[5] == playerMove) ||

      (board[6] == playerMove &&
        board[7] == playerMove &&
        board[8] == playerMove))
       
    }
  }// end of initial if(players) statement

}); //end of document.ready




