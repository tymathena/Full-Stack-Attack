// ===============GAME LOGIC======================
// populate with find all



enemies = []

const renderModal = function () {
    //show modal with user and enemy
    $(".enemy-modal").modal();

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