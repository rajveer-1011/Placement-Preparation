import Coursecard from '../components/Coursecard'
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAll } from '../features/courses/courseSlice'
import Spinner from '../components/Spinner/Spinner'
import '../index.css'


const Courses = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { courses, isLoading, isError, message } = useSelector((state) => state.courses)

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }

  }, [user, navigate, isError, message, dispatch])

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
              <Link to={'/create/course'} className="text-dark text-decoration-none " ><FaEdit className="fs-3" /><h6>Create a course</h6></Link>
            </div>
          </div>
        </>) : (<></>)}

      <div className='row row-cols-1 row-cols-md-2 g-4 p-2'>
        {courses.length > 0 ? (
          <>
            {courses.map(course => (<Coursecard key={courses._id} course={course} />))}
          </>
        ) : (
          <h3>No courses available right now.</h3>
        )}
      </div>
    </>
  )
}

export default Courses