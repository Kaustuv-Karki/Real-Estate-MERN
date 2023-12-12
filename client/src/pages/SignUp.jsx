import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-[3rem] ">Register</h1>
      <form className="flex flex-col w-[80vw] max-w-[40rem] gap-4">
        <input
          className=" border p-3 rounded-md outline-none"
          type="text"
          placeholder="Username"
        />

        <input
          className=" border p-3 rounded-md outline-none"
          type="email"
          placeholder="Email"
        />

        <input
          className=" border p-3 rounded-md outline-none"
          type="password"
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:opacity-80 disabled:opacity-50">
          Submit
        </button>
      </form>
      <div className="flex gap-2 py-2">
        <p>Already have a account? </p>
        <Link to="/signin" className="text-blue-500">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
