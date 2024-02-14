class pointage {
  constructor({ nomEmp, emailEmp }, idEmp, start_time, end_time) {
    this.idEmp = idEmp;
    this.employe = { nomEmp, emailEmp };
    this.start_time = start_time;
    this.end_time = end_time;
  }
}
module.exports = pointage;
