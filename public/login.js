
$(document).ready(function () {

    let id;

    $(".select-user").on("click", function(e) {
        e.preventDefault()
        console.log("click char select")
        setUserClass()
    })


    $(".login-submit").on("click", function(e) {
        e.preventDefault()
        console.log("click char select")
        getUser()
    })


    $(".create-submit").on("click", function (e) {
        e.preventDefault()
        console.log("click char select")
        addUser()  
    })


    
    
    const setUserClass = function() {
        id = $(this).attr("data-id")
    }

    const renderLogIn = function (){
        $(".text-center").empty();
        $(".login").empty()
        const logInForm = 
        `<form class="row login">
        <div class="form-group col-12">
          <label for="email">Email address</label>
          <input type="text" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter User Name">
        </div>
        <div class="form-group col-12">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Enter Password!">
          </div>
          </form>
        <div class="role-cards"> </div>
        <button type="submit" class="btn btn-primary col-12 login-submit">Log In</button>
        <button type="submit" class="btn btn-primary col-12 create-submit">Create User</button>
          `

          $(".login").append(logInForm)
    }

    function addUser() {
        const newUser = {
            name: $(`.name[data-id="data-name"]`).val(),
            password: $(`.classId[data-id="data-password"]`).val(),
            classId: $(`.classId[data-id="data-id"]`).val(), 

        }
        $.post("/api/user", newUser).then(console.log("User Added!"))
    }

    function getUser() {
        $.get("/api/user", function (data) {
            const currentUser = data;
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
                          <label class="hp" data-id="${classes[i].hp}">"${classes[i].hp}"</label>
                          <label class="ap" data-id="${classes[i].ap}">"${classes[i].ap}"</label>
                          <label class="dp" data-id="${classes[i].dp}">"${classes[i].dp}"</label>
                          <label class="description" data-id="${classes[i].description}">"${classes[i].description}"</label>
                          <button type="button" class="btn btn-primary btn-default select-user" data-id="${classes[i].id}">Select Character!</button>
                      </form>
                  </div>
              </div>
          </div>`
          $(".role-cards").append(userClassCard)
      }
  }
  renderLogIn()
  getClasses()
});
