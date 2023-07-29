import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './admin/Dashboard';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import Header from './admin/Header';
import Singlepage from './pages/Singlepage';
import Createpost from './admin/Createpost';
import Courses from './pages/Courses';
import Createcourse from './admin/Createcourse';
import Roadmaps from './pages/Roadmaps';
import Createroadmap from './admin/Createroadmap';
import Users from './admin/Users';
import Updatepost from './admin/Updatepost';
import Idepage from './pages/Idepage';
import Forum from './pages/Forum';
import Chat from './pages/Chat';
import Papers from './pages/Papers';


function App() {
  return (
    <>
      <Router>
        <Header/>
        <div className='container-md'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/post/:id' element={<Singlepage />} />
          <Route path='/create/post' element={<Createpost />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/create/course' element={<Createcourse />} />
          <Route path='/update/course/:id' element={<Createcourse />} />
          <Route path='/roadmaps' element={<Roadmaps />} />
          <Route path='/create/roadmap' element={<Createroadmap />} />
          <Route path='/update/roadmap/:id' element={<Createroadmap />} />
          <Route path='/users' element={<Users />} />
          <Route path='/post/update/:id' element={<Updatepost />} />
          <Route path='/ide' element={<Idepage />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/forum/:id' element={<Chat />} />
          <Route path='/papers' element={<Papers />} />






        </Routes>
        </div>
      </Router>
      <ToastContainer/>

    </>
  );
}

export default App;
