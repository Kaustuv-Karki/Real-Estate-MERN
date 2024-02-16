const CreateListing = () => {
  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row py-4">
        <div className="sm:w-1/2 w-full  mr-6">
          <div className="flex flex-col gap-4 flex-1 py-4">
            <input
              placeholder="Name"
              className="border p-3"
              id="name"
              maxLength="62"
              minLength="10"
              required
            />
            <input
              placeholder="Description"
              className="border p-3"
              id="description"
              required
            />
            <input
              placeholder="Address"
              className="border p-3"
              id="address"
              required
            />
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 py-4">
            <div className="flex items-center gap-2">
              <input
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
                type="number"
                id="regularprice"
                min="1"
                max="10"
                required
                className="border p-3 border-gray-300"
              />
              <div className="">
                <p>Regular Price</p>
                <span className="text-[0.8rem]">$/month</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedprice"
                min="1"
                max="10"
                required
                className="border p-3 border-gray-300"
              />
              <div className="">
                <p>Discounted Price</p>
                <span className="text-[0.8rem]">$/month</span>
              </div>
            </div>
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
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
              required
            />
            <button className="text-green-700 border border-green-700 py-2 px-4 rounded uppercase hover:shadow-lg disabled:opacity-50">
              Upload
            </button>
          </div>
          <button className="bg-green-700 text-white py-3 px-6 rounded uppercase hover:shadow-lg mt-6">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
