import React, { useState } from "react";

const SequencePuzzle = ({ sequence, buttons, onSolve, errorMessage }) => {
    const [inputSequence, setInputSequence] = useState([]);

    const handleButtonClick = (value) => {
        const newSequence = [...inputSequence, value];
        setInputSequence(newSequence);

        if (newSequence.length === sequence.length) {
            if (JSON.stringify(newSequence) === JSON.stringify(sequence)) {
                onSolve(); // Puzzle risolto!
            } else {
                alert(errorMessage || "Sequenza errata! Riprova.");
                setInputSequence([]); // Resetta la sequenza
            }
        }
    };

    return (
        <div>
            <h3>Puzzle a Sequenza</h3>
            {buttons.map((button) => (
                <button key={button.value} onClick={() => handleButtonClick(button.value)}>
                    {button.label}
                </button>
            ))}
        </div>
    );
};

export default SequencePuzzle;
