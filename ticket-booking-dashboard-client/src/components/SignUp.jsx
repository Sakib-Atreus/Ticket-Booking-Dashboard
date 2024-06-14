import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import Swal from "sweetalert2";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password, data.photoURL).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            image: data.photoURL,
          };

          fetch("https://ticket-booking-dashboard-server.vercel.app/user", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.insertedId) {
                // console.log(data);
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <div className="signup-page hero min-h-screen">
        <div className="hero-content flex-col-reverse lg:flex-row mt-16">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl ">
            <h1 className="text-4xl font-bold text-center m-2 text-green-500">
              SignUp
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered text-white"
                  required
                />
                {errors.name?.type === "required" && (
                  <p className="text-green-600">Name is required</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  name="photoURL"
                  placeholder="Photo URL"
                  className="input input-bordered text-white"
                  required
                />
                {errors.photoUrl?.type === "required" && (
                  <p className="text-green-600">Photo URL is required</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="Email"
                  className="input input-bordered text-white"
                  required
                />
                {errors.email?.type === "required" && (
                  <p className="text-green-600">Email is required</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered text-white"
                  required
                />
                {errors.password?.type === "required" && (
                  <p className="text-green-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-green-600">
                    Password must be 6 characters
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-green-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-green-600">
                    Password must have one upper case, one lower case, one
                    number and one special character
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-green-700 text-white"
                  value="SIGN UP"
                  type="submit"
                />
              </div>
              <p className="text-sm text-center text-green-400 text-semibold">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 text-bold">
                  Please Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
