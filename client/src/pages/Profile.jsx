import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user || {});
  const imgRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercent, setfilePercent] = useState(0);
  const [error, isError] = useState(false);
  const [formData, setFormData] = useState({});
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

  return (
    <div>
      <h1 className="text-center text-bold">Profile</h1>
      <form>
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
            className="rounded-full h-20 cursor-pointer"
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
            value={currentUser.others.username}
            className="outline-none py-2 px-5 rounded-md"
          />
          <input
            value={currentUser.others.email}
            className="outline-none py-2 px-5 rounded-md"
          />
          <input
            placeholder="Password"
            className="outline-none py-2 px-5 rounded-md"
          />
          <button className="bg-green-500 py-2 rounded-md text-white uppercase hover:opacity-85 transition-all">
            Update Deatils
          </button>
          <div className="flex justify-between p-1">
            <span className="text-red-500 cursor-pointer">Delete Account</span>
            <span className="text-red-500 cursor-pointer">Sign Out</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
