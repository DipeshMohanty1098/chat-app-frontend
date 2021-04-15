import {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';


const MessagePage = () => {
    let params = useParams();
    const [messages, setMessages] = useState(null)
    const messagesEndRef = useRef(null)
    const [message, setMessage] = useState('')
    const [chatRoom, setChatRoom] = useState('');
    //const author = "Dipesh Mohanty";
    const [author, setAuthor] = useState('');
    const [websocketID, setID] = useState(0)
    const  [websocket, setWebsocket] = useState(null);
    //const websocket = new WebSocket("ws://192.168.0.108:5050/");
    const [websocketData, setWebsocketData] = useState(null);

    const sendNotification = async () => {
        //const websocket = new WebSocket("ws://192.168.0.108:5050/");
        console.log("websocket: " + websocket);
        fetch("https://messages-flask-rest-api.herokuapp.com/messages/" + params.chatRoomName)
        .then(res => {
            if (res.ok)
            return res.json();
        })
        .then((data123) => {
            websocket.send(JSON.stringify({id: data123.length, message: message, author: author, path: params.chatRoomName})); 
            const newMess = [...messages, {id: data123.length, message: message, author: author}]
            setMessages(newMess);
            
    })  
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const messageObj = {message, author, chatRoom};
        fetch("https://messages-flask-rest-api.herokuapp.com/messages/" + params.chatRoomName, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(messageObj)
        }).then(()=>{
            fetch("https://messages-flask-rest-api.herokuapp.com/messages/" + params.chatRoomName)
        .then(res => {
            if (res.ok)
            return res.json();
        })
        .then((data) => {
            console.log(data.length)
            setID(data.length)  
        })
            sendNotification();
        }
        )
        setMessage('');
        
    }


    useEffect(()=>{
        setAuthor(localStorage.getItem('Name'));
        setChatRoom(params.chatRoomName);
        setWebsocket(new WebSocket("wss://message-websocket-server.herokuapp.com/0.0.0.0/" + params.chatRoomName + "/"));
        fetch("https://messages-flask-rest-api.herokuapp.com/messages/" + params.chatRoomName)
        .then(res => {
            if (res.ok)
            return res.json();
        })
        .then((data) => {
            console.log("data:" + data.json);
            setMessages(data);
        })
        console.log("being called!!!")
        //return => chat();
    }, [])


    
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView(
              {
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
              })
          }
          console.log("being called!!!!");
        }, [messages]);
    
    const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    
    return(
        <div>
        <div className="center">
        <h4>{params.chatRoomName}</h4>
        </div>
        <div className="chat" >
            {messages ? messages.length === 0 ? <p>Could not find any messages! Be the first one to send a message in this chat room!</p>: messages.map((message)=>(
                <div>
                <div className="row" key = {message.id} >
                <div className="col-10">
                <div className="message" key = {message.id} >
                <div className = {author == message.author ? "right": "left"}>
                <div class="card blue-grey darken-1" style={{"width": message.length * 1, "maxWidth":"400px"}}>
                <div class="card-content white-text" style={{wordWrap: "break-word"}}>
                    <p style={{"fontWeight": "bold"}}>{message.author == author ? message.author + "(You)": message.author}</p>
                    <p style={{maxWidth: "300px"}}>{message.message}</p>
                </div>
                <div ref = {messagesEndRef}></div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                
            ),
            websocket.onmessage = function (event) {
                const data = JSON.parse(event.data);
                switch (data.type) {
                    case 'state':
                        if (data.path == params.chatRoomName){
                        const newMessages = [...messages, data];
                        setMessages(newMessages)
                        }
                        break;
                }
            }
            ): <p style={{textAlign: "center"}}>Loading...</p>}
            </div>
            <div className="col-12">   
            <div className="center">     
            <form onSubmit={handleSubmit} className="form">
            <input type="text" placeholder="Enter your message" onChange={(e)=>setMessage(e.target.value)} value={message}/>
            <div> 
            <button  className="waves-effect waves-light btn-small" type="submit" disabled={message == '' ? true : false}>Send</button>
            </div>
            </form>
            </div>
            </div>
            </div>
    )
}

export default MessagePage;