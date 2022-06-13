import React from "react";
import Footer from "../components/layout/Footer";
import Table from "../components/table/Table";

const CartPage = () => {
  return (
    <div>
      <div className="container mb-5">
        <h2 className="font-medium text-center text-4xl my-5">Shopping Cart</h2>
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-3 ">
            <Table
              className={
                "border-collapse border border-slate-500 overflow-hidden"
              }
            >
              <thead>
                <tr>
                  <th className="border border-[#dee2e6]">Item</th>
                  <th className="border border-[#dee2e6]">Price</th>
                  <th className="border border-[#dee2e6]">Qty</th>
                  <th className="border border-[#dee2e6]">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[#dee2e6]">
                    <div className="flex items-center gap-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1636246441747-7d7f83f4629c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                        alt=""
                        className="object-cover w-10 h-10 rounded-md flex-shrink-0"
                      />
                      <div className="">
                        <h3>Ao mua dong</h3>
                      </div>
                    </div>{" "}
                  </td>
                  <td className="border border-[#dee2e6]"> 2990$</td>
                  <td className="border border-[#dee2e6]">
                    {" "}
                    <div className="flex">
                      <div className="border border-gray-300">
                        <input
                          type="text"
                          value={1}
                          className="bg-white w-[70px]  rounded-md py-2 pl-9 pr-3 h-full sm:text-sm"
                        />
                      </div>
                      <div className="">
                        <div className="border border-gray-300 text-[#666]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </div>
                        <div className="border border-gray-300 text-[#666]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border border-[#dee2e6]">
                    <div className="flex justify-between">
                      <div className="font-bold flex text-center items-center ">
                        $2300
                      </div>
                      <div className=" flex flex-col gap-y-2">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="col-span-1 bg-white">
            <div className="border-b-[1px] border-[#dee2e6]">
              <h3 className="text-center py-4 font-medium text-xl">Summary</h3>
            </div>
            <div className="border-b-[1px] border-[#dee2e6]">
              <div className="flex justify-between px-5 pt-3 ">
                <span className="font-bold ">Subtotal</span>
                <span>$280</span>
              </div>
              <div className="flex justify-between px-5 pt-3">
                <span className="font-bold ">Shipping</span>
                <span>$280</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="font-bold ">Order Total</span>
                <span>$280</span>
              </div>
            </div>
            <div className="pt-4">
              <button className="w-full py-4  text-white bg-[#16bcdc]">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CartPage;
