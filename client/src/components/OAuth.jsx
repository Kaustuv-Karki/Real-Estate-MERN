import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
const OAuth = () => {
  const handleGoogleCLick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log("Could not sign in with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleCLick}
      type="button"
      className="bg-red-500 text-white uppercase rounded-lg p-3 hover:opacity-95 transition-all">
      Sign In With Google
    </button>
  );
};

export default OAuth;
