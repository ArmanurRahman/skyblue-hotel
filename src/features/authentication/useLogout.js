import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        },
    });
    return { logout, isLoading };
};
export default useLogout;
