import React from "react";

const Inventory = ({ inventory }) => {
    return (
        <div>
            <h3>Inventario</h3>
            <ul>
                {inventory.length > 0 ? (
                    inventory.map((item, index) => <li key={index}>{item}</li>)
                ) : (
                    <p>Nessun oggetto raccolto.</p>
                )}
            </ul>
        </div>
    );
};

export default Inventory;
