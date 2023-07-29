import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner/Spinner'
import { Link } from 'react-router-dom'
import Post from '../components/Post'
import { getPosts, reset } from '../features/posts/postSlice'
import { FaEdit } from 'react-icons/fa'
import '../index.css'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { posts, isLoading, isError, message } = useSelector((state) => state.posts)

  useEffect(() => {

    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getPosts())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="text-center p-2 ">
        <div className="card-body border bg-light shadow p-3 m bg-body " id='create'>
          <h4 >Welcome back {user && user.name}</h4>
          {user && user.role === "user" ? (<></>)
            : (<>
              <Link to={'/create/post'} className="text-dark text-decoration-none "><FaEdit className="fs-3" /><h6>Share any updates </h6></Link>
            </>)}
        </div>
      </div>

      {posts.length > 0 ? (
        <>
          {posts.slice(0).reverse().map(post => (<Post key={posts._id} post={post} />))}
        </>
      ) : (
        <h3>No updates available right now.</h3>
      )}

    </>
  )
}

export default Dashboard