import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementSucculentPlantsQuantity, decrementSucculentPlantsQuantity } from "./succulentPlantsSlice";
import { incrementAirPurifyingPlantsQuantity, decrementAirPurifyingPlantsQuantity } from "./airPurifyingPlantsSlice";
import { incrementLowLightPlantsQuantity, decrementLowLightPlantsQuantity } from "./lowLightPlantsSlice";

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  //const [numberOfPeople, setNumberOfPeople] = useState(1);
  const succulentPlantItems = useSelector((state) => state.succulentPlant);
  console.log('succulentPlantItems', succulentPlantItems);
  const lowLightPlantItems = useSelector((state) => state.lowLightPlant);
  console.log('lowLightPlantItems', lowLightPlantItems);
  const airPurifyingPlantItems = useSelector((state) => state.airPurifyingPlant);
  console.log('airPurifyingPlantItems', airPurifyingPlantItems);
  const dispatch = useDispatch();
  const handleToggleItems = () => {
    console.log("handleToggleItems called");
    setShowItems(!showItems);
  };

  const handleAddToCart = (index) => {
    dispatch(incrementSucculentPlantsQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (succulentPlantItems[index].quantity > 0) {
      dispatch(decrementSucculentPlantsQuantity(index));
    }
  };

  const handleIncrementLowLightPlantQuantity = (index) => {
    dispatch(incrementLowLightPlantsQuantity(index));
  };

  const handleDecrementLowLightPlantQuantity = (index) => {
    if (lowLightPlantItems[index].quantity > 0) {
      dispatch(decrementLowLightPlantsQuantity(index));
    }s
  };

  const handleIncrementAirPurifyingPlantQuantity = (index) => {
    dispatch(incrementAirPurifyingPlantsQuantity(index));
  };

  const handleDecrementAirPurifyingPlantQuantity = (index) => {
    if (airPurifyingPlantItems[index].quantity > 0) {
      dispatch(decrementAirPurifyingPlantsQuantity(index));
    }
  };

  const getItemsFromTotalCost = () => {
    const items = [];
    console.log('inside getItemsFromTotalCost');
    console.log('succulentPlantItems', succulentPlantItems);
    succulentPlantItems.forEach((item) => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "succulentPlant" });
      }
    });

    console.log('lowLightPlantItems', lowLightPlantItems);
    lowLightPlantItems.forEach((item) => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "lowLightPlant" });
      };
    });

    console.log('airPurifyingPlantItems', airPurifyingPlantItems);
    airPurifyingPlantItems.forEach((item) => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "airPurifyingPlant" });
      }
    });
    return items;
  };

  const items = getItemsFromTotalCost();


    const ItemsDisplay = ({ items }) => {
      console.log('inisde of ItemDisplay');
      return <>
        <div className="display_box1">
          {items.length === 0 && <p>No items selected</p>}
          <table className="table_item_data">
            <thead>
              <tr>
                <th>Name</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    };

    const calculateTotalCost = (section) => {
      let totalCost = 0;
      if (section === "succulentPlant") {
        succulentPlantItems.forEach((item) => {
          totalCost += item.cost * item.quantity;
        });
      } else if (section === "lowLightPlant") {
        lowLightPlantItems.forEach((item) => {
          totalCost += item.cost * item.quantity;
        });
      } else if (section === "airPurifyingPlant") {
        airPurifyingPlantItems.forEach((item) => {
          totalCost += item.cost * item.quantity;
        });
      }
      return totalCost;
    };

    const succulentPlantsTotalCost = calculateTotalCost("succulentPlant");
    const lowLightPlantsTotalCost = calculateTotalCost("lowLightPlant");
    const airPurifyingPlantsTotalCost = calculateTotalCost("airPurifyingPlant");

    const navigateToProducts = (idType) => {
      if (idType == '#succulent' || idType == '#lowlight' || idType == '#airpurifying') {
        if (showItems) { // Check if showItems is false
          setShowItems(!showItems); // Toggle showItems to true only if it's currently false
        }
      }
    }
    const totalCosts = {
      succulentPlant: succulentPlantsTotalCost,
      lowLightPlant: lowLightPlantsTotalCost,
      airPurifying: airPurifyingPlantsTotalCost,
    };

    return (
      <>
        <navbar className="navbar_event_conference">
          <div className="company_logo">Phoenix House Plant Nursery</div>
          <div className="left_navbar">
            <div className="nav_links">
              <a href="#succulentplant" onClick={() => navigateToProducts("#succulentplant")} >Succulent Plants</a>
              <a href="#lowlightplant" onClick={() => navigateToProducts('#lowlightplant')}>Low Light Plants</a>
              <a href="#airpurifyingplant" onClick={() => navigateToProducts('#airpurifyingplant')}>Air Purifying Plants</a>
            </div>
            <button className="details_button" onClick={() => setShowItems(!showItems)}>
              Shopping Cart
            </button>
          </div>
        </navbar>
      </>

    );
};
export default ConferenceEvent;
