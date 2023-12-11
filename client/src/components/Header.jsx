import { IoSearch } from "react-icons/io5";
const Header = () => {
  return (
    <header className=" w-screen  py-4 px-2 border">
      <div className=" flex justify-between items-center max-w-[1200px] mx-auto">
        <h1>Estate</h1>
        <form className="flex items-center justify-center border py-2 px-2 rounded-md w-[20rem] p-3">
          <IoSearch className="w-10 h-5 text-gray-500" />
          <input
            className="outline-none w-[90%]  "
            type="text"
            placeholder="Search"
          />
        </form>
        <div className="flex">
          <div className="">Home</div>
          <div className="">About</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
