import React from "react";
// import all from "../data/all";
function Products({ products, input }) {
  return (
    <div className="my-[4rem] font-myfont">
      <div className="max-w-[1300px] md:mx-auto sm:mx-[1rem] mx-[1rem]">
        <div className="grid grid-cols-12 gap-[2em]">
          {products.map((data) => {
            return (
              <div className="md:col-span-3 sm:col-span-6 col-span-12 flex justify-center">
                <div className="rounded-lg shadow-lg bg-white max-w-sm">
                  <a href="#!">
                    <img
                      className="rounded-t-lg h-[200px] w-full object-cover"
                      src={data.url}
                      alt={data.name}
                    />
                  </a>
                  <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-bold mb-2">
                      {data.name}
                    </h5>
                    <p className="text-gray-700 text-base mb-4">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <button
                      type="button"
                      className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Button
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
