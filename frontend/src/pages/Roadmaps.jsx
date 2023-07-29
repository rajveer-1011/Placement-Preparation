import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAll } from '../features/roadmaps/roadmapSlice'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner/Spinner'
import Roadmapcard from '../components/Roadmapcard'
import '../index.css'



const Roadmaps = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { roadmaps, isLoading, isError, message } = useSelector((state) => state.roadmaps)
  useEffect(() => {

    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }


  }, [user, navigate, isError, message])

  useEffect(() => {

    dispatch(getAll())

  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>

      {user && user.role !== "user" ? (
        <>
          <div className="text-center p-2">
            <div className="card-body border bg-light shadow p-3 m bg-body rounded " id='create'>
              <Link to={'/create/roadmap'} className="text-dark text-decoration-none " ><FaEdit className="fs-3" /><h6>Create a roadmap</h6></Link>
            </div>
          </div>
        </>) : (<></>)}

      <div className='row row-cols-1 row-cols-md-2 g-4 p-2'>
        {roadmaps.length > 0 ? (
          <>
            {roadmaps.map(roadmap => (<Roadmapcard key={roadmap._id} roadmap={roadmap} />))}
          </>
        ) : (
          <h3>No roadmaps available right now.</h3>
        )}
      </div>
    </>)
}

export default Roadmaps