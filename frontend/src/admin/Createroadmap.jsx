import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createRoadmap, reset, updateRoadmap } from '../features/roadmaps/roadmapSlice'
import app from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Createroadmap = () => {

    //{imgPerc === 100 ?("true"):("false")}

    const { id } = useParams();

    const [img, setImg] = useState('');
    const [imgPerc, setImgPerc] = useState(0);

    const [inputs, setInputs] = useState({})
    const { rname, rurl, rdesc } = inputs

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //const {  isError, isSuccess, message } = useSelector((state) => state.posts)
    const { user } = useSelector((state) => state.auth)
    const { roadmaps, isCreated, isError, message } = useSelector((state) => state.roadmaps)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/login')
        }

        if (isCreated) {
            navigate('/roadmaps')
        }

        dispatch(reset())

    }, [user, isError, isCreated, message, navigate, dispatch])

    useEffect(() => {
        if (id) {
            const roadmap = roadmaps.find((r) => r._id === id);
            setInputs({ ...roadmap });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

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
                if (urlType === "rimgUrl") { setImgPerc(Math.round(progress)) }
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
    };

    useEffect(() => {
        img && uploadFile(img, "rimgUrl");
    }, [img]);

    const onSubmit = (e) => {
        e.preventDefault();
        const formdata = { ...inputs };
        if (!id) {
            dispatch(createRoadmap({ formdata, toast, navigate }))
        } else {
            dispatch(updateRoadmap({ id, formdata, toast, navigate }));
        }
    }
    return (
        <>
            <form className="mt-3" onSubmit={onSubmit}>
                <div className="form-group p-1">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Roadmap name"
                        name="rname"
                        value={rname}
                        onChange={handleChange}
                        required />
                </div>
                <div className="form-group p-1">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Roadmap Url"
                        name="rurl"
                        value={rurl}
                        onChange={handleChange} 
                        required />
                </div>

                {imgPerc > 0 ? (
                    <>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" role="progressbar" aria-label="Basic example" style={{width: `${imgPerc}%`}}  aria-valuemin="0" aria-valuemax="100">{imgPerc === 100 ?("Uploaded"):(`${imgPerc}%`)}</div>
                        </div>
                    </>) :
                    (<>
                        <div className="form-group p-1">
                            <div className="input-group">
                                <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"
                                    accept="image/*"
                                    onChange={(e) => setImg(e.target.files[0])} />
                            </div>
                        </div>
                    </>)}

                <div className="form-group p-1" >
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="10 " placeholder="Description"
                        name="rdesc"
                        value={rdesc}
                        onChange={handleChange}
                        required ></textarea>

                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-outline-dark" type="submit" disabled={imgPerc === 100 || imgPerc === 0 ? false : true }>{!id ? ("Create Roadmap") : ("Update Roadmap")}</button>
                </div>
            </form>
        </>)
}

export default Createroadmap