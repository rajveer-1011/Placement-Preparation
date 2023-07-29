import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    college_name:'',
    degree:'',
    contact_no:'',
  })

  const { name, email, password, password2, college_name, degree, contact_no } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        college_name,
        degree,
        contact_no,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <div className='d-flex justify-content-center'>
        <h1><FaUser /></h1>
      </div>
      <div className='d-flex justify-content-center'>
        <h3>Register</h3>
      </div>
      <form className="p-3" onSubmit={onSubmit}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Enter name" name="name" value={name} onChange={onChange} />
        </div>
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Enter email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Enter password" name="password" value={password} onChange={onChange} />
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Confirm password" name="password2" value={password2} onChange={onChange} />
        </div>
        <div className="input-group mb-3">
          <select class="form-select" aria-label="Default select example" name="degree" value={degree} onChange={onChange}>
            <option selected>Select Degree</option>
            <option value="Btech">Btech</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="Msc">Msc</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="College Name" name="college_name" value={college_name} onChange={onChange} />
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Contact no" name="contact_no" value={contact_no} onChange={onChange} />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-dark">Register</button>
        </div>
      </form>
    </>
  )
}

export default Register