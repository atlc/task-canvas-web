import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";

const Landing = () => {
    const { isPending, isError } = useAuth();

    if (isPending) return <div className="bg-slate-100 rounded-lg md:mt-20">
        <h1 className="text-3xl text-slate-600 text-center">Loading...</h1>
        <Skeleton />
    </div>

    if (isError) return <Navigate to="/login" />

    return <Navigate to="/profile" />
}

export default Landing;