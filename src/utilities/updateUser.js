import { auth } from "../firebase/firebase"; 
import { updateProfile, updatePassword } from "firebase/auth";
import { loginSuccess, startLoading, loginFailure } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
export const updateUserName = (newName) => async (dispatch) =>{
    const user  = auth.currentUser;
    if(!user) return
    dispatch(startLoading())
    try{
        await updateProfile( user, {displayName: newName});
        dispatch(loginSuccess({
            uid: user.uid,
            email: user.email,
            displayName: newName,
        }));
    } catch(error) {
        dispatch(loginFailure(error.message))
    }
};

export const updateUserPassword = (user, newPassword)=> async (dispatch)=>{
    const user  = auth.currentUser;
    if(!user) return
    dispatch(startLoading())
    try {
        await updatePassword(user, newPassword);
        toast.success('пароль успешно изменён!');
    } catch (error) {
        if(error.code === 'auth/requires-recent-login'){
            toast.info("Нужно перезайти в аккаунт, чтобы сменить пароль")
        }
        dispatch(loginFailure(error.message));
    }
} 