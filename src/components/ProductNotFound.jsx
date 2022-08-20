import React from "react";

function ProductNotFound() {
  return (
    <div className="flex flex-col space-y-[3rem] items-center justify-center font-myfont py-[100px]">
      <h1 className="text-[50px]">Product not found</h1>
      <button
        type="button"
        className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Back
      </button>
    </div>
  );
}

export default ProductNotFound;
