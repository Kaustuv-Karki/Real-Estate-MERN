import { useSelector } from "react-redux";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user || {});
  return (
    <div>
      <h1 className="text-center text-bold">Profile</h1>
      <form>
        <div className="flex flex-col p-4 justify-center items-center">
          <img
            src={currentUser.others.avatar}
            alt=""
            className="rounded-full h-20"
          />
        </div>
        <div className="flex flex-col w-[80%] max-w-[500px] mx-auto gap-4">
          <input
            placeholder={currentUser.others.username}
            className="outline-none py-2 px-5 rounded-md"
          />
          <input
            placeholder={currentUser.others.email}
            className="outline-none py-2 px-5 rounded-md"
          />
          <input
            placeholder={currentUser.others.username}
            className="outline-none py-2 px-5 rounded-md"
          />
          <button className="bg-green-500 py-2 rounded-md text-white uppercase hover:opacity-85 transition-all">
            Update
          </button>
          <div className="flex justify-between p-1">
            <span className="text-red-500 cursor-pointer">Delete Account</span>
            <span className="text-red-500 cursor-pointer">Sign Out</span>
          </div>
        </div>
      </form>
      {console.log(currentUser)}
    </div>
  );
};

export default Profile;
