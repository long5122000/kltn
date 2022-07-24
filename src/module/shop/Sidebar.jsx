import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
      <div className="divide-y divide-gray-200 space-y-5">
        <div>
          <h3 className="text-xl text-gray-800 mb-3 mt-3 uppercase font-medium">
            Danh mục
          </h3>
          {categories.length > 0 &&
            categories.map((item) => (
              <div className="flex items-center">
                {/* <input
                  type="checkbox"
                  id="cat-1"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer "
                /> */}
                <Link
                  to={`/shop/${item.slug}`}
                  className="text-gray-600 ml-3 cursor-pointer"
                >
                  {item.name}
                </Link>
                {/* <div className="ml-auto text-gray-600 text-sm">(15)</div> */}
              </div>
            ))}
        </div>
        <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
            Giá
          </h3>
          <Link
            to={`/shop/price100000`}
            className="flex items-center text-gray-600"
          >
            {"0$ - 99999$"}
          </Link>
          <Link
            to={`/shop/100000price500000`}
            className="flex items-center text-gray-600 py-2"
          >
            {"100000 - 499999$"}
          </Link>
          <Link
            to={`/shop/price500000`}
            className="flex items-center text-gray-600"
          >
            {"500000$ and above"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
