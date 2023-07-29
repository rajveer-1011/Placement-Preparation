import { Link } from 'react-router-dom'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteRoadmap } from '../features/roadmaps/roadmapSlice'

const Roadmapcard = ({ roadmap }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)


    const deleteHandle = (id) => {
        dispatch(deleteRoadmap({ id, navigate, toast }))
    }

    return (
        <>
            <div className="col-sm ">
                <div className="card h-100">
                    {roadmap.rimgUrl && (<img className="card-img-top" src={roadmap.rimgUrl} alt="img loading"  />)}
                    <div className="card-body">
                        <Link to={roadmap.rurl} className="text-decoration-none text-dark">
                            <h5 class="card-title ">{roadmap.rname}</h5>
                        </Link>
                        <p className="card-text">{roadmap.rdesc}</p>
                        {user && user.role === "user" ? (<></>) 
                        : (<>
                            <Link type="button" className="btn btn-dark float-end " to={`/update/roadmap/${roadmap._id}`}><FaPen /></Link>
                            <button type="button" className="btn btn-dark float-end me-2" onClick={() => deleteHandle(roadmap._id)}><FaTrash /></button>
                        </>)}
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Roadmapcard