import "./chat.css"
import Message from "../components/Message";


import { FaPaperPlane } from 'react-icons/fa'
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMsgs, createMsg, getGroup } from '../features/forum/forumSlice'

const Chat = () => {
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { groups, msgs, isCreated, isError, message } = useSelector((state) => state.forum)

  const { user } = useSelector((state) => state.auth)

  const [input, setInput] = useState('')

  useEffect(() => {

    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGroup(path))


  }, [user, navigate, isCreated, isError, message, dispatch])


  useEffect(() => {
    let timerId = setInterval(() => {
      dispatch(getMsgs(path))
    }, 1000)
    return () => {
      clearInterval(timerId)
    }
  }, [path, dispatch])

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createMsg({ path, input }))

  }
  const bottomRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [msgs]);


  return (
    <>
      <div class="chat-log">
        {msgs.length > 0 ? (
          <>
            {msgs.map(msg => (<Message key={msgs._id} msg={msg} />))}
          </>
        ) : (
          <></>
        )}
      </div>
      <div ref={bottomRef} />


      <div className="fixed-bottom" style={{ backgroundColor: "#fafafa" }}>

        <form onSubmit={onSubmit}>
          <div class="input-group mb-3 " style={{ width: "80%", margin: "auto" }}>
            <input type="text" class="form-control"
              name="input" value={input}
              placeholder={groups.restriction === false ? ("Write a message") :
                ('Only Admins can message here')} 
                aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={(e) => setInput(e.target.value)} />
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2" disabled={(groups.restriction === true && user.role !== "user")|| groups.restriction === false ? false : true}><FaPaperPlane /></button>
          </div>
        </form>

      </div>

    </>
  );
};

export default Chat;
