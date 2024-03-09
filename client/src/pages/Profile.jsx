import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutStart,
  signOutFailure,
  signOutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Listing from "../../../api/models/listing.model";

const Profile = () => {
  const { currentUser, loading, error } = useSelector(
    (state) => state.user || {}
  );
  const imgRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercent, setfilePercent] = useState(0);
  // const [error, isError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  console.log(file);
  console.log("formData", formData);
  console.log(filePercent);

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilePercent(Math.round(progress));
      },
      (error) => {
        isError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser.others._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data.others));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser.others._id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    console.log(currentUser.others._id, "show listings clicked");
    try {
      const res = await fetch(`/api/user/listings/${currentUser.others._id}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings(data);
      // res.status(200).json(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserListingDelete = async (id) => {
    try {
      const res = await fetch(`api/listing/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings(userListings.filter((listing) => listing._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-bold">Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col p-4 justify-center items-center">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={imgRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => imgRef.current.click()}
            src={formData.avatar || currentUser.others.avatar}
            alt=""
            className="rounded-full h-20 w-20 cursor-pointer"
          />
          <p>
            {" "}
            {error ? (
              <span className="text-red-500 text-center">
                Error Occured is image less than 2MB?
              </span>
            ) : filePercent > 0 && filePercent < 100 ? (
              <span className="text-green-500">
                Uploading... {filePercent} %
              </span>
            ) : filePercent === 100 ? (
              <span className="text-green-500">
                Profile Image succesfully changed
              </span>
            ) : (
              <></>
            )}
          </p>
        </div>
        <div className="flex flex-col w-[80%] max-w-[500px] mx-auto gap-4">
          <input
            defaultValue={currentUser.others.username}
            className="outline-none py-2 px-5 rounded-md"
            placeholder="Username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            defaultValue={currentUser.others.email}
            className="outline-none py-2 px-5 rounded-md"
            placeholder="Email"
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <input
            placeholder="Password"
            className="outline-none py-2 px-5 rounded-md"
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <button
            disabled={loading}
            className="bg-green-500 py-2 rounded-md text-white uppercase hover:opacity-85 transition-all">
            {loading ? "Loading... " : " Update Deatails"}
          </button>
          <Link
            to="/createListing"
            className="bg-blue-500 py-2 rounded-md text-white uppercase hover:opacity-85 transition-all items-center justify-center flex">
            Create Listing
          </Link>
          <div className="flex justify-between p-1">
            <span
              className="text-red-500 cursor-pointer"
              onClick={handleDeleteUser}>
              Delete Account
            </span>
            <span
              className="text-red-500 cursor-pointer"
              onClick={handleSignOut}>
              Sign Out
            </span>
          </div>
        </div>
      </form>
      <div className="w-[90%] max-w-[500px] mx-auto flex flex-col items-center justify-center  mt-6">
        <button
          onClick={handleShowListings}
          className="bg-blue-500 py-2 px-5 text-white  uppercase rounded-md">
          Show Listings
        </button>
        <div className="mt-10 w-full">
          {userListings.length > 0 &&
            userListings.map((listing) => (
              <div
                key={listing._id}
                className="flex items-center justify-between border-b border-gray-500 pb-4">
                <Link
                  to={`/listing/${listing._id}`}
                  className="flex items-center gap-4">
                  <img
                    className="h-[70px] w-full object-contain"
                    src={listing.imageUrls[0]}
                    alt="listing Image"
                  />
                  <h1 className="font-semibold text-gray-800">
                    {listing.name}
                  </h1>
                </Link>
                <div className="flex flex-col items-center justify-cante gap-2">
                  <button className="text-blue-500 font-semibold">EDIT</button>
                  <button
                    onClick={() => handleUserListingDelete(listing._id)}
                    className="text-red-500 font-semibold">
                    DELETE
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
