import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateListing = () => {
  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user || {});
  useEffect(() => {
    const fecthData = async () => {
      const id = params.id;
      const res = await fetch(`/api/listing/get/${id}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      setFormData(data);
    };

    fecthData();
  }, []);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    if (e.target.id === "rent" || e.target.id === "sale") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    } else if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      const promises = [];
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("An error occurred while uploading images");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload a maximum of 6 images");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const deleteImage = (index) => {
    return () => {
      const newUrls = formData.imageUrls.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        imageUrls: newUrls,
      });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.imageUrls.length === 0) {
        setError("You must upload at least one image");
        setLoading(false);
        return;
      }
      if (formData.discountPrice >= formData.regularPrice) {
        setError("Discounted price cannot be higher than regular price");
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/listing/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser.others._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      console.log("Data", data);
      if (data.success === false) {
        setError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      console.error("Error adding document: ", error);
    }
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center">Update a Listing</h1>
      <form className="flex flex-col sm:flex-row py-4" onSubmit={handleSubmit}>
        <div className="sm:w-1/2 w-full  mr-6">
          <div className="flex flex-col gap-4 flex-1 py-4">
            <input
              onChange={handleChange}
              value={formData.name}
              placeholder="Name"
              className="border p-3"
              id="name"
              maxLength="62"
              minLength="10"
              required
            />
            <textarea
              onChange={handleChange}
              value={formData.description}
              placeholder="Description"
              className="border p-3"
              id="description"
              required
            />
            <input
              onChange={handleChange}
              value={formData.address}
              placeholder="Address"
              className="border p-3"
              id="address"
              required
            />
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking === true}
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished === true}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer === true}
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 py-4">
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.bedrooms}
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="border p-3 border-gray-300"
              />
              <p>Bedrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.bathrooms}
                type="number"
                id="baths"
                min="1"
                max="10"
                required
                className="border p-3 border-gray-300"
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.regularPrice}
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="border p-3 border-gray-300"
              />
              <div className="">
                <p>Regular Price</p>
                {formData.type !== "sale" && (
                  <span className="text-[0.8rem]">$/month</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  onChange={handleChange}
                  value={formData.discountPrice}
                  type="number"
                  id="discountPrice"
                  min="1"
                  max="10"
                  required
                  className="border p-3 border-gray-300"
                />
                <div className="">
                  <p>Discounted Price</p>
                  {formData.type !== "sale" && (
                    <span className="text-[0.8rem]">$/month</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-base text-gray-500 ml-2">
              The first image will be the cover image (max 6)
            </span>
          </p>
          <div className="flex gap-4 mt-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
              required
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="text-green-700 border border-green-700 py-2 px-4 rounded uppercase hover:shadow-lg disabled:opacity-50">
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {imageUploadError && (
            <p className="text-red-500 text-center mt-4">{imageUploadError}</p>
          )}
          {formData.imageUrls.length > 0 && (
            <div className=" w-full flex-wrap">
              {formData.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b border-black">
                  <img
                    src={url}
                    alt="listing image"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={deleteImage(index)}
                    className="bg-red-500 px-4 py-1 rounded-md text-white  h-8">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            disabled={uploading}
            className="bg-green-700 text-white py-3 px-6 rounded uppercase hover:shadow-lg mt-6">
            {loading ? "Updating..." : "Update Listing"}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
