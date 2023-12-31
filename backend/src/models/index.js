require("dotenv").config();

const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

const AdminManager = require("./AdminManager");

models.administrator = new AdminManager();
models.administrator.setDatabase(pool);

const PracticianManager = require("./PracticianManager");

models.practician = new PracticianManager();
models.practician.setDatabase(pool);

const PatientManager = require("./PatientManager");

models.patient = new PatientManager();
models.patient.setDatabase(pool);

const InterventionManager = require("./InterventionManager");

models.intervention = new InterventionManager();
models.intervention.setDatabase(pool);

const RessourceManager = require("./RessourceManager");

models.ressource = new RessourceManager();
models.ressource.setDatabase(pool);

const InterventionRessourceManager = require("./InterventionRessourceManager");

models.intervention_ressource = new InterventionRessourceManager();
models.intervention_ressource.setDatabase(pool);

const PatientInterventionRessourceManager = require("./PatientInterventionRessourceManager");

models.patient_intervention_ressource =
  new PatientInterventionRessourceManager();
models.patient_intervention_ressource.setDatabase(pool);

const InterventionPatientManager = require("./InterventionPatientManager");

models.intervention_patient = new InterventionPatientManager();
models.intervention_patient.setDatabase(pool);

const FormManager = require("./FormManager");

models.form = new FormManager();
models.form.setDatabase(pool);
// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
