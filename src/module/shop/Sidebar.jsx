import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-app/firebase-config";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");

      const querySnapshot = await getDocs(colRef);
      let result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);
  console.log(categories);
  return (
    <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
      <div className="divide-y divide-gray-200 space-y-5">
        <div>
          <h3 className="text-xl text-gray-800 mb-3 mt-3 uppercase font-medium">
            categories
          </h3>
          {categories.length > 0 &&
            categories.map((item) => (
              <div className="flex items-center">
                {/* <input
                  type="checkbox"
                  id="cat-1"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer "
                /> */}
                <label
                  htmlFor="cat-1"
                  className="text-gray-600 ml-3 cursor-pointer"
                >
                  {item.name}
                </label>
                {/* <div className="ml-auto text-gray-600 text-sm">(15)</div> */}
              </div>
            ))}
        </div>
        <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
            categories
          </h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cat-1"
              className="text-primary focus:ring-0 rounded-sm cursor-pointer "
            />
            <label
              htmlFor="cat-1"
              className="text-gray-600 ml-3 cursor-pointer"
            >
              Bedroom
            </label>
            <div className="ml-auto text-gray-600 text-sm">(15)</div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cat-1"
              className="text-primary focus:ring-0 rounded-sm cursor-pointer "
            />
            <label
              htmlFor="cat-1"
              className="text-gray-600 ml-3 cursor-pointer"
            >
              Bedroom
            </label>
            <div className="ml-auto text-gray-600 text-sm">(15)</div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cat-1"
              className="text-primary focus:ring-0 rounded-sm cursor-pointer "
            />
            <label
              htmlFor="cat-1"
              className="text-gray-600 ml-3 cursor-pointer"
            >
              Bedroom
            </label>
            <div className="ml-auto text-gray-600 text-sm">(15)</div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cat-1"
              className="text-primary focus:ring-0 rounded-sm cursor-pointer "
            />
            <label
              htmlFor="cat-1"
              className="text-gray-600 ml-3 cursor-pointer"
            >
              Bedroom
            </label>
            <div className="ml-auto text-gray-600 text-sm">(15)</div>
          </div>
        </div>
        <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
            Price
          </h3>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
            />
            <span className="mx-3 text-gray-500">-</span>
            <input
              type="text"
              className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
            />
          </div>
        </div>

        <div className="pt-4 ">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
            Size
          </h3>
          <div className="flex items-center gap-2">
            <div className="size-selector">
              <input type="radio" name="size" className="hidden" id="size-xs" />
              <label
                htmlFor="size-xs"
                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                Xs
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" className="hidden" id="size-s" />
              <label
                htmlFor="size-s"
                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                S
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" className="hidden" id="size-m" />
              <label
                htmlFor="size-m"
                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                M
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" className="hidden" id="size-l" />
              <label
                htmlFor="size-l"
                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                L
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
          Color
        </h3>
        <div className="flex items-center gap-2">
          <div className="color-selector">
            <input
              type="radio"
              name="color"
              className="hidden"
              id="color-gray"
            />
            <label
              htmlFor="color-gray"
              className="border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block"
              style={{ backgroundColor: "#eee" }}
            ></label>
          </div>
          <div className="color-selector">
            <input
              type="radio"
              name="color"
              className="hidden"
              id="color-black"
            />
            <label
              htmlFor="color-black"
              className="border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block"
              style={{ backgroundColor: "#000" }}
            ></label>
          </div>
          <div className="color-selector">
            <input
              type="radio"
              name="color"
              className="hidden"
              id="color-red"
            />
            <label
              htmlFor="color-red"
              className="border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block"
              style={{ backgroundColor: "#fc3d57" }}
            ></label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
