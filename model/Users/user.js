class users {
  constructor(
    name,
    last_name,
    email,
    password,
    role,
    date_naissance,
    is_activate,
    age,
    validation_code,
    image
  ) {
    this.name = name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.date_naissance = date_naissance;
    this.is_activate = is_activate;
    this.age = age;
    this.validation_code = validation_code;
    this.image = image;
  }
}
module.exports = users;
