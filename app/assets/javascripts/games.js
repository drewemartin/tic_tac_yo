$(document).on('ready page:load', function(){
  
  $('#init').off('click');


  if (players){ 
    console.log(players.firebase_url);
    var inviteRef = new Firebase(players.firebase_url)
    var currentGameRef = new Firebase(players.firebase_url + "/game");
    var currentChatRef = new Firebase(players.firebase_url + "/chat");
    
    inviteRef.on('child_changed', function(snapshot) {
      var game = snapshot.val();
      if(game.game_state === "game_started"){
        $('#init').on("click");
        $('reset').hide();
      }
    });

    currentGameRef.child('start_game').on('value', function(snapshot) {
        var start_game = snapshot.val();

        if ( start_game !== null && start_game === 1 ) {
          console.log("start_game fired");
          $('td').text('');
          $("#init").hide();
          $('#reset').show();
          $('#reset').off('click');
          set_start_game_to_zero()
          play();
        }  

        else if ( start_game !== null && start_game === 2 ) {
          $('td').text('');
          $("#game-result").hide();
          $('#reset').show();
          $('#reset').off('click');
          set_start_game_to_zero();
          play();
        };    
    });

    function set_start_game_to_zero(){
      currentGameRef.update({start_game: 0})
    }

      
      $('#init').click(function(){
        currentGameRef.set({
          board: players.board, 
          x_or_o_turn: players.x_or_o_turn, 
          turn: players.turn, 
          start_game: 1,
          redo: players.redo,
          start_game_button: false,
          game_tester: "Drew",
          win: players.win,
          tie: "no_tie"
        });


      });

      $('#game-result').click(function(){
        currentGameRef.set({
          board: players.newBoard, 
          x_or_o_turn: players.x_or_o_turn, 
          turn: players.turn, 
          start_game: 2,
          redo: players.redo,
          start_game_button: false,
          game_tester: "Drew",
          win: "unknown",
          tie: "no_tie"
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
          switch ( snapshot.name() ) {
            case 'board':
              updateBoard(game);
              break;

            case 'turn':
              updateTurn(game);
              break;

            case 'win':
              updateWin(game);
              break;

            case 'tie':
              updateTie(game);
              break;
        }     

      });

    function play(){
      console.log("Play function -> fired");
      $("td").on("click");
      $('#reset').on('click');

      $('#reset').click(function(){
        currentGameRef.set({
          board: players.newBoard, 
          x_or_o_turn: players.x_or_o_turn, 
          turn: players.x_or_o_turn, 
          start_game: 2,
          redo: players.redo,
          start_game_button: false,
          game_tester: "Drew",
          win: "unknown",
          tie: "no_tie"
        });
      })

      $("td").click(function(){
        var self = $(this)   

        if(players.turn % 2 !== 0 && $(this).text() === ''){
          gameMove("x",self);
          console.log("x socre is:" + scoreChecker('x', players.board));
          self.off('click');
        }//end of primary if conditional for td.click
        
        else if(players.turn % 2 === 0 && $(this).text() === ''){
          console.log("o socre is:" + scoreChecker('o', players.board));
          gameMove("o",self);
          self.off('click');
        }//end of else conditional for td.click

      });//end of click function 
    };

    function gameMove(x_o, td){
      players.turn++;
      // td.text(x_o);
      //td.addclass("click");
      players.board[td.attr('id')] = x_o;
      console.log("user click :" + players.board[td.attr('id')] + " and its id is now:" + x_o);
      currentGameRef.update({turn: players.turn, board: players.board, win: scoreChecker(x_o, players.board), tie: tieChecker(x_o, players.board)});
    };

  

    function updateBoard(board) {
      // alert("updateBoard")
      players.board = board;
      $('td').each(function(index) {
        $(this).text(board[index]);

        if (board[index] === 'x') {
          $(this).html("<span class='animated bounceIn'><i class='fa fa-heart'></i>" + "</span>")
          $(this).off("click");
        } else if(board[index] === 'o')  {
          $(this).html("<span class='animated bounceIn'><i class='fa fa-heart-o'></i>" + "</span>")
          $(this).off("click");
        }
      });
      
    }

    function updateTurn (turn) {
      players.turn = turn;
    }

    function updateWin (win) {
      if (win !==  "unknown")
      {
        $("#game-result").html("<a href='#'>"+ win + "'s click here to play again" +"</a>");
        $('#game-result').show();
        $('#reset').off('click');
        $('td').off('click');
        players.win = "unknown";
        players.turn = parseInt(players.x_or_o_turn) + 1
        players.x_or_o_turn = parseInt(players.x_or_o_turn) + 1
        currentGameRef.child('start_game').remove();
        currentGameRef.child('win').remove();
      }
      
    }

    function updateTie (tie) {
      console.log('this is the update tie callback')
      if (tie !==  "no_tie")
      {
        $("#game-result").html("<a href='#'>"+ win + "'s click here to play again" +"</a>");
        $('#game-result').show();
        $('#reset').off('click');
        $('td').off('click');
        players.tie = "unknown";
        players.turn = parseInt(players.x_or_o_turn) + 1
        players.x_or_o_turn = parseInt(players.x_or_o_turn) + 1
        currentGameRef.child('start_game').remove();
        currentGameRef.child('win').remove();
      }
      
    }


    function tieChecker(playerMove,board){
      console.log("tieChecker");
      if((board[0] === playerMove &&
        board[1] === playerMove &&
        board[5] === playerMove &&
        board[6] === playerMove &&
        board[7] === playerMove) ||
        (board[1] === playerMove &&
        board[3] === playerMove &&
        board[5] === playerMove &&
        board[6] === playerMove &&
        board[8] === playerMove) ||
        (board[1] === playerMove &&
        board[2] === playerMove &&
        board[3] === playerMove &&
        board[7] === playerMove &&
        board[8] === playerMove) ||
        (board[0] === playerMove &&
        board[2] === playerMove &&
        board[3] === playerMove &&
        board[5] === playerMove &&
        board[7] === playerMove) || 
        (board[0] === playerMove &&
        board[2] === playerMove &&
        board[5] === playerMove &&
        board[6] === playerMove &&
        board[7] === playerMove) ||
        (board[0] === playerMove &&
        board[1] === playerMove &&
        board[5] === playerMove &&
        board[6] === playerMove &&
        board[8] === playerMove) ||
        (board[1] === playerMove &&
        board[2] === playerMove &&
        board[3] === playerMove &&
        board[6] === playerMove &&
        board[8] === playerMove) ||
        (board[0] === playerMove &&
        board[2] === playerMove &&
        board[3] === playerMove &&
        board[7] === playerMove &&
        board[8] === playerMove)
      )
        {
          return "Tie!";
        }
        else{
          return "no_tie";
        };
    };


    function scoreChecker(playerMove,board){
      console.log(board);
      if ((board[0] === playerMove &&
        board[1] === playerMove &&
        board[2] === playerMove) ||

      (board[0] === playerMove &&
        board[3] === playerMove &&
        board[6] === playerMove) ||

      (board[0] === playerMove &&
        board[4] === playerMove &&
        board[8] === playerMove) ||

      (board[1] === playerMove &&
        board[4] === playerMove &&
        board[7] === playerMove) ||

      (board[2] === playerMove &&
        board[5] === playerMove &&
        board[8] === playerMove) ||

      (board[2] === playerMove &&
        board[4] === playerMove &&
        board[6] === playerMove) ||

      (board[3] === playerMove &&
        board[4] === playerMove &&
        board[5] === playerMove) ||

      (board[6] === playerMove &&
        board[7] === playerMove &&
        board[8] === playerMove))
      {
        return playerMove.toUpperCase()+ " Win";
      }
      else
      {
        return "unknown";
      }
      }  



      
      $('#messageInput').keypress(function (event){
        if(event.which == 13 && $('#messageInput').val() !== ''){
          var text = $('#messageInput').val();
          var name = current_user.username;
          currentChatRef.push({text: text, name: name});
          $('#messageInput').val("");
        }
      });

      currentChatRef.on('child_added', function(snapshot){
        chat = snapshot.val()
        renderMessages(chat.text, chat.name);
      });

      function renderMessages(text, name){
        $('<div/>').text(text).prepend($('<em/>').html("&nbsp;" + name + ':&nbsp;&nbsp;')).appendTo($('#box'));
        $('#box').scrollTop($('#box')[0].scrollHeight);
      }





    }// end of initial if(players) statement

  

}); //end of document.ready




