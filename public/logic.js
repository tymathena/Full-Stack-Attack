<<<<<<< HEAD
=======
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
    getUserClass();
    
    

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

    function getUserClass() {
      $.get("/api/products", function (data) {
          const userClasses = data;
          $(".class-row").empty()
          createUserClassCard(userClasses)
      })
  }

    function createUserClassCard(classes) {
      for (let i = 0; i < classes.length; i++) {

          const userClassCard =
              `<div class="col-lg-4 card">
              <div>
                  <div class="card-header" id="${classes[i].id}">
                      ${classes[i].role}
                  </div>
                  <div class="card-body">
                  <img id="userclass-image" src="${classes[i].image}" alt="Product Image">
                      
                      </div>
                      <div class="form-group">
                          <form class="form-row">
                                  <label class="hp" data-id="${classes[i].hp}>${classes[i].hp}</label>
                                  <label class="ap" data-id="${classes[i].ap}>${classes[i].ap}</label>
                                  <label class="dp" data-id="${classes[i].dp}>${classes[i].dp}</label>
                                  <label class="description" data-id="${classes[i].description}>${classes[i].description}</label>
                                  <button type="button" class="btn btn-primary btn-defult col-sm-12 col-xs-12 select-user" data-id="${classes[i].id}">Select Character!</button>
                          </form>
                  </div>
              </div>
          </div>`
          $(".class-row").append(userClassCard);
      }
  }


    $("#create-submit").on("click", function () {
        
        
        
    });


    $(".login-submit").on("click", function() {

    });



});

>>>>>>> e72552a3544d0d3a23cc6dff0c1663d458755e6c
// ===============GAME LOGIC======================
// populate with find all



enemies = []

const renderModal = function () {
    const modal = `   
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title">Time for Battle!</h1>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="card" id="player-card">
                    <div class="card-content">
                        <h3 id="player-name">${user.name}</h3>
                        <img id="player-image" src="${user.class.image}" style="width:100%">
                    </div>
                    <div class="card-footer">
                        <p id="player-role">Role: ${user.class.role}</p>
                        <p id="player-des">Description: ${user.class.description}</p>
                        <p id="stats"> Heath: ${user.class.hp} Attack Power: ${user.class.ap} Defense:
                            ${user.class.dp}</p>
                    </div>
                </div>

                <div class="card" id="opp-card">
                    <div class="card-content">
                        <h3 id="opp-name">${opponent.name}</h3>
                        <img id="opp-image" src="${opponent.image}" style="width:100%">
                    </div>
                    <div class="card-footer">
                        <p id="opp-des">Description: ${opponent.description}</p>
                        <p id="opp-hp"> Health: ${opponent.hp}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" id="startOver" data-dismiss="modal">Fight!</button>
            </div>
        </div>
    </div>
</div>`
    $("#vsModal").modal();

}


const renderBattlePage = function (player, monster) {

    let gameBoard = `
    
    `

    
    $(".board").html(gameBoard)
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

const levelUp = function(Player){
    const rewards =
    player.ap + 1
    player.dp + 1
    player.commits + 10
    
}