import Chatcard from "../components/Chatcard";
import Spinner from '../components/Spinner/Spinner'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createGroup, getGroups, reset } from '../features/forum/forumSlice'

const Forum = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user } = useSelector((state) => state.auth)
  const { groups, isLoading, isError, message } = useSelector((state) => state.forum)

  const [group_name, setGroup_name] = useState('')
  const [restriction, setRestriction] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  useEffect(() => {
    dispatch(getGroups())
  }, [dispatch])

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGroup({ group_name, restriction }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div class="card m-2" >
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          {user && user.role !== "user" ? (<>
            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
              + Create Group
            </button>
          </>) : (<></>)}

        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Create Group</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={onSubmit}>
                <div class="modal-body">
                  
                  <input class="form-control"
                    name="group_name"
                    value={group_name}
                    type="text"
                    placeholder="Enter Group Name"
                    aria-label="default input example"
                    onChange={(e) => setGroup_name(e.target.value)} />

                  <div class="col-auto p-2">
                    <div class="form-check">
                      <input class="form-check-input dark"
                        name="restriction"
                        value={restriction}
                        type="checkbox"
                        id="autoSizingCheck"
                        onChange={(e) => setRestriction(true)} />
                      <label class="form-check-label" for="autoSizingCheck">
                        Only Admin
                      </label>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-dark" data-bs-dismiss="modal">Create</button>
                </div>
              </form>

            </div>
          </div>
        </div>

        <div class="card-body">
          <ul class="list-unstyled mb-0">
            {groups.length > 0 ? (
              <>
                {groups.slice(0).reverse().map(group => (<Chatcard key={groups._id} group={group} />))}
              </>
            ) : (
              <h4>No Groups Created Right Now.</h4>
            )}
          </ul>
        </div>
      </div >
    </>
  );
};

export default Forum;
