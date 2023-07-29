import { FaFileUpload } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import app from "../firebase";
import { getAll, createPaper, reset } from '../features/papers/paperSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Papercard from '../components/Papercard';

const Papers = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [img, setImg] = useState("");
    const [inputs, setInputs] = useState({})
    const { pname } = inputs

    const [imgPerc, setImgPerc] = useState(0);

    const { papers } = useSelector((state) => state.papers)
    const { user } = useSelector((state) => state.auth)

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (urlType === "purl") { setImgPerc(Math.round(progress)) }
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => { },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL };
                    })
                });
            })
    }

    useEffect(() => {
        img && uploadFile(img, "purl");
    }, [img]);

    useEffect(() => {


        if (!user) {
            navigate('/login')
        }

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, dispatch])

    useEffect(() => {
        dispatch(getAll())
    }, [dispatch])

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createPaper({ ...inputs }))
    }

    return (
        <>
            <div className="text-center p-2">
                <div className="card-body border bg-light shadow p-3 m bg-body rounded " id='create'>
                    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <FaFileUpload className="fs-3" /> Upload Papers
                    </button>
                </div>
            </div>

            <form onSubmit={onSubmit}>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Upload file</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div className="form-group p-1">
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Paper name"
                                        name="pname"
                                        value={pname}
                                        onChange={handleChange}
                                        required />
                                </div>

                                {imgPerc > 0 ? (
                                    <>
                                        <div class="progress">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" role="progressbar" aria-label="Basic example" style={{ width: `${imgPerc}%` }} aria-valuemin="0" aria-valuemax="100">{imgPerc === 100 ? ("Uploaded") : (`${imgPerc}%`)}</div>
                                        </div>
                                    </>) :
                                    (<>
                                        <div className="form-group p-1">
                                            <div className="input-group">
                                                <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"
                                                    onChange={(e) => setImg(e.target.files[0])} />
                                            </div>
                                        </div>
                                    </>)}


                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" >Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                {papers.length > 0 ? (
                    <>
                        {papers.map(paper => (<Papercard key={paper._id} paper={paper} />))}
                    </>
                ) : (
                    <h3>No papers available right now.</h3>
                )}
            </div>
        </>
    )
}

export default Papers