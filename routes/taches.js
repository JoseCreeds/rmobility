const express = require('express');
const router = express.Router();
// const loanCtrl = require('../controllers/loan');
const tachesCtrl = require('../controllers/taches');

router.post('/tache', tachesCtrl.createTache);
router.get('/tache', tachesCtrl.getTaches);
router.get('/tache/:id', tachesCtrl.getTache);
router.put('/tache/:id', tachesCtrl.updateTache);
router.delete('/tache/:id', tachesCtrl.deleteTache);

module.exports = router;
