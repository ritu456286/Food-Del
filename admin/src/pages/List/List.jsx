import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  
  

  const [list, setList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error in fetching Food list");
    }
  };

  const removeFoodItem = async (foodItemId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodItemId,
    });
    await fetchFoodList();
    if (response.data.success) {
      toast.success("Item removed successfully!");
    } else {
      toast.error("Error in removing the item!");
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((foodItem) => {
          return (
            <div key={foodItem._id} className="list-table-format">
              <img src={`${url}/images/` + foodItem.image} alt="" />
              <p>{foodItem.name}</p>
              <p>{foodItem.category}</p>
              <p>${foodItem.price}</p>
              <p
                className="del-food-item"
                onClick={() => removeFoodItem(foodItem._id)}
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
