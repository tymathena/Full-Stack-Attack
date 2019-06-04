// ===============GAME LOGIC======================

let enemies = [];
let enemyId = 0;

let currentUser;
let currentEnemy;
let battleInProgress;

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

function renderUser() {
    console.log('render user', currentUser);

    const userCard = getEntityCard(currentUser);
    $(".user-card").html(userCard);
    $("#attack-button").html(`<img id="attack-pow" src="${currentUser.attackImage}"></img>`);
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

function renderEnemy() {
    console.log('renderEnemy', currentEnemy);

    const enemyCard = getEntityCard(currentEnemy);
    $(".enemy-card").html(enemyCard);
    $(".false").html("")
}

function getEntityCard(entity) {
    const percent = Math.floor((entity.hp * 100) / entity.maxHp);
    return (
        `<div class="card">
        <div>
            <h2 class="card-header" id="${entity.id}">
                ${entity.name}
            </h2>
            <div id="${entity.id}">
                ${entity.description}
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
                    <div class="${entity.isUser}">
                    <hr>
                    <button id="all-nighter-button" type="button" class="btn btn-danger">All Nighter</button>
                    <button id="sleep-button"type="button" class="btn btn-primary">Sleep In</button>
                    </div>
                </form>
            </div>
        </div>
    </div>`)
}

function renderEndOfRoundModal(endOfRoundMessage) {
    console.log("renderNedOfRoundMOdalFunction()")
    let redirectBackToLogin = false;
    let buttonText = 'Next Round';
    if (currentUser.lives <= 0) {
        buttonText = 'File for unemployment';
        redirectBackToLogin = true;
    } else if (currentUser.hp <= 0) {
        buttonText = 'CAFFEINE BOOST!';
    } else if (enemyId >= enemies.length) {
        buttonText = 'Get PAID!'
        redirectBackToLogin = true;
    }

    $(".hp").text(`Health: ${currentUser.hp}`)
    $(".ap").text(`Attack: ${currentUser.ap}`)
    $(".dp").text(`Defense: ${currentUser.dp}`)
    $(".lives").text(`Lives: ${currentUser.lives}`)
    $(".special").text(`Special moves: ${currentUser.special}`)
    $(".round-message").text(`${endOfRoundMessage}`)
    // $("#player-image").attr("src", currentUser.image); 
    $("#next-round").text(buttonText);
    $("#end-round").modal("toggle");

    if (redirectBackToLogin) {
        $("#next-round").on("click", function () {
            window.location.href = '/index.html';
        });
    }
}


//Battle Logic//

function battle() {
    useAbility(currentUser, currentEnemy);
    useAbility(currentEnemy, currentUser);
    checkStatus();
    renderUser();
    renderEnemy();
}

function useAbility(attacker, defender) {
    const atkSum = attacker.ap + (Math.floor(Math.random() * 20)) - defender.dp + (Math.floor(Math.random() * 20));
    if (atkSum > 0) {
        defender.hp = Math.max(0, defender.hp - atkSum);
        attackAnimation()
    }
}

function allNighter(attacker, defender) {

    const atkSum = (attacker.ap + 30 + (Math.floor(Math.random() * 20))*2) - defender.dp;
    if (attacker.special > 0) {
        attacker.special--
        defender.hp = Math.max(0, defender.hp - atkSum);
        checkStatus()
        renderUser()
        renderEnemy()
        useAbility(defender, attacker)
        //useAbility(defender, attacker)
        checkStatus()
        renderUser()
        renderEnemy()
    }
    else if (attacker.special == 0) {
        alert("you are out of special homie!")
    }

}

function sleepIn(player) {
    if (player.special > 0) {
        player.special--
        console.log(player)
        player.hp += Math.floor((player.maxHp * 0.30))
        if(player.hp > player.maxHp){
            player.hp = player.maxHp
        }
        //player.maxHp += Math.floor((player.maxHp * 0.25))
        //useAbility(currentEnemy, currentUser);
        renderUser()
    }
    else if(player.special == 0){
        alert("outta specials homie!")
    }
}

function nextEnemy() {
    const nextEnemyId = enemyId + 1;
    if (nextEnemyId < enemies.length) {
        enemyId = nextEnemyId;
        currentEnemy = enemies[enemyId];
        currentEnemy.maxHp = currentEnemy.hp;
        renderEndOfRoundModal("You defeated the enemy! Another approaches!")
    } else {
        enemyId = nextEnemyId;
        renderEndOfRoundModal("You Won! You now have a job!")

        // TODO update the UI and end the game
    }

    renderEnemy();
}

function checkStatus() {
    let stillFighting = true;
    if (currentUser.hp <= 0) {
        currentUser.lives -= 1
        if (currentUser.lives == 0) {
            console.log("Game Over");
            $("#player-image").attr("src", "/images/jacobSad.png")
            renderEndOfRoundModal("Game Over! You are unemployed!")

        } else {
            $("#player-image").attr("src", currentUser.image);
            renderEndOfRoundModal("You died! Get more coffee!")
            currentEnemy.hp = currentEnemy.maxHp;
            currentUser.hp = currentUser.maxHp;
        }
    } else if (currentEnemy.hp <= 0) {
        stillFighting = false;
        $("#player-image").attr("src", currentUser.image);
        levelUp();
        nextEnemy();
    }
    // return stillFighting;
}

function levelUp() {
    currentUser.ap += 1;
    currentUser.dp += 1;
    currentUser.hp += Math.floor((currentUser.maxHp * 0.30));
    currentUser.maxHp += 50;
}

function attackAnimation() {
    const animAttack = anime({
        targets: '#attack-button',
        translateX: [
            { value: 250, duration: 1000, delay: 500 },
            { value: 0, duration: 1000, delay: 500 }
        ],
        // translateY: [
        //   { value: -40, duration: 500 },
        //   { value: 40, duration: 500, delay: 1000 },
        //   { value: 0, duration: 500, delay: 1000 }
        // ],
        scaleX: [
            { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
            { value: 1, duration: 900 },
            { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
            { value: 1, duration: 900 }
        ],
        scaleY: [
            { value: [1.75, 1], duration: 500 },
            { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
            { value: 1, duration: 450 },
            { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
            { value: 1, duration: 450 }
        ],
        easing: 'easeOutElastic',
        loop: false,
        autoplay: false
    });
    animAttack.play();
}

loadCurrentUser()

// Event listeners:

$("#attack-button").on("click", function () {
    console.log("clicked the attack button!");
    battle();
    // attackAnimation();
})
$(document).on("click", "#sleep-button", function () {
    console.log("clicked the sleep button!");
    sleepIn(currentUser)
})
$(document).on("click", "#all-nighter-button", function () {
    console.log("clicked the all-nighter-button!");
    allNighter(currentUser, currentEnemy)
})



