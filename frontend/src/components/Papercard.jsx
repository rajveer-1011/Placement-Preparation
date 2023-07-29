import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { deletePaper } from '../features/papers/paperSlice'


const Papercard = ({ paper }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)

    const deleteHandle = (id) => {
        dispatch(deletePaper({ id, navigate, toast }))
    }

    return (
        <>
            <div class="col">
                <div class="card text-center">
                    <div class="card-body ">
                        <h5 class="card-title ">{paper.pname}</h5>
                        <p class="card-text ">Uploaded by : {paper.username}</p>
                        <Link type="button" class="btn btn-dark" to={paper.purl}>View</Link>
                        {' '}
                        {user && user.role === "user" ? (<></>) : (<>
                            <button type="button" class="btn btn-dark" onClick={() => deleteHandle(paper._id)}><FaTrash /></button>
                        </>)}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Papercard