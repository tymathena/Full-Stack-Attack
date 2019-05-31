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