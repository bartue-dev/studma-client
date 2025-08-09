import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import { useAppDispatch } from "../../features/hooks"
import { setCredentials } from "../../features/authSlice"
import { useLoginMutation } from "../../features/authApiSlice"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

//server error types
type ErrorTypes = {
  error?: string
} | string

//zod schema
const LoginSchema = z.object({
  username: z.string().min(2, "Username must not be empty"),
  password: z.string().min(2, "Password must not be empty")
});

//infer zod schema to be a type
type LoginData = z.infer<typeof LoginSchema>;

//Login component
export default function Login() {
  const { register, handleSubmit, formState: {errors}} = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  })
  
  const [serverError, setServerError] = useState<ErrorTypes>({});
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();


  const onSubmit = async (data: LoginData) => {

    try {

      const userData = await login({ 
        username: data.username,
        password: data.password
      }).unwrap();

      const fullname: string = userData.fullname;
      const accessToken: string = userData.accessToken;

      dispatch(setCredentials({ fullname, accessToken}));

      console.log("USER DATA:", userData)

      navigate("/welcome")
    } catch (err) {
      console.error(err)

      const error = err as {status: number}
      const serverError: ErrorTypes = {}

      if (!error?.status) {
        serverError.error = "No server response";
      } else if (error.status === 400) {
        serverError.error = "Incorrect username or password";
      } else if (error.status === 401) {
        serverError.error = "Unauthorized";
      } else {
        serverError.error = "Login Failed";
      }

      if (Object.keys(serverError).length > 0) {
        setServerError(serverError)
        return
      }
    }
  }

  return (
  <div className="font-Sans justify-items-center">
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-100 px-10 py-8 mt-15 shadow-sm border border-gray-100 rounded-md"  
    >
      <h1 className="text-xl text-center font-semibold">Student Management System</h1>

        {/* server error message */}
      {typeof serverError === "object" && serverError?.error && <p className="text-sm text-red-500">{serverError.error}</p>}

      <div className="flex flex-col justify-center gap-1">
        <label 
          htmlFor="username"
          className="text-base"
        >
          Username
        </label>
        <input 
          type="text" 
          id="username"
          {...register("username")}
          className="input"
          />
        {errors?.username && <p className="text-sm text-red-500">{errors?.username?.message}</p>}
      </div>

      <div className="flex flex-col justify-center gap-1">
        <label 
          htmlFor="password"
          className="text-base"
        >
          Password
        </label>
        <input 
          type="password" 
          id="password"
          {...register("password")}
          className="input"
          />
        {errors?.password && <p className="text-sm text-red-500">{errors?.password?.message}</p>}
      </div>
    
      <button 
        type="submit"
        className="place-self-start btn btn-primary w-full text-white"
        disabled={isLoading ? true : false}
      >
        { isLoading && <span className="loading loading-spinner text-neutral"></span> }
        Submit
      </button>

      <p className="text-sm">No account? <Link to="/register" className="link link-primary">Create an account</Link></p>
    </form>
  </div>
  )
}