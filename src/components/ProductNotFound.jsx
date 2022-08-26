import React from "react";

function ProductNotFound({ search }) {
  const deleteInput = () => {
    search("");
  };
  return (
    <div className="flex flex-col space-y-[3rem] items-center justify-center font-myfont py-[100px]">
      <h1 className="text-[50px]">Product Not Found</h1>
      <button
        type="button"
        className=" inline-block px-6 py-2.5 bg-[#666666] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#333333] hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => deleteInput()}
      >
        Back
      </button>
    </div>
  );
}

export default ProductNotFound;
