import {Link} from 'react-router-dom';
import ExerciseCollection from '../components/ExerciseCollection';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

function HomePage({setExerciseToEdit}) {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data)
    }

    useEffect( () => {
        loadExercises()
    }, []);

    const deleteExercise = async (_id) => {
        const response = await fetch(
            `/exercises/${_id}`,
            {method: 'DELETE'}
        );
        if (response.status === 204){
            setExercises(exercises.filter( e => e._id !== _id))
            alert(`Successfully deleted the movie with the _id ${_id}`)
            navigate('/')
        }else{
            alert(`Failed to delete the exercise with the _id ${_id}`)
            navigate('/')
        }
    }

    const onEdit = (exercise) => {
        setExerciseToEdit(exercise)
        navigate('/edit-exercise')
    }

    return (
        <>
            <h1>List of Exercises</h1>
            <ExerciseCollection exercises={exercises} deleteExercise={deleteExercise} onEdit={onEdit}></ExerciseCollection>
            <Navigation></Navigation>
        </>
    );
}

export default HomePage;