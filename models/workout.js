const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// });

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type:Date,
    default:Date.now()
  },
  exercises: [
    {
      _id:{
        require:false
      },
      type: {
        type: String,
        enum:['cardio','resistance']
      },
      name: {
        type: String,
        trim: true,
        validate: /[a-z]/
      },
      duration: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      }
    }
  ]
});


WorkoutSchema.methods.pipeline = function () {
  return [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
  ];
}

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;