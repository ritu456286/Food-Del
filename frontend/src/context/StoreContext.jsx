import { createContext, useEffect, useState } from "react";
import axios  from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    
    
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState(localStorage.getItem("token") ||"");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
           setCartItems(prevCartItems => ({...prevCartItems, [itemId]: 1}))
        }else{
            setCartItems(prevCartItems => ({...prevCartItems, [itemId]: prevCartItems[itemId] + 1}));
        }
        if(token){
            await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}});
        }
    }
    

    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems]);

    const removeFromCart = async (itemId) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = {...prevCartItems}
            if(updatedCartItems[itemId] > 1){
                updatedCartItems[itemId] -= 1;
            }else{
                //remove this item from cart
                delete updatedCartItems[itemId];
            }
            return updatedCartItems;
        })

        if(token){
            await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}});
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const itemId in cartItems){
            if(cartItems[itemId] > 0){
                let itemInfo = food_list.find((product) => product._id === itemId);
                totalAmount += itemInfo.price * cartItems[itemId]
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async() => {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, {headers:{token}});
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            // await loadCartData(localStorage.getItem("token"));
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list, 
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children} {/*this wraps the components that will be able to use the context value, only these compoeents have access to food list*/}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;