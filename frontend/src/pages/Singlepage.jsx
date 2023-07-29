import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner/Spinner'
import { toast } from 'react-toastify'
import { getPost } from '../features/posts/postSlice'
import { FaPen, FaTrash, FaTimes } from 'react-icons/fa'
import { updatePost, deletePost } from '../features/posts/postSlice'

const Singlepage = () => {

    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { posts, isLoading, isCreated, isError, message } = useSelector((state) => state.posts)
    const data = posts

    useEffect(() => {

        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
        }

        if (isCreated) {
            navigate('/')
        }

        dispatch(getPost(path))

    }, [path, user, navigate, isCreated, isError, message, dispatch])

    const [updateMode, setUpdateMode] = useState(false);
    const [title, setTitle] = useState("")
    const [caption, setCaption] = useState("")
    const [desc, setDesc] = useState("")

    useEffect(() => {
        setTitle(data.title)
        setCaption(data.caption)
        setDesc(data.desc)
    }, [data])

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePost({ title, caption, desc, path, navigate, toast }))
    }

    const deletePostHandle = (e) => {
        e.preventDefault();
        dispatch(deletePost({ path, navigate, toast }))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div >
                <div className="d-flex align-items-center justify-content-center">
                    <img src={posts.imgUrl} className="img-fluid p-2" alt="loading" />
                </div>
                {user && user.role !== "user" ? (
                    <>
                        {updateMode ?
                            (<>
                                <button type="button" class="btn btn-danger float-end " onClick={() => setUpdateMode(false)} ><FaTimes /></button>
                            </>) :
                            (<>
                                <button type="button" class="btn btn-dark float-end " onClick={deletePostHandle} ><FaTrash /></button>
                            </>)}

                        <button type="button" class="btn btn-dark float-end me-2" onClick={() => setUpdateMode(true)}><FaPen /></button>
                    </>
                ) : ("")}


                <div className="d-flex mb-3">
                    <div className="p-2 fw-semibold fst-italic">Posted By : {posts.username}</div>
                    <div className="ms-auto p-2 fw-semibold fst-italic"><p >{new Date(posts.createdAt).toLocaleString('en-US')}</p></div>
                </div>
                {updateMode ? (
                    <>
                        <div className="form-group p-1">
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    </>
                ) : (<>  <h3 className="display-6"><strong>{posts.title}</strong></h3></>
                )
                }


                {updateMode ? (<>
                    <div className="form-group p-1">
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Caption"
                            name="caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)} />
                    </div>
                </>) : (<>
                    <p><em>"{posts.caption}"</em></p>
                </>)}

                {updateMode ? (<>
                    <div className="form-group p-1" >
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="10 " placeholder="Description"
                            name="desc"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}>
                        </textarea>

                    </div>
                </>) : (<> <p p className="text-break fs-6">{posts.desc}</p> </>)}


                {updateMode ? (<>
                    <div className="d-grid gap-2">
                        <button className="btn btn-outline-dark" type="submit" onClick={onSubmit}>Update Post</button>
                    </div>
                </>) : ("")}

                <br></br>

                {user && user.role !== "user" ? (
                    <>
                        {!updateMode ? (
                            <>
                                <div class="d-flex bg-dark justify-content-center">
                                    <caption className="text-white">Seen by</caption>
                                </div>
                                <>
                                    {posts.length === 0 ?
                                        ("") :
                                        (<>{
                                            <table class="table ">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="align-middle">Sno.</th>
                                                        <th scope="col" className="align-middle">Id ~ Name </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {posts.views.map((view, no) => <tr className="align-middle">
                                                        <th scope="row" >{no}</th>
                                                        <td className="align-middle">{view}</td>
                                                    </tr>)}
                                                </tbody>
                                            </table>
                                        }</>)}
                                </>
                            </>) : (<></>)}
                    </>) : (<></>)}
            </div>
        </>
    )
}

export default Singlepage