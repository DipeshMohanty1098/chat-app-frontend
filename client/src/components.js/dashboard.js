import Routes from '../Routes';
import ChatRooms from './chatRooms'
import MessagePage from './messages';

const Dashboard = () => {
    return (
    <div className="home">
    <ChatRooms className="left"/>
    <MessagePage className="right"/>
    </div>
    )
}

export default Dashboard;