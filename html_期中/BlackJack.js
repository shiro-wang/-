// set of player
var pokerImages = new Array(5); // array to store img elements
var player_poker_num = 0; // number of pokers player get currenttly
var player_point = new Array(5); // keep the point player get
var player_point_final = 0;
var player_chip = 2000;
var player_bet = 0;
var split_point = new Array(2);
var split_count = 0;
var split_mode = 0;

// set of banker
var banker_pokerImages = new Array(5);
var banker_poker_num = 0;
var banker_point = new Array(5);
var banker_point_fianl = 0;
var Banker_mode_normal = 0;
var Banker_mode_cheat = 1;
var banker_mode = Banker_mode_normal;

// history
var player_history = new Array(50);
var banker_history = new Array(50);
var player_history_result = new Array(50);
var banker_history_result = new Array(50);
var win_history = new Array(50);
var bet_history = new Array(50);
var chip_history = new Array(50);
var history_num = 0;

// set of mode
var Normal = 0;
var Surrender = 1;
var Cheat = 2;
var mode = Normal;

// get die img elements
function start()
{
   var hit_button = document.getElementById( "hit" );
   hit_button.addEventListener( "click", hit, false );
   var reset_button = document.getElementById( "reset" );
   reset_button.addEventListener( "click", reset, false);
   var stand_button = document.getElementById( "stand" );
   stand_button.addEventListener( "click", banker_time, false);
   var double_button = document.getElementById( "double" );
   double_button.addEventListener( "click", double, false);
   var split_button = document.getElementById( "split" );
   split_button.addEventListener( "click", split, false);
   var check_button = document.getElementById( "checkbet" );
   check_button.addEventListener( "click", checkbet, false );
   var surrender_button = document.getElementById( "surrender" );
   surrender_button.addEventListener( "click", surrender, false );
   var cheat_button = document.getElementById( "cheat" );
   cheat_button.addEventListener( "click", cheat, false );
   var banker_cheat_button = document.getElementById( "banker_cheat" );
   banker_cheat_button.addEventListener( "click", banker_cheat_change, false );
   var length = pokerImages.length;
   document.getElementById("chip").innerHTML = player_chip;
   document.getElementById("bet").innerHTML = player_bet;

   for ( var i = 0; i < length; ++i )
   {
      pokerImages[ i ] = document.getElementById( "poker" + (i + 1) );
      banker_pokerImages[ i ] = document.getElementById( "banker_poker" + (i + 1) );
   } // end for
   update_history();
   // checkbit();
   // dealing();
} // end function start

// banker_cheat
function banker_cheat_change()
{
   if(banker_mode == Banker_mode_cheat){
      banker_mode = Banker_mode_normal;
   }else{
      banker_mode = Banker_mode_cheat;
   }
   update_history();
}
// checkbit
function checkbet()
{
   switch(document.querySelector('input[name="bet"]:checked').value){
      case "50":
         player_bet = 50;
         break;
      case "100":
         player_bet = 100;
         break;
      case "200":
         player_bet = 200;
         break;
      case "500":
         player_bet = 500;
         break;
      default:
         return 0;
   }
   if (whether_enough() == false){
      player_bet = 0;
      return 0;
   }
   document.getElementById("bet").innerHTML = player_bet;
   document.getElementById("checkbet").disabled = true;
   document.getElementById("hit").disabled = false;
   document.getElementById("reset").disabled = true;
   document.getElementById("stand").disabled = false;
   document.getElementById("double").disabled = false;
   document.getElementById("surrender").disabled = false;
   document.getElementById("cheat").disabled = false;
   document.getElementById("split").disabled = true;
   dealing();
}

function cheat()
{
   mode = Cheat;
   finish_control();
   vic_defeat();
}

// check whether chips is enough
function whether_enough()
{
   if (player_bet > player_chip){
      return false;
   }
   return true;
}

// surrender
function surrender()
{
   mode = Surrender;
   player_bet /= 2;
   finish_control();
   vic_defeat();
}

// split
function split()
{
   split_mode = 1;
   document.getElementById("split").disabled = true;
   var split_bet = player_bet;
   document.getElementById("player_name").innerHTML = "Split " + (split_count+1)
   if (split_count < 2) 
   {      
      var length = pokerImages.length;
      for(var i = 0; i < length; ++i){
         resetImagePoint(i);
      }
      document.getElementById("hit").disabled = false;
      document.getElementById("reset").disabled = true;
      document.getElementById("stand").disabled = false;
      document.getElementById("double").disabled = false;
      document.getElementById("split").disabled = true;
      document.getElementById("surrender").disabled = false;
      document.getElementById("cheat").disabled = false;
      document.getElementById("checkbet").disabled = true;
      document.getElementById("total").innerHTML = "";
      document.getElementById("b_total").innerHTML = "";
      
      document.getElementById("bet").innerHTML = player_bet;

      player_poker_num = 0;
      var point = split_point[split_count];
      setImage( player_poker_num, point );
      check_point( point );
      player_poker_num += 1;
      player_bet = split_bet;
      player_point_final = Math.floor((point-1)/4) + 1;

      banker_poker_num = 0;
      point = Math.floor( 1 + Math.random() * 52 );
      banker_setImage( banker_poker_num, point );
      banker_check_point( point );
      banker_poker_num += 1;
      mode = Normal;
   }else{
      split_mode = 0;
      split_count = 0;
      reset();
   }
   split_count += 1;
}

// double
function double()
{
   var point;
   point = Math.floor( 1 + Math.random() * 52 );
   setImage( player_poker_num, point );
   check_point( point );
   player_poker_num += 1;
   
   banker_time();
}

// dealing
function dealing(){
   var point;  // point get
   for ( var i = 0; i < 2; i++){
      point = Math.floor( 1 + Math.random() * 52 );
      split_point[i] = point;
      setImage( player_poker_num, point ); 
      check_point( point );
      player_poker_num += 1;
   }
   point = Math.floor( 1 + Math.random() * 52 );
   banker_setImage( banker_poker_num, point );
   banker_check_point( point );
   banker_poker_num += 1;
   if (Math.floor((split_point[0]-1)/4) == Math.floor((split_point[1]-1)/4)){
      player_bet *= 2;
      if (whether_enough() == false){
         player_bet /= 2;
         return 0;
      }
      
      player_bet /= 2;
      document.getElementById("split").disabled = false;
   }
}

// reset game
function reset()
{
   document.getElementById("result").innerHTML = "Result: ";
   if (split_mode == 1){
      split();
   }else{
      document.getElementById("player_name").innerHTML = "玩家";
      var length = pokerImages.length;
      for(var i = 0; i < length; ++i){
         resetImagePoint(i);
      }
      document.getElementById("hit").disabled = true;
      document.getElementById("reset").disabled = true;
      document.getElementById("stand").disabled = true;
      document.getElementById("double").disabled = true;
      document.getElementById("split").disabled = true;
      document.getElementById("surrender").disabled = true;
      document.getElementById("cheat").disabled = true;
      document.getElementById("checkbet").disabled = false;
      document.getElementById("total").innerHTML = "";
      document.getElementById("b_total").innerHTML = "";

      player_bet = 0;
      document.getElementById("bet").innerHTML = player_bet;
      player_poker_num = 0;
      player_point_final = 0;
      banker_poker_num = 0;
      banker_point_fianl = 0;
      split_count = 0;
      mode = Normal;
   }
}

function finish_control(){
   document.getElementById("hit").disabled = true;
   document.getElementById("reset").disabled = false;
   document.getElementById("stand").disabled = true;
   document.getElementById("double").disabled = true;
   document.getElementById("split").disabled = true;
   document.getElementById("cheat").disabled = true;
   document.getElementById("surrender").disabled = true;
}

// stand to see banker's result
function banker_time()
{
   finish_control();
   if(banker_mode == Banker_mode_normal){
      while (banker_point_fianl < player_point_final && banker_point_fianl < 21 && banker_poker_num < 5){
         var point;
         point = Math.floor( 1 + Math.random() * 52 );
         banker_setImage( banker_poker_num, point ); // display appropriate die image
         banker_check_point( point );
         banker_poker_num += 1;
      }
   }else{
      var cheat_while = 1;
      while(cheat_while == 1){
         while (banker_point_fianl < player_point_final && banker_point_fianl < 21 && banker_poker_num < 5){
            var point;
            point = Math.floor( 1 + Math.random() * 52 );
            banker_setImage( banker_poker_num, point ); // display appropriate die image
            banker_check_point( point );
            banker_poker_num += 1;
         }
         if(banker_point_fianl <= 21){
            cheat_while = 0;
         }else{
            banker_poker_num -= 1;
            var final_point = banker_poker_point_get();
            banker_point_fianl = final_point;
         }
      }
   }
   
   vic_defeat();
}

// get new card
function hit()
{
   var point;  // point get

   point = Math.floor( 1 + Math.random() * 52 );
   setImage( player_poker_num, point ); // display appropriate die image
   check_point( point );
   player_poker_num += 1;
   if (player_point_final > 21){
      finish_control();
      vic_defeat();
   }
} // end function rollDice

// set image source for player's poker card
function setImage( pNumber, point )
{
   pokerImages[ pNumber ].setAttribute( "src", "/html_期中/poker_img/poker_" + point + ".jpg" );
   pokerImages[ pNumber ].setAttribute( "alt", "poker " + point  );
}

// reset image
function resetImagePoint( pNumber )
{
   pokerImages[ pNumber ].setAttribute( "src", "/html_期中/poker_img/poker_blank.jpg" );
   pokerImages[ pNumber ].setAttribute( "alt", "poker " + pNumber  );
   banker_pokerImages[ pNumber ].setAttribute( "src", "/html_期中/poker_img/poker_blank.jpg" );
   banker_pokerImages[ pNumber ].setAttribute( "alt", "poker " + pNumber  );
   player_point[pNumber] = 0;
   banker_point[pNumber] = 0;
}

// set image source for banker's poker card
function banker_setImage( pNumber, point )
{
   banker_pokerImages[ pNumber ].setAttribute( "src", "/html_期中/poker_img/poker_" + point + ".jpg" );
   banker_pokerImages[ pNumber ].setAttribute( "alt", "poker " + point  );
}

function check_point( point )
{
   real_point = Math.floor( (point-1)/4 + 1 );
   if ( real_point > 10){
      real_point = 10;
   }else if ( real_point==1 ){
      real_point = 11;
   }
   player_point [player_poker_num] = real_point;
   var final_point = poker_point_get();
   document.getElementById("total").innerHTML = final_point;
   player_point_final = final_point;
}

function banker_check_point( point )
{
   real_point = Math.floor( (point-1)/4 + 1 );
   if ( real_point > 10){
      real_point = 10;
   }else if ( real_point==1 ){
      real_point = 11;
   }
   banker_point [banker_poker_num] = real_point;
   var final_point = banker_poker_point_get();
   document.getElementById("b_total").innerHTML = final_point;
   banker_point_fianl = final_point;
}

function poker_point_get()
{
   var ace = false;
   var total_point = 0;
   for(var i=0; i < player_poker_num+1; ++i){
      total_point += player_point [i];
      if (player_point [i] == 11){
         ace = true;
      }
   }
   if (total_point <= 21){
      return total_point;
   }
   if (ace == true ){
      for(var i=0; i < player_poker_num+1; ++i){
         if (player_point [i] == 11){
            player_point [i] = 1;
         }
      }
      return poker_point_get();
   }else{
      return total_point;
   }
}

function banker_poker_point_get()
{
   var ace = false;
   var total_point = 0;
   for(var i=0; i < banker_poker_num+1; ++i){
      total_point += banker_point [i];
      if (banker_point [i] == 11){
         ace = true;
      }
   }
   if (total_point <= 21){
      return total_point;
   }
   if (ace == true ){
      for(var i=0; i < banker_poker_num+1; ++i){
         if (banker_point [i] == 11){
            banker_point [i] = 1;
         }
      }
      return poker_point_get();
   }else{
      return total_point;
   }
}

function vic_defeat()
{
   if (mode == Normal){
      var gameresult;
      var result = 0;
      if (player_point_final > 21){
      }else if (banker_point_fianl > 21){
         result = 1;
      }else if (player_point_final > banker_point_fianl){
         result = 1;
      }else if ( player_point_final == banker_point_fianl){
         result = 2;
      }
      switch(result){
         case 0:
            gameresult = "Defeat";
            break;
         case 1:
            gameresult = "Victory";
            break;
         case 2:
            gameresult = "Tie";
            break;
         default:
            break;
      }
   }else if (mode == Surrender){
      gameresult = "Defeat";
   }else if (mode == Cheat){
      gameresult = "Victory";
   }
   update_playerchip(gameresult);
   document.getElementById("result").innerHTML = "Result: "+ gameresult;
   player_history [history_num] = "";
   banker_history [history_num] = "";
   for (var i=0; i<player_poker_num; i++){
      player_history [history_num] += player_point[i] + " ";
   }
   for (var i=0; i<banker_poker_num; i++){
      banker_history [history_num] += banker_point[i] + " ";
   }
   player_history_result [ history_num ] = player_point_final;
   banker_history_result [ history_num ] = banker_point_fianl;
   win_history [ history_num ] = gameresult;
   bet_history [ history_num ] = player_bet;
   chip_history [ history_num ] = player_chip;
   history_num += 1;
   update_history();
}

// deal with player chips
function update_playerchip(gameresult){
   if (gameresult == "Victory"){
      player_chip += player_bet;
   }else if (gameresult == "Defeat"){
      player_chip -= player_bet;
   }
   document.getElementById("chip").innerHTML = player_chip;
}

// update frequency table in the page
function update_history()
{
   var results = "<table class=\"styled-table\";>" +
      "<thead><th>Round</th><th>Identity</th><th style=\"width: 200px;\">Process</th><th>Total</th><th>Result</th><th>Bet</th><th>Player's chip</th></thead><tbody>";

   // create table rows for player
   for ( var i = 0; i < history_num; i++ )
   {
      results += "<tr><td rowspan=\"2\">"+ (i+1) + "</td><td>Player</td><td>" + player_history[i] + "</td><td>" + player_point_final + 
         "</td><td rowspan=\"2\">" + win_history[i] + "</td><td rowspan=\"2\">" + bet_history[i] + "</td><td rowspan=\"2\">" + chip_history[i];
      results += "<tr><td>Banker</td><td>" + banker_history[i] + "</td><td>" + banker_point_fianl + "</td>";
   } // end for

   results += "</tbody></table>";
   document.getElementById( "historytable" ).innerHTML = results;
   if (banker_mode == Banker_mode_normal){
      document.getElementById("banker_cheat_describe").innerHTML = "Banker Mode: Noraml";
   }else{
      document.getElementById("banker_cheat_describe").innerHTML = "Banker Mode: Cheat";
   }
   
} // end function updatehistorytable


window.addEventListener( "load", start, false );