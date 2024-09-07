import mongoose from 'mongoose';

const EXERCISE_CLASS = "Exercise"

const exerciseSchema = new mongoose.Schema({
    name: {type: String, required: false},
    reps: {type: Number, required: false},
    weight: {type: Number, required: false},
    unit: {type: String, required: false},
    date: {type: String, required: false},
    });

const Exercise = mongoose.model(EXERCISE_CLASS, exerciseSchema)

async function createExercise(name, reps, weight, unit, date){
    const current = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return await current.save();
};

async function getExercise(object){
    const numOfQueryParams = Object.keys(object).length;
    if (numOfQueryParams === 0 || !numOfQueryParams){   
        return await Exercise.find(object);
    }else{
        return await Exercise.find(object).exec();
    };
};

async function getExerciseByID(id){
    return await Exercise.findOne({_id: id}).exec();
};

async function updateExerciseByID(id, newValuesObj){
    const testExistance = await getExerciseByID(id)  // uses existing function
    if (testExistance === undefined || !testExistance || testExistance === undefined){
        return false
    }else{
        await Exercise.updateOne({_id: id}, newValuesObj).exec();
        return await getExerciseByID(id);
    };
};

async function deleteByQueryParam(query){
    return await Exercise.deleteMany(query).exec();
};

async function deleteByID(id){
    const testExistance = await getExerciseByID(id)   // uses existing function
    if (testExistance === undefined || !testExistance || testExistance === undefined){
        return false
    }else{
        return await Exercise.deleteOne({_id: id}).exec();
    }
};

export { createExercise, getExercise, getExerciseByID, updateExerciseByID, deleteByQueryParam, deleteByID}
