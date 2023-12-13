import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-[3rem] ">Register</h1>
      <form className="flex flex-col w-[80vw] max-w-[40rem] gap-4">
        <input
          className=" border p-3 rounded-md outline-none"
          name="username"
          type="text"
          value={userInput.username}
          onChange={(e) => handleChange(e)}
          placeholder="Username"
        />

        <input
          className=" border p-3 rounded-md outline-none"
          type="email"
          name="email"
          value={userInput.email}
          onChange={(e) => handleChange(e)}
          placeholder="Email"
        />

        <input
          className=" border p-3 rounded-md outline-none"
          type="password"
          value={userInput.password}
          name="password"
          onChange={(e) => handleChange(e)}
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
