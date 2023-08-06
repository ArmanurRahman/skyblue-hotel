import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueriesData(["user"], user);
            console.log(user);
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            console.log(err);
            toast.error("Email password are incorrect");
        },
    });
    return { login, isLoading };
};
export default useLogin;
