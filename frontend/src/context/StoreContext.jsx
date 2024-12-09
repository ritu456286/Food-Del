import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {


    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
           setCartItems(prevCartItems => ({...prevCartItems, [itemId]: 1}))
        }else{
            setCartItems(prevCartItems => ({...prevCartItems, [itemId]: prevCartItems[itemId] + 1}));
        }
    }
    
    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems]);

    const removeFromCart = (itemId) => {
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

    const contextValue = {
        food_list, 
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children} {/*this wraps the components that will be able to use the context value, only these compoeents have access to food list*/}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;