import { useAppDispatch } from "@/features/hooks";
import { logOut } from "@/features/Auth/authSlice";
import { useLogoutMutation } from "@/features/Auth/authApiSlice";
import { apiSlice } from "@/features/api/api";

export default function useLogout() {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async() => {
    try {
      //logout api endpoint
      await logout(undefined).unwrap();
    } catch (error) {
      console.error(error)
    } finally {
      //clear RTK Query cache
      dispatch(apiSlice.util.resetApiState())
      //dispatch logOut function. It will trigger the store to reset
      dispatch(logOut())
    }
  }

  return handleLogout;
}