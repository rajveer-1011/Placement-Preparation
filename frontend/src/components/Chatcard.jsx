import { FaTrash, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteGroups } from '../features/forum/forumSlice'


const Chatcard = ({ group }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)


  const deleteHandle = (id) => {
    dispatch(deleteGroups({ id, navigate, toast }))
  }

  return (
    <>
      <li class="p-2 border-bottom">
        <div
          class="d-flex justify-content-between "
        >
          <Link to={`/forum/${group._id}`} className="text-decoration-none">
            <div class="d-flex flex-row">
              <h1 className="text-dark">
                <FaUsers className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" />
              </h1>
              <div class="pt-1">
                <h3 class="fw-bold mb-0 text-dark ">{group.group_name}</h3>
              </div>
            </div>
          </Link>

          <div class="pt-1">
            {user && user.role !== "user" ? (<>
              <button class="btn btn-dark" onClick={() => deleteHandle(group._id)}><FaTrash /></button>
            </>) : (<></>)}
          </div>
        </div>
      </li>
    </>
  );
};

export default Chatcard;
