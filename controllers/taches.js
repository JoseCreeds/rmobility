const Taches = require('../models/taches');

exports.createTache = async (req, res, next) => {
  try {
    const taches = new Taches({
      titre: req.body.titre,
      description: req.body.description,
      // date_echeance: req.body.date_echeance,
      date_echeance: new Date(),
      statut: req.body.statut,
      fichier: req.body.fichier,
    });
    await taches.save();

    res.status(201).json({ message: 'Taches created !' });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error });
  }
};

exports.getTaches = async (req, res, next) => {
  Taches.find({})
    .then((taches) => res.status(200).json(taches))
    .catch((error) => res.status(400).json({ error }));
};

exports.getTache = async (req, res, next) => {
  try {
    const getTaches = await Taches.findOne({ id: req.body.id });
    if (!getTaches) {
      res.status(404).json({ error: 'Taches not found' });
    }
    return res.status(200).json(getTaches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTache = async (req, res, next) => {
  const tacheObject = req.file
    ? {
        ...JSON.parse(req.body.taches),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete tacheObject._id;
  Taches.findOne({ id: req.body.tacheId })
    .then((taches) => {
      // if (taches._id != req.body.id) {
      //   res.status(401).json({ message: 'Not authorized !' });
      // } else {
      Taches.updateOne(
        { id: req.body.id },
        { ...tacheObject, _id: req.body.id }
      )
        .then(() => res.status(200).json({ message: 'Tache modified !' }))
        .catch((error) => res.status(401).json({ error }));
      // }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteTache = (req, res, next) => {
  Taches.deleteOne({ id: req.body.id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Taches deleted' });
      } else {
        res.status(404).json({ message: 'Taches not found' });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
