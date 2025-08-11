import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../features/hooks"
import { setCredentials, selectCurrentToken } from "../../features/Auth/authSlice"
import { useRefreshMutation } from "../../features/Auth/authApiSlice"
import { PuffLoader } from "react-spinners"

//able to login current user event the page is refresh
export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  const [refresh] = useRefreshMutation();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        //get the refresh token from the backend api
        const refreshData = await refresh().unwrap();

        //set the new credentials data from the refreshtoken response
        dispatch(setCredentials({
          fullname: refreshData.fullname,
          accessToken: refreshData.accessToken
        }));
      } catch (error) {
        console.error(error)

      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    //if token falsy get new token
    if (!token) {
      verifyRefreshToken()
    } else {
      setIsLoading(false)
    }


    return() => {
      isMounted = false
    }
    
  }, [])

  return (
    <div>
      { isLoading
        ? <div className="border w-full h-screen flex justify-center items-center">
            <PuffLoader size={200}/>
          </div>
        : <Outlet/>}
    </div>
  )
}