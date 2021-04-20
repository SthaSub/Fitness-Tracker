const router = require('express').Router();
const db = require('../models');
const pipe = db.Workout();

router.get('/workouts', async (req, res)=>{
    try {
        const getWorkoutData = await db.Workout.aggregate(pipe.pipeline());
        res.status(200).json(getWorkoutData);
    } catch (error) {
        res.json(error);
    }
});

router.get('/workouts/range', async (req, res)=>{
    try {
        const rangeData = await db.Workout.aggregate(pipe.pipeline());
        res.status(200).json(rangeData);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/workouts', async (req, res)=>{
    try {
        const postData = await db.Workout.create(req.body);
        res.status(200).json(postData);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/workouts/:id', async (req, res)=>{
    try {
        const updateWorkoutData =  await db.Workout.findByIdAndUpdate(
            req.params.id,{
              $push:{
                exercises:req.body
              },  
            },{
                new:true
            }
        );
        res.status(200).json(updateWorkoutData);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

module.exports = router;