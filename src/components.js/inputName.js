import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';


const Name = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const history = useHistory();

    const handleClick = () => {
        if (name == ''){
            setError('Please enter a valid name :)')
        } else {
        localStorage.setItem( 'Name', name );
        history.push("/chat/chatRoom=" + "chatRoom1");
        }
    }

    useEffect(() => {
        if (localStorage.getItem('Name') != null){
            history.push("/chat/chatRoom=" + "chatRoom1")
        }
    }, [])

    return (
        <div className="inputName">
        <h3>Chat App :D</h3>
        <form className="nameForm">
        <input className = "center" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name"/>
        </form>
        <p style={{color: "red"}}>{error}</p>
        <button className="center" onClick={handleClick}>Start Chatting!</button>
        </div>
    )
}

export default Name;