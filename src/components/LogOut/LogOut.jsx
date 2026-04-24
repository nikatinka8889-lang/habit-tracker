import { auth } from "../../firebase/firebase"; 
  import { signOut } from "firebase/auth";
import logOutcss from './logOut.module.css'
import { logoutSuccess } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import imageLogOut from "/src/assets/Images/log-out-40.svg"
export default function LogOut() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logoutSuccess());
      toast.success("Выход выполнен");
    } catch (error) {
      toast.error("Ошибка при выходе:", error.message);
    }
  };

  return (
    <button className={logOutcss.LogOutButton} onClick={handleLogout}><img  src={imageLogOut} alt="logOut"  width='100'/></button>
  );
}