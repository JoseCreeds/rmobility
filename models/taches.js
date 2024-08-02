const mongoose = require('mongoose');

const taches = mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  date_echeance: { type: Date, required: false },
  statut: { type: String, required: true },
  fichier: { type: String, required: true },
});

module.exports = mongoose.model('taches', taches);
