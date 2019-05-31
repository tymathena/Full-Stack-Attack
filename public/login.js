
$(document).ready(function () {
    let id;
    renderLogIn()
    getClasses()


    $(".select-user").on("click", function(e) {
        e.preventDefault()
        setUserClass()
    })


    $(".login-submit").on("click", function(e) {
        e.preventDefault()
        getUser()
    })


    $(".create-submit").on("click", function (e) {
        e.preventDefault()
        addUser()  
    })


    
    
    const setUserClass = function() {
        id = $(this).attr("data-id")
    }

    const renderLogIn = function (){
        
        $(".login").empty()
        const logInForm = 
        `<form class="row login">
        <div class="form-group col-12">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter User Name">
        </div>
        <div class="form-group col-12">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Enter Password!">
        </div>
        <button type="submit" class="btn btn-primary col-12 login-submit">Log In</button>
        <button type="submit" class="btn btn-primary col-12 create-submit">Create User</button>
          </form>`

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
                                  <label class="hp" data-id="${classes[i].hp}>${classes[i].hp}</label>
                                  <label class="ap" data-id="${classes[i].ap}>${classes[i].ap}</label>
                                  <label class="dp" data-id="${classes[i].dp}>${classes[i].dp}</label>
                                  <label class="description" data-id="${classes[i].description}>${classes[i].description}</label>
                                  <button type="button" class="btn btn-primary btn-defult col-sm-12 col-xs-12 select-user" data-id="${classes[i].id}">Select Character!</button>
                          </form>
                  </div>
              </div>
          </div>`
          $(".class").append(userClassCard)
      }
  }
});
