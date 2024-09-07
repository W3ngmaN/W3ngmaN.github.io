import {Link} from 'react-router-dom';

function Navigation({homePage, addExercise}){
    return(
        <nav>
            <div>
                <Link to='/add-exercise'>Add Exercise Page</Link>
            </div>
            <div>
                <Link to='/'>Home Page</Link>
            </div>
            
        </nav>       

    )
}

export default Navigation;