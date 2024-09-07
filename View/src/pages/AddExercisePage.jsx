import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [unit, setUnit] = useState('');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = {name, reps, unit, weight, date};
        const response = await fetch(
            '/exercises', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newExercise)
                }
        );
        if(response.status === 201){
            alert(`Successfully added the exercise with the following info: name: ${name} reps: ${reps} unit: ${unit} weight: ${weight} date: ${date}`)
            console.log(response)
        }else{
            alert("Failed to add the exercise.")
        }
        navigate('/');
    };

    return (
        <div>
            <h1>Add An Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.valueAsNumber)} />
            <select name = "Unit" type='select' placeholder='Enter unit here' value={unit} onChange={e => setUnit(e.target.value)}>
                <optgroup label='Enter unit here'>
                    <option value="kgs">kgs</option>
                    <option value="lbs">lbs</option>
                </optgroup>
            </select>
            <input
                type="string"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
            <Navigation></Navigation>
        </div>
    );
}

export default AddExercisePage;