
function signUp() {

    let dict = {}

    // Retrieve all previously registered users
    let saved = JSON.parse(localStorage.getItem("myDetails"))

    let users = Array.isArray(saved) ? saved : (saved ? [saved] : [])

    let username = document.getElementById("userbox")
    let email = document.getElementById("user_email")
    let password = document.getElementById("user_password")
    let confirmPassword = document.getElementById("user_cfrm_password")
    let color = document.getElementById("passwordMessage")

    // Check duplicate username or email
    let existing = users.some(user =>
        user.username === username.value ||
        user.email === email.value
    )

    if (existing) {
        color.textContent = "Username or Email already exists"
        color.style.color = "red"
        return
    }

    // Store current user's details in dictionary
    dict["username"] = username.value
    dict["email"] = email.value
    dict["password"] = password.value
    dict["confirm_password"] = confirmPassword.value

    console.log(dict)

    let special = /[!~#$%^&*()_+{}<>@]/   

    // Password validation
    if (dict.password === "" || dict.confirm_password === "") {
        color.textContent = "Password fields cannot be empty"
        color.style.color = "red"
    }

    else if (dict.password.length < 8) {
        color.textContent = "Password must be at least 8 characters"
        color.style.color = "red"
    }

    else if (!special.test(dict.password)) {
        color.textContent = "Add any special character"
        color.style.color = "red"
    }

    else if (dict.password !== dict.confirm_password) {
        color.textContent = "Incorrect Password"
        color.style.color = "red"
    }

    else {
        // Add new user to the array
        users.push(dict)

        // Store the updated array
        localStorage.setItem("myDetails", JSON.stringify(users))

        color.textContent = "Account Created Successfully"
        color.style.color = "green"
    }
}


function logIn() {

    let login_email = document.getElementById("login_button")
    let login_password = document.getElementById("password_button")
    let message = document.getElementById("displayMessage")

    let a = login_email.value
    let b = login_password.value

    // Retrieve all registered users
    let stored = JSON.parse(localStorage.getItem("myDetails")) || []

    // Find matching user
    let user = stored.find(user =>
        (user.username === a || user.email === a) &&
        user.password === b
    )

    if (user) {
        message.textContent = "Logged In Successfully"
        message.style.color = "green"
    }

    else {
        message.textContent = "Invalid Credentials"
        message.style.color = "red"
    }
}


function show_password() {

    let show_credentials = document.getElementById("showpassword")
    let pword = document.getElementById("password_button")

    if (show_credentials.checked) {
        pword.type = "text"
    }

    else {
        pword.type = "password"
    }
}
