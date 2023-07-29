import { Link } from 'react-router-dom'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteCourse } from '../features/courses/courseSlice'

const Coursecard = ({ course }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)

    const deleteHandle = (id) => {
        dispatch(deleteCourse({ id, navigate, toast }))
    }

    return (
        <>
            <div className="col-sm">
                <div className="card h-100">
                    {course.cimgUrl && (<img className="card-img-top " src={course.cimgUrl} alt="img loading" />)}
                    <div className="card-body">
                        <Link to={course.curl} className="text-decoration-none text-dark">
                            <h5 class="card-title ">{course.cname}</h5>
                        </Link>
                        <p className="card-text">{course.cdesc}</p>
                        {user && user.role === "user" ? (<></>)
                            : (<>
                                <Link type="button" className="btn btn-dark float-end " to={`/update/course/${course._id}`} ><FaPen /></Link>
                                <button type="button" className="btn btn-dark float-end me-2" onClick={() => deleteHandle(course._id)}><FaTrash /></button>
                            </>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Coursecard