

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

//Battle Logic//

let enemyAttacked;


const Attack = function (Player, Defender) {
    if (Player == User.Class) {
        enemyAttacked = false;
    }
    const atkSum = Player.ap + (Math.floor(Math.random() * 20)) - Defender.dp + (Math.floor(Math.random() * 20));
    const remainingHP = Defender.hp - atkSum;
    def.hp -= atkSum;

};

const battle = function (Player, Monster) {

    if (Player.hp <= 0) {
        Player.Lives -= 1;
    } else if (Player.Lives == 0) {
        (console.log("Game Over"))
    } else if (Monster.hp <= 0) {
        levelUp(Player);
    } else {
        if (!monsterAttacked) {
            setTimeout(() => {
                enemyAttacked = true;
                attack(Player, Monster);
            }, 7000);
        }
    }

    const levelUp = function (Player) {
        const rewards =
            player.ap += 1
        player.dp += 1
        player.commits += 10
        player.health += 50;
        updateUser(Player, rewards);

    }

}

const updateUser = function (Player, rewards) {
    app.put("/api/user:id", function (req, res) {
        db.fsadb.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbUser) {
                res.json(dbUser);
            });

    });

}

$("#attack").click(function (event) {
    event.preventDefault();
    Attack(Player, Monster)
});