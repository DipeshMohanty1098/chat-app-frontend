import './App.css';
import MessagePage from './components.js/messages'
import Name from './components.js/inputName'
import Routes from './Routes';
import ChatRooms from './components.js/chatRooms'


//<button onClick={localStorage.removeItem('Name')}>Disconnect</button>
function App() {
  return (
    <div>
      <Routes/>
    </div>
  );
}

export default App;
