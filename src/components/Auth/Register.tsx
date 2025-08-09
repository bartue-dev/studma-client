import { Link, useNavigate } from "react-router-dom"
import { useSignupMutation } from "../../features/Auth/authApiSlice"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useState } from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { LoaderCircle } from "lucide-react"

const RegisterSchema = z.object({
  firstname: z.string().min(2, "Firstname must be atleast 2 or more characters"),
  lastname: z.string().min(2, "Lastname must be atleast 2 or more characters"),
  username: z.string().min(2, "Username must be atleast 2 or more characters"),
  password: z.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must contain eight characters, at least one letter, one number and one special character:")
});

type RegisterData = z.infer<typeof RegisterSchema>;

export default function Register() {
  const { register, handleSubmit, formState: {errors}} = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema)
  });

  const [serverError, setServerError] = useState<{error?: string}>({})
  const navigate = useNavigate();

  const [signup, {isLoading}] = useSignupMutation();

  const onSubmit = async (data: RegisterData) => {
    try {
      const registerData = await signup({
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        password: data.password,
      });

      navigate("/login")

      console.log("REGISTER RESPONSE:", registerData)
    } catch (err) {
      console.error(err);
      
      const error = err as {status: number};
      const serverError = {} as { error: string}

      if (!error?.status) {
        serverError.error = "No server response";
      } else if (error?.status === 400) {
        serverError.error = "Failed to create an account!"
      } else {
        serverError.error = "Failed"
      }

      if (Object.keys(serverError).length > 0) {
        setServerError(serverError)
      }
    
    }
  }


  return (
  <div className="font-Sans justify-items-center bg-gray-50 h-screen py-5">
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-100 px-10 pt-8 pb-4 shadow-sm border border-gray-100 rounded-md bg-white"  
    >
      <h1 className="text-xl text-center font-semibold">Student Management System | Register </h1>

      {/* server error message */}
      {typeof serverError === "object" && serverError?.error && <p className="text-sm text-red-500">{serverError.error}</p>}

      {/* firstname */}
      <div className="flex flex-col justify-center gap-1">
        <label 
          htmlFor="firstname"
          className="text-base"
        >
          Firstname
        </label>
        <Input 
          type="text" 
          id="firstname"
          {...register("firstname")}
          className="border border-gray-300 shadow-none focus:outline-gray-400"
          />
        {errors?.firstname && <p className="text-sm text-red-500">{errors?.firstname?.message}</p>}
      </div>

      {/* lastname */}
      <div className="flex flex-col justify-center gap-1">
        <label 
          htmlFor="lastname"
          className="text-base"
        >
          Lastname
        </label>
        <Input 
          type="text" 
          id="lastname"
          {...register("lastname")}
          className="border border-gray-300 shadow-none focus:outline-gray-400"
          />
        {errors?.lastname && <p className="text-sm text-red-500">{errors?.lastname?.message}</p>}
      </div>

      {/* username */}
      <div className="flex flex-col justify-center gap-1">
        <label 
          htmlFor="username"
          className="text-base"
        >
          Username
        </label>
        <Input 
          type="text" 
          id="username"
          {...register("username")}
          className="border border-gray-300 shadow-none focus:outline-gray-400"
          />
        {errors?.username && <p className="text-sm text-red-500">{errors?.username?.message}</p>}
      </div>

      {/* password */}
      <div className="flex flex-col justify-center gap-1">
        <label 
          htmlFor="password"
          className="text-base"
        >
          Password
        </label>
        <Input 
          type="password" 
          id="password"
          {...register("password")}
          className="border border-gray-300 shadow-none focus:outline-gray-400"
          />
        {errors?.password && <p className="text-sm text-red-500">{errors?.password?.message}</p>}
      </div>
    
      {/* submit button */}
      <Button 
        type="submit"
        className="w-full border-none p-3 bg-blue-500 text-white cursor-pointer py-5"
        disabled={isLoading ? true : false}
      >
        { isLoading && <LoaderCircle className="animate-spin"/> }
        Create
      </Button>

      <p className="text-sm">Already have an account? <Link to="/login" className="underline text-blue-600">Login</Link></p>

    </form>
  </div>
  )
}