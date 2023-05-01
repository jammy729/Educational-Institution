import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);

  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/read")
      .then((response) => {
        console.log(response.data);
        setFoodList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToList = () => {
    if (!foodName) {
      alert("Please enter a food name");
      return;
    }
    axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updateFood = (id) => {
    axios.put(`http://localhost:3001/update/${id}`, {
      newFoodName: newFoodName,
    });
  };

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`);
    console.log(`Deleted ${id}`);
  };

  return (
    <React.Fragment>
      <div
        className="container-fluid"
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          justifyContent: "center",
          paddingLeft: "30px",
        }}
      >
        <h1>CRUD App</h1>
        <label htmlFor="">Food Name</label>
        <input
          type="text"
          onChange={(event) => {
            setFoodName(event.target.value);
          }}
        />
        <label htmlFor="">Days since you ate</label>
        <input
          type="number"
          onChange={(event) => {
            setDays(parseInt(event.target.value));
          }}
        />
        <button onClick={addToList}>Add to list</button>
        <h1>Data</h1>

        {foodList.length > 0 &&
          foodList.map((food, index) => {
            return (
              <div key={index}>
                <p>{food.foodName}</p>
                <p>{food.daysSinceIAte}</p>
                <input
                  type="text"
                  placeholder="New Food Name"
                  onChange={(event) => {
                    setNewFoodName(event.target.value);
                    console.log("setting foodName to:", event.target.value);
                  }}
                />
                <button onClick={() => updateFood(food._id)}>Update</button>
                <button onClick={() => deleteFood(food._id)}>Delete</button>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default App;
