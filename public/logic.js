

// ===============GAME LOGIC======================
// populate with find all

let enemies = []
let enemyId = 0

function getEnemies() {
    $.get("api/opponent/", function (data) {
        enemies = data;
        console.log(enemies)
        renderEnemy(enemies, enemyId)
    })

}

function renderEnemy(enemies, enemyId) {
    console.log(enemies[enemyId])
    {
        const enemyCard =
            `<div class="card">
            <div>
                <div class="card-header" id="${enemies[enemyId].id}">
                    ${enemies[enemyId].name}
                </div>
                <div class="card-body">
                    <img id="userclass-image" src="${enemies[enemyId].image}" alt="Product Image">
        
                </div>
                <div class="form-group">
                    <form class="form-row">
                        <p class="hp" data-id="${enemies[enemyId].hp}">Health: ${enemies[enemyId].hp}</p>
                        <p class="ap" data-id="${enemies[enemyId].ap}">Attack: ${enemies[enemyId].ap}</p>
                        <p class="dp" data-id="${enemies[enemyId].dp}">Defense: ${enemies[enemyId].dp}</p>
                        <div id="enemyHP" class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="25"
                                    aria-valuemin="0" aria-valuemax="100">100%</div>
                    </form>
                </div>
            </div>
        </div>`
        $("#enemyHP").attr('style', 'width:' + enemies[enemyId].hp + '%')
        $(".enemy-card").append(enemyCard)
    }
}



function renderUser(currentUser) {
    console.log(currentUser.id)
    {
        const userCard =
            `<div class="card">
            <div>
                <div class="card-header" id="${currentUser.id}">
                    ${currentUser.name}
                </div>
                <div class="card-body">
                    <img id="userclass-image" src="${currentUser.image}" alt="Product Image">
        
                </div>
                <div class="form-group">
                    <form class="form-row">
                        <p class="hp" data-id="${currentUser.hp}">Health: ${currentUser.hp}</p>
                        <p class="ap" data-id="${currentUser.ap}">Attack: ${currentUser.ap}</p>
                        <p class="dp" data-id="${currentUser.dp}">Defense: ${currentUser.dp}</p>
                        <div id="userHP" class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="25"
                                    aria-valuemin="0" aria-valuemax="100">100%</div>
                    </form>
                </div>
            </div>
        </div>`
        $("#userHP").attr('style', 'width:' + currentUser.hp + '%')
        $(".user-card").append(userCard)
    }
}

function getCurrentUser() {
    id = 1
    $.get("api/currentUser/" + id, function (data) {
        currentUser = data;
        console.log(currentUser)
        renderUser(currentUser)
    })
}


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
        // updateUser(Player, rewards);

    }

}

// const updateUser = function (Player, rewards) {
//     app.put("/api/user:id", function (req, res) {
//         db.User.update(
//             req.body,
//             {
//                 where: {
//                     id: req.body.id
//                 }
//             }).then(function (dbUser) {
//                 res.json(dbUser);
//             });

//     });

// }

getCurrentUser();
getEnemies();


$("#attack").click(function (event) {
    event.preventDefault();
    Attack(Player, Monster)
});
