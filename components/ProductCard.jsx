import { addToCart, removeFromCart } from "@/lib/features/cart/cartSlice";
import { itemNumbers } from "@/rawData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCartPlusFill, BsFillCartXFill } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";

export default function ProductCard({ product }) {
  const { user } = useSelector((state) => state.auth);
  // console.log("user in card : ", user);

  const itemType = [];
  const itemPrice = [];

  //   finding keys
  const keys = Object.keys(product?.price);
  keys.forEach((type) => itemType.push(type));
  //   finding values
  keys.forEach((key) => itemPrice.push(product.price[key]));

  const [item, setItem] = useState(1);
  const [price, setPrice] = useState(itemPrice[0]);
  // console.log("item and price : ", item, " ", price);

  const [finalPrice, setFinalPrice] = useState(itemPrice[0]);

  // console.log("Item type : ", itemType);
  // console.log("Item price : ", itemPrice);
  // console.log("final price : ", item * price);

  // useeffect
  useEffect(() => {
    setFinalPrice(item * price);
  }, [item, price]);

  // using redux toolkit
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // console.log("cartItems in cart {Home Page} : ", cartItems);

  const addFoodToCart = () => {
    const updatedProduct = {
      ...product,
    };
    updatedProduct.price = finalPrice;
    updatedProduct.quantity = parseInt(item);
    dispatch(addToCart(updatedProduct));
  };

  return (
    // card
    <div className="sm:w-[30%] md:w-[23%] rounded shadow w-[95%] gap-2 justify-center h-64 flex-col flex text-black bg-white p-2 pt-1">
      {/* image */}
      <Link
        href={`/item/${product._id}`}
        className="h-[45%] w-full overflow-hidden rounded-t "
      >
        <img
          src={product?.img}
          alt="img"
          className="w-full h-full object-cover"
        />
      </Link>

      {/* about */}
      <div className="w-full flex flex-col items-start justify-center gap-2">
        <Link href={`/item/${product._id}`}>
          <h3 className="font-semibold text-sm">{product?.name}</h3>
          <p className="text-xs text-gray-700">
            {product?.description.substring(0, 50)}...
          </p>
        </Link>

        {/* item options */}
        <div className="flex w-full justify-between items-center my-2 text-sm">
          <div>
            <select
              className="bg-gray-200 w-fit px-2 rounded border overflow-hidden outline-none border-gray-400"
              onChange={(e) => setItem(e.target.value)}
              name="item"
              id="item"
            >
              {itemNumbers.map((num, i) => (
                <option key={i} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/*item type*/}
          <div>
            <select
              className="bg-gray-200 w-fit px-2 rounded border overflow-hidden outline-none border-gray-400"
              onChange={(e) => setPrice(e.target.value)}
              name="itemType"
              id="itemType"
            >
              {itemType.map((type, i) => (
                <option key={i} value={itemPrice[i]}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* final price */}
        <div className="flex w-full items-center justify-between text-sm">
          {user?.isAdmin ? (
            <>
              <Link
                href={`/food/${product._id}`}
                className="border flex gap-2 items-center py-1 px-2 text-sm font-semibold bg-orange-200 border-orange-700 rounded shadow text-orange-900"
              >
                <FiEdit3 />
                <span>Manage</span>
              </Link>
            </>
          ) : (
            <>
              {cartItems.some((it) => it._id === product?._id) ? (
                <button
                  onClick={() => dispatch(removeFromCart(product?._id))}
                  className="border flex gap-2 items-center py-1 px-2 text-sm font-semibold bg-orange-200 border-orange-700 rounded shadow text-orange-900"
                >
                  <span>Remove</span>
                  <BsFillCartXFill />
                </button>
              ) : (
                <button
                  onClick={addFoodToCart}
                  className="border flex gap-2 items-center py-1 px-2 text-sm font-semibold bg-orange-200 border-orange-700 rounded shadow text-orange-900"
                >
                  <span>Add</span>
                  <BsFillCartPlusFill />
                </button>
              )}
            </>
          )}

          <span className="font-semibold text-lg">₹{finalPrice}/-</span>
        </div>
      </div>
    </div>
  );
}
