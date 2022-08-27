import React, { useState } from "react";
import ProductNotFound from "./ProductNotFound";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Notify from "./Notify";
// import all from "../data/all";
function Products({ products, input, setItemCount, search }) {
  const cartDatas = useSelector((state) => state.cartDatas);
  const dispatch = useDispatch();
  const [notify, setNotify] = useState(false);

  // add item
  const addItem = (product) => {
    let result = cartDatas;
    const ProductExitst = result.find((item) => item.id === product.id);
    if (ProductExitst) {
      const filter = result.filter((item) => {
        return item.id !== product.id;
      });
      ProductExitst.quantity += +1;
      result = [...filter, ProductExitst];
    } else {
      result.push({ ...product, quantity: 1 });
    }
    setItemCount(result.length);
    setNotify(true);
    dispatch({ type: "UPDATE_CARTITEM", data: result });
  };
  return (
    <>
      <Notify notify={notify} setNotify={setNotify} />
      <div className="w-full h-full my-[4rem] font-myfont ">
        <div className="max-w-[1300px] 2xl:mx-auto lg:mx-[1rem] md:mx-auto sm:mx-[1rem] mx-[1rem]">
          {products.length > 0 ? (
            <div className="grid grid-cols-12 sm:gap-[2em]">
              {products.map((data) => {
                return (
                  <div
                    className="2xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 flex justify-center items-center mb-[2em] md:mb-0"
                    key={data.id}
                  >
                    <div className="rounded-lg shadow-lg bg-white max-w-sm">
                      <Link to={`/all/${data.id}`}>
                        <img
                          className="rounded-t-lg h-[200px] w-full object-cover"
                          src={data.url}
                          alt={data.name}
                        />
                      </Link>
                      <div className="p-6">
                        <h5 className="text-gray-900 text-xl font-bold mb-2">
                          {data.name}
                        </h5>
                        <p className="text-gray-600 text-base mb-4">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-base font-bold">{data.price} $</p>
                          <button
                            type="button"
                            className=" inline-block px-6 py-2.5 bg-[#666666] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#333333] hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={() => addItem(data)}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <ProductNotFound search={search} />
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
