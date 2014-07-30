$(document).on('ready page:load', function(){
  // FIREBASE
  // 1. Initialize the board -> New Game
  // 1a. Send initialized board to Firebase
  // var board = ["", "", "", "", "", "", "", "", ""]
  // 2. Someone makes a move (i.e. clicks on a square)
  // 3. Update the board on Firebase (Firebase.set())
  // 4. Update currentTurn on Firebase
  // 5. Check for a win

  if (players) { 

    var board = ["","","","","","","","",""];
    console.log(players.firebase_url);
    var currentGameRef = new Firebase(players.firebase_url);
    
    //if(current_user == inviter )
    currentGameRef.on('value', function(snapshot) {
      var game = snapshot.val();
      if(game.game_state === "game-started"){
        console.log("first function works") 
        setup();      
      }

    });



    // currentGameRef.on('child_added', function(snapshot) {
    //   var invite = snapshot.val();

    //   // If the two players are the players for this game
    //   // if (invite.invitee_id === players.player1 || 
    //   //   invite.invitor_id === players.player1 ||
    //   //   invite.invitee_id === players.player2 || 
    //   //   invite.invitor_id === players.player2) {
        
        
    //   // }
    // });

    

    // $('#message_input').keypress(function (ev) {
    //   if (ev.keyCode == 13) {
    //     var username = $('#username').val();
    //     var messageInput = $('#messageInput').val();
    //     currentGameRef.push({username: username, messageInput: messageInput});
    //     $('#messageInput').val('');
    //     $('chat_reminder').hide(); 
    //   }    
    // });

    // currentGameRef.on('child_added', function(snapshot) {
    //   var message = snapshot.val();
    //   displayChatMessage(message.username, message.messageInput); 

    // });

    // function displayChatMessage(username, messageInput) {
    //   $('<div/>').text(messageInput).prepend($('<em/>').text(username+': ')).appendTo($('#chat_box'));
    //   $('#chat_box')[0].scrollTop = $('#chat_box')[0].scrollHeight;
    //   $('#chat_reminder').hide();
    // };


    var x_or_o_turn = 1;
    var turn = 1;


    var xPlayerWins = 0;
    var oPlayerWins = 0;

    function setup(){
      console.log(currentGameRef.parent())
      $('#reset').hide();
      $('#cont_playing').hide();
      
      $('#init').click(function(){
        console.log("#init clicked -> New Game");
        currentGameRef.update({board: board, x_or_o_turn: x_or_o_turn, turn: turn})
        // if (x_or_o_turn % 2 != 0){
        //   $('#player_goes').text("X's turn");
        // } else {
        //   $('#player_goes').text("O's turn");
        // }
        
        // $('td').text('');
        // $(this).hide();
        // $(this).off('click');
      });
    };

    currentGameRef.on('child_changed',function(snapshot){
      var game = snapshot.val();
      updateBoard(game.board);
      console.log("child_added, click worked");
      console.log(game.board);          
    });




    function updateBoard(board) {
    $('td').each(function(index, td) {
      $(td).html(board[index]);
    });

      
        // this function was removed from global scope 
        // since it would return undefined since 
        // since currentGameRef's value was provided in a function and couldn't be seen from outside
        // and timing of when currentGameRef was seen




    function restart(){
    $('td').text('');
    $('#restart_message').text("game reset");
    play();
    }  


    function newGame(){
    turn = x_or_o_turn + 1
    $('td').text('');
    $('#player_goes').text('TEST');
    $('#restart_message').text(" has won!");
    $('#cont_playing').show();
    $('#reset').hide(); 
    $('#cont_playing').click(function(){
      $(this).hide();
      play();
    });   
    }  



    function play(){
    $('#reset').show();
    $('#player_goes').show();
    $('td').off('click');
    $('#reset').click(function(){
      turn = 1;
      restart();
    });

    //if ( "it's my turn" ) { "wire up click handler" } else { "turn off click handlers" }

    $("td").click(function(){   

      if(turn % 2 != 0 && $(this).text() == ''){
        turn++
        var currentTurn = turn;
        console.log('id ' + $(this).attr('id'));
        console.log('this is turn ' + turn);
        $(this).text("x");
        $(this).off("click");
        board[$(this).attr('id')] = 'x';
        var currentBoard = board;
        console.log(board);
        if(scoreChecker("x") == true){alert("X wins")};
        if(scoreChecker("o") == true){alert("O wins")};
        currentGameRef.set({'currentBoard': currentBoard, 'currentTurn': currentTurn});
        
          
      }//end of primary if conditional 
      else if(turn % 2 == 0 && $(this).text() == ''){
        turn++
        var currentTurn = turn;
        console.log('id ' + $(this).attr('id'));
        console.log('this is turn ' + turn);
        $(this).text("o");
        $(this).off("click");
        board[$(this).attr('id')] = 'o';
        var currentBoard = board;
        console.log(board);
        if(scoreChecker("x") == true){alert("X wins")};
        if(scoreChecker("o") == true){alert("O wins")};
        currentGameRef.set({'currentBoard': currentBoard, 'currentTurn': currentTurn});
          
      }//end of else conditional




    });//end of click function 


    currentGameRef.on('child_added', function(snapshot){
      var value = snapshot.val();

      switch ( snapshot.name() ) {
        case 'currentBoard':
          updateBoard(value);
          break;

        case 'currentTurn':
          updateTurn(value);
          break;
      }
    })


    }; // End of play()


    //myDataRef.push({tdID: tdID, tdMoveText: tdMoveText});


    function updateTurn (currentTurn) {
    turn = currentTurn;
    }

    function updateBoard(board) {
    $('td').each(function(index, td) {
      $(td).html(board[index] );
    });
    board = currentBoard;
    }

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
  }
}
});




