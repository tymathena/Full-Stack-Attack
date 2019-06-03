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
    for (let i = 0; i < classes.length; i++) {
        const userClassCard =
            `<div class="col-lg-4 char-card">
                <div>
                    <div class="card-body">
                        <img class="select-user-${classes[i].id} char-image-select"id="char-image" data-id="${classes[i].id} "src="${classes[i].image}" alt="Product Image">
                    </div>
                    <br>
                    <h4 class="card-header" id="${classes[i].id}">
                    ${classes[i].role}
                    </h4>
                    <div class="form-group">
                        <form class="form-row">
                        <div class="stats-div">
                            <p class="hp char-stats" data-id="${classes[i].hp}">Health: ${classes[i].hp}</p>
                            <p class="ap char-stats" data-id="${classes[i].ap}">Attack: ${classes[i].ap}</p>
                            <p class="dp char-stats" data-id="${classes[i].dp}">Defense: ${classes[i].dp}</p>
                        </div>  
                            <p class="description char-description" data-id="${classes[i].description}">${classes[i].description}</p>
                          
                        </form>
                    </div>
                </div>
            </div>`
        $(".role-cards").append(userClassCard)
        $(`.select-user-${classes[i].id}`).on("click", function (e) {
            e.preventDefault()
            console.log('character selected', classes[i].id)
            startGame(classes[i].id)
        })


        
        var charImage = document.querySelector('.char-image-select');

        function animateButton(scale, duration, elasticity) {
            anime.remove(charImage);
            anime({
                targets: charImage,
                scale: scale,
                duration: duration,
                elasticity: elasticity
            });
        }

        charImage.addEventListener('mouseenter', enterButton, false);
        charImage.addEventListener('mouseleave', leaveButton, false);
        function enterButton() { animateButton(1.2, 800, 400) };
        function leaveButton() { animateButton(1.0, 600, 300) };


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
            console.log('navigating to board', data);
            window.location.href = '/board.html';
        } else {
            console.log('got an error back from the server', data);
        }
    })
}

// login animation test 







renderLogIn()

$(".login-submit").on("click", function () {
    console.log("click char select")
    tryLogInUser()
})
