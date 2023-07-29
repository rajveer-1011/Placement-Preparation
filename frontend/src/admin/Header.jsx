import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark border border-secondary" >
                <div className="container-md ">
                    <Link className="navbar-brand" to="/">
                        Placement Preparation
                    </Link>
                    {user ? (<><button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/courses">Courses</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/roadmaps">Roadmaps</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/forum">Forum</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/papers">Papers</Link>
                                </li>
                                {user && user.role === "admin" ? (<>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/users">Users</Link>
                                    </li> </>) :
                                    (<> </>)}

                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Online Ide
                                    </Link>
                                    <ul className="dropdown-menu" >
                                        <li><Link className="dropdown-item" to="/ide" state={{ link: "https://www.programiz.com/c-programming/online-compiler/" }}>Online C Compiler </Link></li>
                                        <li><Link className="dropdown-item" to="/ide" state={{ link: "https://www.programiz.com/cpp-programming/online-compiler/" }}>Online C++ Compiler</Link></li>
                                        <li><Link className="dropdown-item" to="/ide" state={{ link: "https://www.programiz.com/java-programming/online-compiler/" }}>Online Java Compiler</Link></li>
                                        <li><Link className="dropdown-item" to="/ide" state={{ link: "https://www.programiz.com/javascript/online-compiler/" }}>Online Javascript Compiler</Link></li>
                                        <li><Link className="dropdown-item" to="/ide" state={{ link: "https://www.programiz.com/python-programming/online-compiler/" }}>Online Python Compiler</Link></li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Resources
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="https://www.geeksforgeeks.org/c-programming-language/">C</Link></li>
                                        <li><Link className="dropdown-item" to="https://www.geeksforgeeks.org/c-plus-plus/?ref=shm">C++</Link></li>
                                        <li><Link className="dropdown-item" to="https://www.geeksforgeeks.org/java/?ref=shm">Java</Link></li>
                                        <li><Link className="dropdown-item" to="https://www.geeksforgeeks.org/javascript/?ref=shm">Javascript</Link></li>
                                        <li><Link className="dropdown-item" to="https://www.geeksforgeeks.org/python-programming-language/?ref=shm">Python</Link></li>
                                        <li><Link className="dropdown-item" to="https://novoresume.com/editor/new-resume-preview/15?pageAuthDesired=/editor/new-resume/15">Resume Builder</Link></li>

                                    </ul>
                                </li>
                                
                            </ul>
                            <ul className="navbar-nav ms-auto ">
                                {user ? (
                                    <li className="nav-item">
                                        <Link className="nav-link active" onClick={onLogout} ><FaSignOutAlt /> Logout</Link>
                                    </li>) : (<>
                                        <li className="nav-item me-2" >
                                            <Link className="nav-link active " to="/login" active><FaSignInAlt /> Login</Link>
                                        </li>
                                        <li className="nav-item ">
                                            <Link className="nav-link active" to="/register"><FaUser /> Register</Link>
                                        </li>
                                    </>)
                                }
                            </ul>
                        </div>
                    </>) : (<>
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item me-2" >
                                <Link className="nav-link active " to="/login" active><FaSignInAlt /> Login</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link active" to="/register"><FaUser /> Register</Link>
                            </li>
                        </ul >

                    </>)}



                </div>
            </nav>
        </>
    )
}

export default Header