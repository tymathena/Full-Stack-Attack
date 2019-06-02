// ===============GAME LOGIC======================

let enemies = [];
let enemyId = 0;

let currentUser;
let currentEnemy;

function loadCurrentUser() {
    $.get("api/currentUser", function (data) {
        console.log('retrieved the current user data:', data)
        if (data) {
            currentUser = data;
            currentUser.maxHp = currentUser.hp;

            renderUser();
            loadEnemies();
        }
    })
}

function loadEnemies() {
    $.get("api/opponent/", function (data) {
        console.log('retrieved the enemy list', data)
        if (data) {
            enemies = data;
            currentEnemy = enemies[enemyId];
            currentEnemy.maxHp = currentEnemy.hp;

            renderEnemy();
        }
    })
}


function renderUser() {
    console.log('render user', currentUser);

    const userCard = getEntityCard(currentUser);
    $(".user-card").html(userCard);
    $("#attack-button").html(`<img src="${currentUser.attackImage}"></img>`);
}

function renderEnemy() {
    console.log('renderEnemy', currentEnemy);

    const enemyCard = getEntityCard(currentEnemy);
    $(".enemy-card").html(enemyCard);
}

function getEntityCard(entity) {
    const alive = entity.hp > 0;
    // TODO render differently if the entity is not alive

    const percent = Math.floor((entity.hp * 100) / entity.maxHp);
    return (
        `<div class="card">
        <div>
            <div class="card-header" id="${entity.id}">
                ${entity.name}
            </div>
            <div class="card-body">
                <img id="userclass-image" src="${entity.image}" alt="Product Image">
            </div>
            <div class="form-group">
                <form class="form-row">
                    <p class="hp">Health: ${entity.hp}</p>
                    <p class="ap">Attack: ${entity.ap}</p>
                    <p class="dp">Defense: ${entity.dp}</p>
                    <div class="progress-bar" role="progressbar" style="width: ${percent}%;">${percent}%</div>
                </form>
            </div>
        </div>
    </div>`);
}

$(document).on("click", "#next-round", function () {
    $("#end-round").modal("hide")
    nextEnemy()
})

function renderEndOfRoundModal() {
    console.log("renderNedOfRoundMOdalFunction()")
    $(".hp").text(`Health: ${currentUser.hp}`)
    $(".ap").text(`Attack: ${currentUser.ap}`)
    $(".dp").text(`Defense: ${currentUser.dp}`)
    $(".round-message").text(`${endOfRoundMessage}`)
    $("#player-image").attr("src", currentUser.image); 
    $("#end-round").modal("show");
}


//Battle Logic//

let endOfRoundMessage = ""

function battle() {
    if (currentUser.hp > 0 && currentEnemy.hp > 0) {
        useAbility(currentUser, currentEnemy);
        useAbility(currentEnemy, currentUser);
        checkStatus();
        renderUser();
        renderEnemy();
    }
};

function useAbility(attacker, defender) {
    const atkSum = attacker.ap + (Math.floor(Math.random() * 20)) - defender.dp + (Math.floor(Math.random() * 20));
    if (atkSum > 0) {
        defender.hp = Math.max(0, defender.hp - atkSum);
    }
}

function nextEnemy() {
    const nextEnemyId = enemyId + 1;
    if (nextEnemyId < enemies.length) {
        enemyId = nextEnemyId;
        currentEnemy = enemies[enemyId];
        currentEnemy.maxHp = currentEnemy.hp;
    } else {
        console.log("You Win!")

        // TODO update the UI and end the game
    }

    renderEnemy();
}

function checkStatus() {
    if (currentUser.hp <= 0) {
        currentUser.lives -= 1;
    } else if (currentUser.lives == 0) {
        console.log("Game Over");
        endOfRoundMessage = "Game Over!"
        renderEndOfRoundModal(endOfRoundMessage)

        // TODO update the UI and end the game

    } else if (currentEnemy.hp <= 0) {
        levelUp();
        // setTimeout(nextEnemy, 1000);
        endOfRoundMessage = "You Won! Click the button to move on to the next round!"
        renderEndOfRoundModal(endOfRoundMessage)
    }
}

function levelUp() {
    currentUser.ap += 1;
    currentUser.dp += 1;
    currentUser.hp += 50;
    currentUser.maxHp += 50;

    // TODO the user beat someone, do we increase the commits now 
    // or only if they beat the whole game? 
    // this needs an api route to work on api-routes.js

    // $.ajax({
    //     method: "PUT",
    //     url: "/api/levelUp/" + currentUser.id,
    //     data: {
    //         currentUser,
    //     }
    // }).then(function (data) {
    //     if (data.status) {
    //         console.log('navigating to board', data);
    //         window.location.href = '/board.html';
    //     } else {
    //         console.log('got an error back from the server', data);
    //     }
    // })
}

$("#attack-button").on("click", function () {
    console.log("clicked the attack button!");
    battle();
})



loadCurrentUser()
