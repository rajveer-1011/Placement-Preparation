import { useLocation } from "react-router-dom";

const Idepage = () => {
    //<iframe src="https://www.programiz.com/c-programming/online-compiler/" title="Compiler" target="_self" allowfullscreen></iframe>
    const location = useLocation()
    return (
        <>
            <div className="ratio ratio-1x1">
                <iframe src={location.state.link} title="Compiler" ></iframe>
            </div>

        </>
    )
}

export default Idepage