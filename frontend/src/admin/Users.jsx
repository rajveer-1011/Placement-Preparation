import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getAll, deleteUser, updateUser } from '../features/users/userSlice'
import Spinner from '../components/Spinner/Spinner'
import { toast } from 'react-toastify'
import { FaPen, FaTrash, FaUser } from 'react-icons/fa'

const Users = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)
    const { users, isLoading, isError, message } = useSelector((state) => state.users)

    useEffect(() => {

        if (isError) {
            // console.log(message)
            toast.error(message)

        }

        if (!user) {
            navigate('/login')
        }

        // return () => {
        //     dispatch(reset())
        // }

    }, [user, navigate, isError, message, dispatch])

    useEffect(() => {

        dispatch(getAll())

    }, [dispatch])

    const deleteUserHandle = (id) => {
        dispatch(deleteUser({ id, navigate, toast }))
    }

    const updateUserHandle = (id) => {
        dispatch(updateUser({ id, navigate, toast }))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            {users ? (<>
                <div class="row row-cols-1 row-cols-md-3 g-4 p-2">

                    {users.map((user_u, no) =>
                        <div class="col">
                            <div class="card text-bg-light h-100">
                                <div class="card-body text-center">
                                    <h4 class="card-title"><FaUser /></h4>
                                    <h4 class="card-title">{user_u.name}</h4>
                                    <p class="card-text fw-bold fst-italic">Contact no. : {user_u.contact_no}</p>
                                    <p class="card-text fw-bold fst-italic">College : {user_u.college_name}</p>
                                    <p class="card-text fw-bold fst-italic">Degree : {user_u.degree}</p>
                                    <p class="card-text fw-bold fst-italic">Role : {user_u.role}</p>
                                    {user_u.role === "admin" ? <></> : <>
                                        <button type="button" className="btn btn-dark  me-2" onClick={() => updateUserHandle(user_u._id)}><FaPen /></button>
                                        <button type="button" className="btn btn-dark  me-1" onClick={() => deleteUserHandle(user_u._id)}><FaTrash /></button></>}
                                </div>
                            </div>
                        </div>)}
                </div>
































            </>) : ("")}

        </>
    )
}

export default Users