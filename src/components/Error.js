import { useRouteError } from "react-router-dom";
const Error = () => {

    const err = useRouteError();

    return (
        <div>
            <h1>Ahh!!Snap!</h1>
            <h2>{err.status} : {err.statusText}</h2>
        </div>
    )
}
export default Error;