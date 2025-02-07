import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { incrementAirPurifyingPlantsQuantity, decrementAirPurifyingPlantsQuantity } from "./airPurifyingPlantsSlice";
import { incrementLowLightPlantsQuantity, decrementLowLightPlantsQuantity } from "./lowLightPlantsSlice";
import { useSelector, useDispatch } from "react-redux";
import { incrementSucculentPlantsQuantity, decrementSucculentPlantsQuantity } from "./succulentPlantsSlice";

const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const succulentPlantItems = useSelector((state) => state.succulentPlant);
    const lowLightPlantItems = useSelector((state) => state.lowLightPlant);
    const airPurifyingPlantItems = useSelector((state) => state.airPurifyingPlant);
    const dispatch = useDispatch();
    //const remainingAuditoriumQuantity = 3 - succulentPlantItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

    
    const handleToggleItems = () => {
        console.log("handleToggleItems called");
        setShowItems(!showItems);
    };

    const handleAddToCart = (index) => {
        if (succulentPlantItems[index].name === "Auditorium Hall (Capacity:200)" && succulentPlantItems[index].quantity >= 3) {
          return; 
        }
        dispatch(incrementSucculentPlantsQuantity(index));
      };
    
      const handleRemoveFromCart = (index) => {
        if (succulentPlantItems[index].quantity > 0) {
          dispatch(decrementSucculentPlantsQuantity(index));
        }
      };
    const handleIncrementLowLightPlantQuantity = (index) => {
    dispatch(incrementLowLightPlantQuantity(index));
};

const handleDecrementLowLightPlantQuantity = (index) => {
    dispatch(decrementLowLightPlantQuantity(index));
};

const handleIncrementAirPurifyingPlantQuantity = (index) => {
  dispatch(incrementAirPurifyingPlantQuantity(index));
};

const handleDecrementAirPurifyingPlantQuantity = (index) => {
  dispatch(decrementAirPurifyingPlantQuantity(index));
};

/*
const handleMealSelection = (index) => {
    const item = airPurifyingPlantItems[index];
    if (item.selected && item.type === "mealForPeople") {
        // Ensure numberOfPeople is set before toggling selection
        const newNumberOfPeople = item.selected ? numberOfPeople : 0;
        dispatch(toggleMealSelection(index, newNumberOfPeople));
    }
    else {
        dispatch(toggleMealSelection(index));
    }
};
*/

const getItemsFromTotalCost = () => {
    const items = [];
    succulentPlantItems.forEach((item) => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "succulentPlant" });
      }
    });
    lowLightPlantItems.forEach((item) => {
      if (
        item.quantity > 0 &&
        !items.some((i) => i.name === item.name && i.type === "lowLightPlant")
      ) {
        items.push({ ...item, type: "lowLightPlant" });
      }
    });
    airPurifyingPlantItems.forEach((item) => {
      if (item.selected) {
        const itemForDisplay = { ...item, type: "airPurifyingPlant" };
        items.push(itemForDisplay);
      }
    });
    return items;
  };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {
        console.log(items);
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
            lowLigthPlantItems.forEach((item) => {
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
            <div className="main_container">
                {!showItems
                    ?
                    (
                        <div className="items-information">
                             <div id="venue" className="venue_container container_main">
        <div className="text">
 
          <h1>Succulent Plants Selection</h1>
        </div>
        <div className="venue_selection">
          {succulentPlantItems.map((item, index) => (
            <div className="venue_main" key={index}>
              <div className="img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="text">{item.name}</div>
              <div>${item.cost}</div>
     <div className="button_container">
        {succulentPlantItems[index].name === "Auditorium Hall (Capacity:200)" ? (

          <>
          <button
            className={succulentPlantItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
            onClick={() => handleRemoveFromCart(index)}
          >
            &#8211;
          </button>
          <span className="selected_count">
            {succulentPlantItems[index].quantity > 0 ? ` ${succulentPlantItems[index].quantity}` : "0"}
          </span>
          <button
            className={remainingAuditoriumQuantity === 0? "btn-success btn-disabled" : "btn-success btn-plus"}
            onClick={() => handleAddToCart(index)}
          >
            &#43;
          </button>
        </>
        ) : (
          <div className="button_container">
           <button
              className={succulentPlantItems[index].quantity ===0 ? " btn-warning btn-disabled" : "btn-warning btn-plus"}
              onClick={() => handleRemoveFromCart(index)}
            >
               &#8211;
            </button>
            <span className="selected_count">
              {succulentPlantItems[index].quantity > 0 ? ` ${succulentPlantItems[index].quantity}` : "0"}
            </span>
            <button
              className={succulentPlantItems[index].quantity === 10 ? " btn-success btn-disabled" : "btn-success btn-plus"}
              onClick={() => handleAddToCart(index)}
            >
             &#43;
            </button>
            
            
          </div>
        )}
      </div>
            </div>
          ))}
        </div>
        <div className="total_cost">Total Cost: ${succulentPlantsTotalCost}</div>
      </div>

                            {/*Necessary Add-ons*/}
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
            <button className="btn-warning" onClick={() => handleDecrementLowLightQuantity(index)}> &ndash; </button>
            <span className="quantity-value">{item.quantity}</span>
            <button className=" btn-success" onClick={() => handleIncrementLowLightQuantity(index)}> &#43; </button>
        </div>
    </div>
))}
                                </div>
<div className="total_cost">Total Cost: {lowLightPlantsTotalCost}</div>
                            </div>

                            {/* Meal Section */}

                            <div id="meals" className="venue_container container_main">

                                <div className="text">

                                    <h1>Air Purifying Plants Selection</h1>
                                </div>

                                <div className="input-container venue_selection">
                                <div className="input-container venue_selection">
    <label htmlFor="numberOfPeople"><h3>Number of People:</h3></label>
    <input type="number" className="input_box5" id="numberOfPeople" value={numberOfPeople}
        onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
        min="1"
    />
</div>
                                </div>
                                <div className="meal_selection">
    {airPurifyingPlantItems.map((item, index) => (
        <div className="meal_item" key={index} style={{ padding: 15 }}>
            <div className="inner">
                <input type="checkbox" id={ `meal_${index}` }
                    checked={ item.selected }
                    onChange={() => handleAirPurifyingPlantlSelection(index)}
                 />
                <label htmlFor={`meal_${index}`}> {item.name} </label>
            </div>
            <div className="meal_cost">${item.cost}</div>
        </div>
    ))}
</div>
<div className="total_cost">Total Cost: {airPurifyingPlantsTotalCost}</div>

                            </div>
                        </div>
                    ) : (
                        <div className="total_amount_detail">
    <TotalCost totalCosts={ totalCosts } ItemsDisplay={() => <ItemsDisplay items={ items } />} />
</div>
                    )
                }




            </div>
        </>

    );
};

export default ConferenceEvent;
