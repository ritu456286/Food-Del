import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

   const onChangeHandler = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setData((prevData) => ({...prevData, [name]: value}))
   }


   const onSubmitHandler = async(evt) => {
    evt.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items:orderItems,
      amount: (getTotalCartAmount()+2)*80,
    } 
    let response = await axios.post(url+'/api/order/place', orderData, {headers: {token}}); // we save the order in orders Model, with payment: false
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url); //this is the payment gateway, where user enters the details
    }else{
      alert("Error!");
    }
   } 


   const navigate = useNavigate();
   useEffect(() => {
    if(!token) {
      navigate("/cart");
    }else if(getTotalCartAmount() === 0){
      navigate("/cart");
    }
   }, [token])

  return (
    <div>
      <form className="place-order" onSubmit={onSubmitHandler}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First Name" />
            <input required type="text" name="secondName" onChange={onChangeHandler} value={data.secondName} placeholder="Last Name" />
          </div>
          <input required type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email address" />
          <input required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" />
          <div className="multi-fields">
            <input required type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" />
            <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State" />
          </div>
          <div className="multi-fields">
            <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip Code" />
            <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" />
          </div>
          <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone Number"/>
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
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
