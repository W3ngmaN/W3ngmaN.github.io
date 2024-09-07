import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation';

export const EditExercisePage = ({exerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = {name, reps, unit, weight, date};
        const response = await fetch(
            `/exercises/${exerciseToEdit._id}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(editedExercise)
                }
        );
        if(response.status === 200){
            alert("Successfully edited the exercise!")
            console.log(response)
        }else{
            alert("Failed to edit the exercise.")
        }
        navigate('/');
    };

    return (
        <div>
            <h1>Edit An Exercise</h1>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.valueAsNumber)} />
            <select type='select' value={unit} onChange={e => setUnit(e.target.value)}>
                <optgroup label='Enter unit here'>
                    <option value="kgs">kgs</option>
                    <option value="lbs">lbs</option>
                </optgroup>
            </select>
            <input
                type="string"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Update</button>
            <Navigation></Navigation>
        </div>
    );
}

export default EditExercisePage;