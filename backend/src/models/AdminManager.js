const AbstractManager = require("./AbstractManager");

class AdminManager extends AbstractManager {
  constructor() {
    super({ table: "administrator" });
  }

  getAdminByMatricule(matricule) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE registration_number = ?`,
      [matricule]
    );
  }

  insert(admin) {
    return this.database.query(
      `insert into ${this.table} (registration_number, hashed_password, mail, firstname, lastname) values (?, ?, ?, ?, ?)`,
      [
        admin.registration_number,
        admin.hashedPassword,
        admin.mail,
        admin.firstname,
        admin.lastname,
      ]
    );
  }

  update(matricule, hashedPassword, id) {
    return this.database.query(
      `update ${this.table} set registration_number = ?, hashed_password = ? where id = ?`,
      [matricule, hashedPassword, id]
    );
  }
}

module.exports = AdminManager;
