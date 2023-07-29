import "../pages/chat.css"
import { useSelector } from 'react-redux'
import {format} from  'timeago.js'



const Message = ({ msg }) => {
    const { user } = useSelector((state) => state.auth)

    return (
        <>
            {msg.sender_name !== user.name ? (<>
                <div class="chat-log__item">
                    <h3 class="chat-log__author">{msg.sender_name} <small>{format(msg.createdAt)}</small></h3>
                    <div class="chat-log__message">{msg.text}</div>
                </div>
            </>)
                : (<>
                    <div class="chat-log__item chat-log__item--own">
                        <h3 class="chat-log__author">{msg.sender_name} &nbsp;&nbsp;<small>{format(msg.createdAt)}</small></h3>
                        <div class="chat-log__message">{msg.text}</div>
                    </div>
                </>)}
        </>
    )
}

export default Message