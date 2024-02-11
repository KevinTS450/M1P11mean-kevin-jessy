class users {
  constructor(
    username,
    email,
    password,
    role,
    date_naissance,
    is_activate,
    age,
    validation_code
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.date_naissance = date_naissance;
    this.is_activate = is_activate;
    this.age = age;
    this.validation_code = validation_code;
  }
}
module.exports = users;
