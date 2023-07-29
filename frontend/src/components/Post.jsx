import { FaEye, FaUserCircle, FaClock } from 'react-icons/fa'
import { addPostView } from '../features/posts/postSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {format} from  'timeago.js'

import Spinner from '../components/Spinner/Spinner'

const Post = ({ post }) => {

  //  style={{width : "30rem"}} h-75 d-flex align-items-center justify-content-center
  //<Link to={`/post/${post._id}`} className="btn btn-dark" onClick={onclick}>Readmore</Link>
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { isLoading } = useSelector((state) => state.posts)

  const onClick = (event) => {
    event.preventDefault();
    dispatch(addPostView(post._id))
    navigate(`/post/${post._id}`)

  }
  if (isLoading) {
    return <Spinner />
  }


  return (
    <div className="p-2 ">
      <div className="card">
        <div class="d-flex justify-content-between p-2 px-3">
          <div class="d-flex flex-row align-items-center">
            <h2><FaUserCircle /></h2>
            <div class="d-flex flex-column mx-2"> <span className='fst-italic fw-bold'>{post.username}</span></div>
          </div>
          <div class="d-flex flex-row "> <h6 class="mx-2 fw-normal mt-2"> <FaClock /> {format(post.createdAt)}</h6>  </div>
        </div>

        <div class="h-100">
          {post.imgUrl && (<img className="card-img-top ratio ratio-4x3" src={post.imgUrl} alt="img loading" />)}
        </div>
        <div className="card-body">
          <h2 className="card-title ">{post.title}</h2>
          <p className="card-text">{post.caption} </p>
          <button className="btn btn-dark" onClick={onClick}>Readmore</button>
          {user && user.role === "user" ? (<></>
          ) : (<>
            <p className="btn btn-dark float-end me-2 " onClick={onClick}> <FaEye /> {post.views.length}</p>
          </>)}
        </div>
      </div>
    </div>
  )
}

export default Post