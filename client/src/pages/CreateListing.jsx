const CreateListing = () => {
  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row py-4">
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
      </form>
    </main>
  );
};

export default CreateListing;
