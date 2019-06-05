let currentUser;

function renderLogIn() {
    $(".text-center").empty();
    $(".login").empty()
    const logInForm =
        `<form class="row login">
        <div class="form-group col-12">
            <label for="email">Email address</label>
            <input type="text" class="form-control" id="email" placeholder="Enter User Name">
        </div>
        <div class="form-group col-12">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Enter Password!">
        </div>
    </form>
    <div class="incorrect-password"></div>
    <div class="text-center">
        <button type="submit" class="btn btn-primary col-12 login-submit" href="board.html">Login</button>
    </div>`

    $(".login").append(logInForm)
}

function tryLogInUser() {
    console.log("getUser")
    $.get(`/api/user/${$(`#email`).val()}`, function (data) {
        // check if we have a user
        if (data) {
            if (data.password === $(`#password`).val()) {
                console.log(data)

                // assign the user to the global variable
                currentUser = data;

                // move to the next screen
                $(".login").empty()
                renderClassCards()
            } else {
                console.log("password does not match")
                $(".incorrect-password").html(`<p style="color: red;">Incorrect Password. Please try again!</p>`)

            }
        } else {
            // create the user and assign to global variable
            const newUser = {
                name: $(`#email`).val(),
                password: $(`#password`).val(),
            }

            // add the user to the database
            $.post("/api/user", newUser).then(function (newData) {
                console.log("User Added!", newData)
                currentUser = newData;

                // move to the next screen
                $(".login").empty()
                renderClassCards()
            })
        }
    });
}

function renderClassCards() {
    $.get("/api/class", function (data) {
        const userClasses = data;
        $(".role-cards").empty()
        createClassCard(userClasses)
    })
}

function createClassCard(classes) {

    classes.forEach(classes => {

        const userClassCard =
            `<div class="col-lg-4 char-card">
                <div>
                    <div class="card-body">
                        <img class="select-user-${classes.id} char-image-select"id="char-image" data-id="${classes.id} "src="${classes.image}" alt="Product Image">
                    </div>
                    <br>
                    <h4 class="card-header" id="${classes.id}">
                    ${classes.role}
                    </h4>
                    <div class="form-group">
                        <form class="form-row">
                        <div class="stats-div">
                            <p class="hp char-stats" data-id="${classes.hp}">Health: ${classes.hp}</p>
                            <p class="ap char-stats" data-id="${classes.ap}">Attack: ${classes.ap}</p>
                            <p class="dp char-stats" data-id="${classes.dp}">Defense: ${classes.dp}</p>
                        </div>  
                            <p class="description char-description" data-id="${classes.description}">${classes.description}</p>
                          
                        </form>
                    </div>
                </div>
            </div>`
        $(".role-cards").append(userClassCard)

        $(`.select-user-${classes.id}`).on("click", function (e) {
            e.preventDefault()
            console.log('character selected', classes.id)
            startGame(classes.id)
        })
    })

    const roleCards = $(".role-cards");
    roleCards.on('mouseenter', '.char-image-select', enterButton);
    roleCards.on('mouseleave', '.char-image-select', leaveButton);

    function enterButton(e) {
        animateButton(e, 1.2, 800, 400)
    };

    function leaveButton(e) {
        animateButton(e, 1.0, 600, 300)
    };

    const animateButton = function (e, scale, duration, elasticity) {
        anime.remove(e.target);
        anime({
            targets: e.target,
            scale: scale,
            duration: duration,
            elasticity: elasticity
        });
    }
}


function startGame(classId) {
    console.log('starting game with user:', currentUser)
    $.ajax({
        method: "PUT",
        url: "/api/currentUser",
        data: {
            userId: currentUser.id,
            classId,
        }
    }).then(function (data) {
        if (data.status) {
            music.pause();
            console.log('navigating to board', data);
            window.location.href = '/board.html';
        } else {
            console.log('got an error back from the server', data);
        }
    })
}

// login animation test 


renderLogIn()
var context = new AudioContext();
const music = new Audio();
music.src = "./music/charTunes.mp3";

$("#un-mute").on("click", function () {
    if (music.paused) {


        context.resume().then(() => {
            music.play();
            console.log('Playback resumed successfully');
        })
    }
    else{
        context.resume().then(() => {
            music.pause();
            console.log('Playback resumed successfully');
        })
    }
});