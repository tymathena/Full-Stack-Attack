
$(document).ready(function () {

    let id;


    
    
    function setUserClass(id) {
        id = $(this).attr("data-id")
    }

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
        <div class="role-cards"> </div>
        <div class="text-center">
        <a type="submit" href="/board" class="btn btn-primary col-12 login-submit">Login</a>
        <button type="submit" class="btn btn-primary col-12 create-submit">Create User</button>
        </div>
          `

          $(".login").append(logInForm)
    }

    function addUser(id) {
        const newUser = {
            name: $(`#email`).val(),
            password: $(`#password`).val(),
            classId: id, 

        }
        $.post("/api/user", newUser).then(console.log("User Added!"))
    }

    function getUser() {
        console.log("getUser")
        $.get(`/api/user/${$(`#email`).val()}`, function (data) {
            if (data && data.password === $(`#password`).val()) {
                currentUser = data;
            } else {
                console.log("user not found")
            }
        })
    }


    function getClasses() {
      $.get("/api/class", function (data) {
          const userClasses = data;
          $(".class").empty()
          createClassCard(userClasses)
      })
  }

    function createClassCard(classes) {
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
                          <p class="hp" data-id="${classes[i].hp}">Health: ${classes[i].hp}</p>
                          <p class="ap" data-id="${classes[i].ap}">Attack: ${classes[i].ap}</p>
                          <p class="dp" data-id="${classes[i].dp}">Defense: ${classes[i].dp}</p>
                          <p class="description" data-id="${classes[i].description}">${classes[i].description}</p>
                          <button type="button" class="btn btn-warning btn-default select-user" data-id="${classes[i].id}">Select Character!</button>
                      </form>
                  </div>
              </div>
          </div>`
          $(".role-cards").append(userClassCard)
      }
  }

  renderLogIn()
  getClasses()


  $(".select-user").on("click", function(e) {
    e.preventDefault()
    console.log("hey")
    setUserClass(id)
})


$(".login-submit").on("click", function() {
    
    console.log("click char select")
    getUser()
})


$(".create-submit").on("click", function (e) {
    e.preventDefault()
    console.log("click char select")
    addUser()  
})


});
