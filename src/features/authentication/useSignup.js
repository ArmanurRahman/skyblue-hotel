import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useSignup = () => {
    const { mutate: signUp, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            console.log(user);
            toast.success("Account successfully created");
        },
    });
    return { signUp, isLoading };
};
