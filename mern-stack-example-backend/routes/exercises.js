const express = require('express');
const router = express.Router();

let Exercise = require('../models/exercise.model');

router.route('/all').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/add').post((req, res) => {
    const objectModel = getInstance(req.body);

    let newExercise = new Exercise({
        username: objectModel.username,
        description: objectModel.description,
        duration: objectModel.duration,
        date: objectModel.date
    });

    newExercise.save()
        .then(() => res.json('Exercise salvado com sucesso!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error :' + err));
});

router.route('/remove/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deletado'))
        .catch(err => res.status(400).json('Error :' + err));
});

router.route('/update/:id').delete((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise atualizado com sucesso!'))
                .catch(err => res.status(400).json('Error : '+ err));
        })
        .catch(err => res.status(400).json('Error :' + err));
});


function getInstance(exercise) {
    return {
        username: exercise.username,
        description: exercise.description,
        duration: Number(exercise.duration),
        date: Date.parse(exercise.date)
    };
}

module.exports = router;