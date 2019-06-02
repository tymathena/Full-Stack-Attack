

// ===============GAME LOGIC======================
// populate with find all

let enemies = [];
let enemyId = 0;
let currentUser;

$("#attack-button").on("click", function() {
    console.log("clicked the attack button!");
})

function getEnemies() {
    $.get("api/opponent/", function (data) {
        console.log(data)
        if (data) {
            enemies = data;
            renderEnemy(enemyId);
        }
    })

}

function renderEnemy(enemyId) {
    console.log(enemies[enemyId]);
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
    </div>`;
    $("#enemyHP").attr('style', 'width:' + enemies[enemyId].hp + '%');
    $(".enemy-card").append(enemyCard);
}

function getCurrentUser() {
    id = 1
    $.get("api/currentUser/" + id, function (data) {
        console.log(data)
        if (data) {
            currentUser = data;
            renderUser();
        }
    })
}

function renderUser() {
    //console.log(currentUser.id)
    {
        const userCard =
            `<div class="card">
            <div>
                <div class="card-header" id="${currentUser.id}">
                    ${currentUser.name}
                </div>
                <div class="card-body">
                    <img id="userclass-image" src="${currentUser.image}" alt="player Image">
        
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
        renderModal(); // FIXME method signature does not match
    }
}




function renderModal(enemies, enemyId) {
    $("#player-name").html(currentUser.name);
    $("#player-image").html(`<img src="${currentUser.image}"`);
    $("#opp-name").html(enemies[enemyId].name);
    $("#player-image").html(`<img src="${enemies[enemyId].image}"`);
    $("#MyModal").modal('show');
}


//Battle Logic//

let enemyAttacked;


function Attack(Attacker, Defender) {
    if (Attacker == current) { // FIXME 'current' is not defined anywhere
        enemyAttacked = false;
    }
    const atkSum = currentUser.ap + (Math.floor(Math.random() * 20)) - Defender.dp + (Math.floor(Math.random() * 20));
    Defender.hp -= atkSum;

    battle(); // FIXME method signature does not match

};

function battle(opponent) {
    if (currentUser.hp <= 0) {
        currentUser.lives -= 1;
    } else if (currentUser.lives == 0) {
        (console.log("Game Over"))
    } else if (opponent.hp <= 0) {
        levelUp();
        console.log("You Win!")
    } else {
        if (!opponentAttacked) {
            setTimeout(() => {
                enemyAttacked = true;
                attack(opponent, currentUser);
            }, 7000);
        }
    }

}

function levelUp() {
     $.put("/api/currentUser"), function (req, res) {
         db.currentUser.update({
            ap: currentUser += 1,
            dp: currentUser += 1,
            hp: currentUser += 50,
            commits: currentUser += 10
         },
             req.body,
             {
                 where: {
                     id: req.body.id
                 }
            }).then(function (dbUser) {
                res.json(dbUser);
            });

    };

 }


getCurrentUser()
getEnemies()






// $("#attack").click(function (event) {
//     event.preventDefault();
//     Attack(currentUser, opponent)
// });
