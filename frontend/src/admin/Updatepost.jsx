import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updatePost } from '../features/posts/postSlice'

const Updatepost = () => {
    const location = useLocation()
    const path = location.pathname.split('/')[3]

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { posts, isCreated, isError, message } = useSelector((state) => state.posts)

    const [title, setTitle] = useState(posts.title)
    const [caption, setCaption] = useState(posts.caption)
    const [desc, setDesc] = useState(posts.desc)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/login')
        }

        if (isCreated) {
            navigate('/')
        }

    }, [user, isError, isCreated, message, navigate, dispatch])


    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePost({ title, caption, desc, path}))
    }
    return (
        <>
            <form className="mt-3" onSubmit={onSubmit}>
                <div className="form-group p-1">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group p-1">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Caption"
                        name="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)} />
                </div>
                <div className="form-group p-1" >
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="10 " placeholder="Description"
                        name="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}>
                    </textarea>

                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-outline-dark" type="submit">Update Post</button>
                </div>
            </form>
        </>)
}

export default Updatepost