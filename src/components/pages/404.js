import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <>
            <ErrorMessage/>
            <p>Page not found</p>
            <Link to={'/'}>Back to main page</Link>
        
        </>
    )
}
export default Page404;