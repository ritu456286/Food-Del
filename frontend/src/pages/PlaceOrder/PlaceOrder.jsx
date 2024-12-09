import { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {

  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <div>
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" name="" id="" placeholder="First Name" />
            <input type="text" name="" id="" placeholder="Last Name" />
          </div>
          <input type="email" placeholder="Email address" />
          <input type="text" placeholder="Street" />
          <div className="multi-fields">
            <input type="text" name="" id="" placeholder="City" />
            <input type="text" name="" id="" placeholder="State" />
          </div>
          <div className="multi-fields">
            <input type="text" name="" id="" placeholder="Zip Code" />
            <input type="text" name="" id="" placeholder="Country" />
          </div>
          <input type="text" placeholder="Phone Number"/>
        </div>
        <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${ getTotalCartAmount() > 0 ? 2: 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + (getTotalCartAmount() > 0 ? 2: 0)}</b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
