import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementSucculentPlantsQuantity, decrementSucculentPlantsQuantity } from "./succulentPlantsSlice";
import { incrementAirPurifyingPlantsQuantity, decrementAirPurifyingPlantsQuantity } from "./airPurifyingPlantsSlice";
import { incrementLowLightPlantsQuantity, decrementLowLightPlantsQuantity } from "./lowLightPlantsSlice";

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  let pageToDisplay = 'Product';
  let totalCartItems = 0;
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
    } s
  };

  const handleIncrementAirPurifyingPlantQuantity = (index) => {
    dispatch(incrementAirPurifyingPlantsQuantity(index));
  };

  const handleDecrementAirPurifyingPlantQuantity = (index) => {
    if (airPurifyingPlantItems[index].quantity > 0) {
      dispatch(decrementAirPurifyingPlantsQuantity(index));
    }
  };

  const handleIncrementFromCheckout = (index) => {
    //check item.type and call the respective increment function
    //dispatch(incrementAirPurifyingPlantsQuantity(index));
  };

  const handleDecrementFromCheckout = (index) => {
    //check item.type and call the respective decrement function
    /*
        if (airPurifyingPlantItems[index].quantity > 0) {
          dispatch(decrementAirPurifyingPlantsQuantity(index));
        }
    */
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
    console.log('items', items);
    return <>
      <div className="display_box1">
        {items.length === 0 && <p>No items selected for purchase</p>}
        <table className="table_item_data">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.cost}</td>
                <td>
                  <div className="addons_btn">
                    <button className="btn-warning" onClick={() => handleDecrementFromCheckout(index)}> &ndash; </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button className=" btn-success" onClick={() => handleIncrementFromCheckout(index)}> &#43; </button>
                  </div>

                </td>

                <td>${item.cost * item.quantity}</td>
                <td><button className="addons-btn">Delete</button></td>
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

  const calculateTotalItems = () => {
    return items.length;
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
            <a href="#productpage" onClick={() => setShowItems(false)}>Product Listings</a>
            <a href="#shoppingcartpage" onClick={() => setShowItems(true)}>Shopping Cart</a>
          </div>
          <button className="details_button" onClick={() => setShowItems(true)}>
            🛒 {calculateTotalItems()} Items
          </button>
        </div>
      </navbar>

      <div className="main_container">
        {!showItems
          ?
          (
            <div className="items-information">

              {/*section for succulentPlants*/}
              <div id="addons" className="venue_container container_main">

                <div className="text">

                  <h1> Succulent Plants Selection</h1>

                </div>
                <div className="venue_selection">
                  {succulentPlantItems.map((item, index) => (
                    <div className="av_data venue_main" key={index}>
                      <div className="img">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="text"> {item.name} </div>
                      <div> ${item.cost} </div>
                      <div className="addons_btn">
                        <button className="btn-warning" onClick={() => handleRemoveFromCart(index)}> &ndash; </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button className=" btn-success" onClick={() => handleAddToCart(index)}> &#43; </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="total_cost">Total Cost: {succulentPlantsTotalCost}</div>
              </div>

              {/*section for lowLightPlants*/}
              <div id="addons" className="venue_container container_main">
                <div className="text">
                  <h1> Low Light Plants Selection</h1>
                </div>
                <div className="addons_selection">
                  {lowLightPlantItems.map((item, index) => (
                    <div className="av_data venue_main" key={index}>
                      <div className="img">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="text"> {item.name} </div>
                      <div> ${item.cost} </div>
                      <div className="addons_btn">
                        <button className="btn-warning" onClick={() => handleDecrementLowLightPlantQuantity(index)}> &ndash; </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button className=" btn-success" onClick={() => handleIncrementLowLightPlantQuantity(index)}> &#43; </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="total_cost">Total Cost: {lowLightPlantsTotalCost}</div>
              </div>

              {/*section for airPurifyingPlants*/}
              <div id="addons" className="venue_container container_main">
                <div className="text">
                  <h1> Air Purifying Plants Selection</h1>
                </div>
                <div className="addons_selection">
                  {airPurifyingPlantItems.map((item, index) => (
                    <div className="av_data venue_main" key={index}>
                      <div className="img">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="text"> {item.name} </div>
                      <div> ${item.cost} </div>
                      <div className="addons_btn">
                        <button className="btn-warning" onClick={() => handleDecrementAirPurifyingPlantQuantity(index)}> &ndash; </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button className=" btn-success" onClick={() => handleIncrementAirPurifyingPlantQuantity(index)}> &#43; </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="total_cost">Total Cost: {airPurifyingPlantsTotalCost}</div>
              </div>
            </div>
          ) : (
            <div className="total_amount_detail">
              <TotalCost totalCosts={totalCosts} ItemsDisplay={() => <ItemsDisplay items={items} />} />
            </div>
          )
        }




      </div>

    </>

  );
};
export default ConferenceEvent;
