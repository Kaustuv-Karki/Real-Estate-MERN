import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({});

  const { loading, error } = useSelector((state) => state.use || {});

  // const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-[3rem] ">Sign In</h1>
      <form
        className="flex flex-col w-[80vw] max-w-[40rem] gap-4"
        onSubmit={handleSubmit}>
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
          disabled={loading}
          type="submit"
          className="w-full p-3 uppercase bg-green-600 text-white rounded-lg hover:opacity-80 disabled:opacity-50">
          {loading ? "Loading..." : "Sign In"}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 py-2">
        <p>Don&apos;t have a account? </p>
        <Link to="/register" className="text-blue-500">
          Register
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
