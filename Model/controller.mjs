import express, { application } from 'express';
import * as connectDB from './database.mjs'
import * as model from './model.mjs';
const app = express();
const PORT = 3000;

connectDB.connect();

app.use(express.json())

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

// create an exercise
app.post('/exercises', async(req, res) => {
    const name = req.body.name
    const reps = req.body.reps
    const weight = req.body.weight
    const unit = req.body.unit
    const date = req.body.date
    let invalidFlag = 0
    // validation of inputs
    if (name === undefined || !name || reps === undefined || !reps
        || weight === undefined || !weight || unit === undefined || !unit ||
        date === undefined || !date){
            invalidFlag = 1
            console.log("undefined/ non existant")
        };
    if (Object.keys(req.body).length > 5 || Object.keys(req.body).length < 5){
        invalidFlag = 1
        console.log("length")
    };
    if (typeof name !== 'string' || name.length < 1){
        invalidFlag = 1
        console.log("name")
    };
    if (typeof reps !== 'number' || reps < 1 || Number.isInteger(reps) === false){
        invalidFlag = 1
        console.log("number")
    };
    if (typeof weight !== 'number' || weight < 1 || Number.isInteger(weight) === false){
        invalidFlag = 1
        console.log("weight")
    };
    if (unit !== 'kgs' && unit != 'lbs'){
        invalidFlag = 1
    };
    const datePassed = isDateValid(String(date))
    if (datePassed === false){
        invalidFlag = 1
    };
    if (invalidFlag === 1){
        res.status(400).contentType("application/json").send({ Error: "Invalid request" })
    }else{
        let exercise = await model.createExercise(name, reps, weight, unit, date)
        console.log(exercise)
        res.status(201).contentType("application/json").send(exercise)
    }
});

// get all exercises or exercises by query
app.get('/exercises', async (req, res) => {
    const optionalParam = req.query
    const result = await model.getExercise(optionalParam);
    res.status(200).contentType("application/json").send(result)
});

// get exercises by path parameter (id)
app.get('/exercises/:id', async (req, res) => {
    const id = req.params.id
    const result = await model.getExerciseByID(id)
    if (result === undefined || !result){
        res.status(404).contentType("application/json").send({
            "Error": "Not found"
        });
    }else{
        res.status(200).contentType("application/json").send(result)
    };
});

// update exercises by their id, updates only the values sent in request body
app.put('/exercises/:id', async (req, res) => {
    const name = req.body.name
    const reps = req.body.reps
    const weight = req.body.weight
    const unit = req.body.unit
    const date = req.body.date
    let invalidFlag = 0
    // validation of inputs
    if (name === undefined || !name || reps === undefined || !reps
        || weight === undefined || !weight || unit === undefined || !unit ||
        date === undefined || !date){
            invalidFlag = 1
            console.log("undefined/ non existant")
        };
    if (Object.keys(req.body).length > 5 || Object.keys(req.body).length < 5){
        invalidFlag = 1
        console.log("length")
    };
    if (typeof name !== 'string' || name.length < 1){
        invalidFlag = 1
        console.log("name")
    };
    if (typeof reps !== 'number' || reps < 1 || Number.isInteger(reps) === false){
        invalidFlag = 1
        console.log("number")
    };
    if (typeof weight !== 'number' || weight < 1 || Number.isInteger(weight) === false){
        invalidFlag = 1
        console.log("weight")
    };
    if (unit !== 'kgs' && unit != 'lbs'){
        invalidFlag = 1
    };
    const datePassed = isDateValid(String(date))
    if (datePassed === false){
        invalidFlag = 1
    };
    if (invalidFlag === 1){
        res.status(400).contentType("application/json").send({ Error: "Invalid request" })
    }else{
        const id = req.params.id
        const result = await model.updateExerciseByID(id, req.body)
        if (result === false){
            res.status(404).contentType("application/json").send({"Error": "Not found"});
        }else{
            res.status(200).contentType("application/json").send(result);
        };
    }
});

// deletes exercises that have a matching id in the path parameter
app.delete('/exercises/:id', async (req, res) => {
    const id = req.params.id
    const result = await model.deleteByID(id)
    if (result === false){
        res.status(404).contentType("application/json").send({"Error": "Not found"});
    }else{
        res.status(204).send();
    }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
