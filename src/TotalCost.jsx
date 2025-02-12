import React, { useState, useEffect } from 'react';
import "./TotalCost.css";

const TotalCost = ({ totalCosts, ItemsDisplay }) => {
    const total_amount = totalCosts.succulentPlants + totalCosts.lowLightPlants + totalCosts.airPurifyingPlants;
    console.log("In TotalCost.jsx");
    console.log(totalCosts);
    console.log(total_amount);
    //const total_amount = 42;
    return (
        <div className="pricing-app">
            <div className="display_box">
                <div className="header">
                    <p className="preheading"><h3>Total cost for everything selected</h3></p>
                    <p className="preheading"><h3>Total number of plants selected</h3></p>

                </div>
                <div>
                    <h2 id="pre_fee_cost_display" className="price">
                        ${total_amount}
                    </h2>
                    <div className="render_items">
                        <ItemsDisplay />
                    </div>
                    <br />
                    <br />
                    <div>
                        <button className="details_button" >
                            Check Out - coming soon
                        </button>

                    </div>
                    <br />
                    <br />
                    <button className="details_button" onClick={() => setShowItems(true)}>
                        Contine Shopping
                    </button>

                </div>
            </div>
        </div>
    );
};
export default TotalCost;