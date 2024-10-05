import { useQuery } from "@tanstack/react-query";
import { GET } from "../services/api/fetcher";

interface useAuthHookResults {
    isPending: boolean;
    isError: boolean;
    data: {
        message: string;
    }
}

const useAuth = () => {
    const { isPending, isError, data } = useQuery({
        queryKey: ["authCheck"],
        queryFn: () => GET('/auth/check')
    });

    console.log({ isPending, isError, data });

    return { isPending, isError, data } as useAuthHookResults;
}

export default useAuth;