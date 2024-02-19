class pointage {
  constructor({ nomEmp, emailEmp }, idEmp, start_time, end_time) {
    this.employe = { nomEmp, emailEmp };
    this.idEmp = idEmp;

    this.start_time = start_time;
    this.end_time = end_time;
  }
}
module.exports = pointage;
