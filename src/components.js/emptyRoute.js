import {Link} from 'react-router-dom';

const EmptyRoute = () =>{
    return (
        <div>
        <p>Can't find what you are looking for.</p>
        <Link to="/chat/chatRoom=chatRoom1">Back to home?</Link>
        </div> 
    )
}

export default EmptyRoute;