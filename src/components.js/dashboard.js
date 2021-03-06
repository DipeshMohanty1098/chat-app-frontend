import Routes from '../Routes';
import ChatRooms from './chatRooms'
import MessagePage from './messages';
import {useHistory} from 'react-router-dom';
import {useEffect} from 'react';


const Dashboard = () => {
    const history = useHistory()
    useEffect(()=>{
        if (localStorage.getItem('Name') === null){
            history.push("/");
        }

    }, [])

    return (
    <div className="home">
    <ChatRooms className="left"/>
    <MessagePage className="right"/>
    </div>
    )
}

export default Dashboard;