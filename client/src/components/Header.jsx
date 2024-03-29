import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user || {});
  console.log("This is the current user", currentUser);
  return (
    <header className=" w-screen  py-4 px-2 border">
      <div className=" flex justify-between items-center max-w-[1200px] mx-auto">
        <Link to="/">
          <h1 className="text-[1.4rem] font-bold font-serif cursor-pointer">
            Estate
          </h1>
        </Link>
        <form className="flex items-center justify-center border py-2 px-2 rounded-md w-[20rem] p-3">
          <IoSearch className="w-10 h-5 text-gray-500" />
          <input
            className="outline-none w-[90%]"
            type="text"
            placeholder="Search"
          />
        </form>
        <div className="flex gap-6 items-center">
          <Link to="/">
            <div className="hover:underline cursor-pointer">Home</div>
          </Link>
          <Link to="/about">
            <div className="hover:underline cursor-pointer">About</div>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <div className="flex items-center justify-center gap-2">
                <img
                  src={currentUser.others.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                {/* {currentUser.others.email} */}
                {currentUser.others.username}
              </div>
            </Link>
          ) : (
            <Link to="/signin">
              <div className="hover:underline cursor-pointer">Sign In</div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
