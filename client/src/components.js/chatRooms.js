import {useState, useEffect} from 'react';
import {BrowserRouter,Link} from 'react-router-dom';

const ChatRooms = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [filteredChatRoom, setFilteredChatRooms] = useState([]);
    const [color, setColor] = useState('')
    const [search, setFilter] = useState('');
    const [chatName, setChatName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const chatRoomObj = {chatRoomName: chatName}
        fetch("http://192.168.0.105:5001/chatRooms/", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(chatRoomObj)
        }).then((res)=>{
            if (res.status == 409){
                setColor('red')
                setError("Chat Room Name already taken. Please choose another name.")
            }
            else{
                setColor('green')
                setError('Chat Room created succesfully, refresh page to view!')
                setChatName('')
                return res.json();
            }
        })
    }

    const refresh = () => {
        window.location.reload();
    }

    useEffect(()=>{
        fetch('http://192.168.0.105:5001/chatRooms').then((res)=>{
            if (res.ok){
                return res.json();
            }
        })
        .then((data) =>{
            setChatRooms(data)
        })
    }, [])

    useEffect(() => {
        console.log("called")
        setFilteredChatRooms(
          chatRooms.filter((chatRoom) =>
            chatRoom.chatRoomName.toLowerCase().includes(search.toLowerCase())
          )
        );
      }, [search, chatRooms]);

    return(
        <div className="chatRooms">
        <ul className="collection with-header">
            <li className="collection-header"><h4>Chat Rooms</h4></li>
            <li className="collection-header"><input onChange={(e) => setFilter(e.target.value)} placeholder="Search chat room" style={{width: "500px"}}/></li>
            <div className="chatRoomList">
            <BrowserRouter>
            {filteredChatRoom ? filteredChatRoom.map((chatRoom)=>(
                <li onClick={refresh}><Link to={"/chat/chatRoom=" + chatRoom.chatRoomName} className="collection-item">{chatRoom.chatRoomName}</Link></li>
            )) : <p>Loading...</p>}
            </BrowserRouter>
            </div>
        </ul>
        <form style={{width: "300px"}}>
            <input type="text" required value={chatName} placeholder="Enter Name of your chat room!" onChange={(e)=> { console.log(chatName);
                setChatName(e.target.value)}}/>
        </form>
        <button onClick={handleSubmit}>Create new chat Room</button>
        <p style={{color: color}}>{error}</p>
        </div>
    )
}

export default ChatRooms;