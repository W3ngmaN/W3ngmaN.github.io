import '../App.css';
import { useNavigate } from 'react-router-dom';
import { React, useState } from 'react';
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

function ExerciseItem({exercise, deleteExercise, onEdit}) {
    const navigate = useNavigate()

    async function EditExercisePage() {
      navigate("/edit-exercise")
    }

    return (
        <tr className="exercise-item">
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.date}</td>
            <td className='table-button'><MdModeEdit onClick={() => onEdit(exercise)}/></td>
            <td className='table-button'><MdDeleteForever onClick={() => deleteExercise(exercise._id)}/></td>
        </tr>
    );
}

export default ExerciseItem;
