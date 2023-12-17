import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth.jsx";

const SignUp = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        console.log(error);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/signin");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-[3rem] ">Register</h1>
      <form
        className="flex flex-col w-[80vw] max-w-[40rem] gap-4"
        onSubmit={handleSubmit}>
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
          disabled={loading}
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:opacity-80 disabled:opacity-50">
          {loading ? "Loading..." : "Register"}
        </button>
        <OAuth />
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
