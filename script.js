let users = [
  {
    username: "admin",
    email: "admin@mvinorian.site",
    password: "adminpassword",
  },
];

function redirect(url) {
  window.localStorage.setItem("users", JSON.stringify(users));
  window.location = url;
}

function handleLogin(event) {
  event.preventDefault();
  users = JSON.parse(window.localStorage.getItem("users"));
  const data = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  if (validateLogin(data) === true) {
    let message = "User not found, please signup first!";
    users.map((user) => {
      if (user.email === data.email && user.password === data.password) {
        message = `Welcome home ${user.username}!`;
      } else if (user.email === data.email) {
        message = "Wrong password!";
      }
    });
    alert(message);
  }
}

function handleSignup(event) {
  event.preventDefault();
  users = JSON.parse(window.localStorage.getItem("users"));
  const data = {
    username: event.target.username.value,
    email: event.target.email.value,
    password: event.target.password.value,
  };
  if (validateSignup(data) === true) {
    users.push(data);
    alert("Signup success, please login!");
  }
}

function validateLogin(data) {
  return validateEmail(data.email) && validatePassword(data.password);
}

function validateSignup(data) {
  return (
    validateUsername(data.username) &&
    validateEmail(data.email) &&
    validatePassword(data.password) &&
    (() => {
      if (users.find((user) => user.email === data.email)) {
        alert("Email already used!");
        return false;
      }
      return true;
    })()
  );
}

function validateUsername(username) {
  const reg_username = /^[A-Za-z0-9_]+$/;
  if (username === "") alert("Username is required!");
  else if (username.length < 4)
    alert("Username must be at least 4 characters!");
  else if (reg_username.test(username) === false)
    alert("Username must contain only characters, numbers, and underscores!");
  else if (users.find((user) => user.username === username))
    alert("Username already exist!");
  else return true;
}

function validateEmail(email) {
  const reg_email =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
  if (email === "") alert("Email is required!");
  else if (reg_email.test(email) === false) alert("Email is not valid!");
  else return true;
}

function validatePassword(password) {
  if (password === "") alert("Password is required!");
  else if (password.length < 8)
    alert("Password must be at least 8 characters!");
  else return true;
}
