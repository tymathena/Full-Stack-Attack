// TODO display login/create

// TODO click handlers: assign role, click login, click create

// TODO display gameboard 

// TODO load player(ally, enemy)

// TODO load opponent

// TODO click handlers for game board: click attack, click bonus

// TODO combat -- math to handle attack, defend, update stats 

// TODO display win/lose

// varibles = player, enemy array, lives, commits 

//Start app, display character creation page. choose class, enter name password hit login or create. 
//Gameboard will be shown. Player and opponent will be loaded on the on the board. A modal will obscure 
//the gameboard and display the image and data of the opponent once the modal is closed the fight can start.
//click attack or bonus after one is click the enemy responds with attack(and defense) . fight is over if player is 0 and 
//restart to current enemy.If win then next enemy is loaded and modal shows with it. Every win on the round
//increases commits by 10. repeat rounds until final boss. After final boss display credits.   

$(document).ready(function () {

    renderLogIn();

    const renderLogIn = function (){
        
        $(".card-row").empty()
        const logInForm = `<form class="row login">
        <div class="form-group col-12">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter User Name">
        </div>
        <div class="form-group col-12">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Enter Password!">
        </div>
        <button type="submit" class="btn btn-primary col-12 login-submit">Log In</button>
        <button type="submit" class="btn btn-primary col-12 create-submit">Sign Up</button>
          </form>`

          $(".login-div").append(logInForm)
    }


    $("#create-submit").on("click", function () {
        
        
        
    });


    $(".login-submit").on("click", function() {

    });



});

// ===============GAME LOGIC======================
// popuate with find all


enemies = []

const renderModal = function () {
    //show modal with user and enemy
    $(".enemy-modal").modal();

}


const renderBattlePage = function (player, monster) {

    let gameBoard = `
    // write the html for gameboard here
    `

    
    $(".board").append(gameBoard)
    // show battle page including buttons, characters, and char stats

}






const playerAttack = function(Attacker, Defender){

    const atkSum = Attacker.ap + (Math.floor(Math.random() * 20)) -  Defender.dp + (Math.floor(Math.random() * 20));
    const remainingHP = Defender.hp - atkSum; 
    Defender.hp = remainingHP
    console.log(Defender.hp)

    return Defender.hp
  };


playerAttack({
    name: "Jacob",
    ap:  7,
    dp:  3,
    hp: 100
}, {
    name: "HTML",
    ap: 5,
    dp: 5,
    hp: 100
});