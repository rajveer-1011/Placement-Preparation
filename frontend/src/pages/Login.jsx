
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

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

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='d-flex justify-content-center'>
        <h1><FaSignInAlt /></h1>
      </div>
      <div className='d-flex justify-content-center'>
        <h3>Login</h3>
      </div>
      <form className="p-3" onSubmit={onSubmit}>
  
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Enter email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Enter password" name="password" value={password} onChange={onChange}/>
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-dark">Login</button>
        </div>
      </form>
    </>
  )
}

export default Login