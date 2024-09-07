import ExerciseItem from './ExerciseItem';

function ExerciseCollection ({exercises, deleteExercise, onEdit}) {
    return (
        <table className="collection-container">
            <tbody>
                <tr className='tableHeaders'>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                </tr>   
                    {exercises.map((exercise, i) => <ExerciseItem exercise={exercise} 
                            deleteExercise={deleteExercise} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    );
}

export default ExerciseCollection;