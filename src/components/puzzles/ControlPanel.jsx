import React, { useState } from "react";
import SequencePuzzle from "../SequencePuzzle";
import ferrisWheelOff from "../../assets/images/ruotapanoramica_off.jpg"
import ferrisWheelOn from "../../assets/images/ruotapanoramica_on.jpg"

const ControlPanel = ({ onSolve }) => {
    const [isSolved, setIsSolved] = useState(false);

    const handleSolve = () => {
        setIsSolved(true);
        onSolve();
    };

    return (
        <div>
            <h3>Pannello di Controllo - Ruota Panoramica</h3>

            {/* Mostra l'immagine della ruota panoramica */}
            <img
                src={isSolved ? ferrisWheelOn : ferrisWheelOff}
                alt="Ruota Panoramica"
                style={{ width: "300px", height: "auto" }}
            />

            {/* Puzzle della Ruota */}
            {!isSolved && (
                <SequencePuzzle
                    sequence={["yellow", "red", "blue"]}
                    buttons={[
                        { value: "yellow", label: "🟡 Giallo" },
                        { value: "red", label: "🔴 Rosso" },
                        { value: "blue", label: "🔵 Blu" }
                    ]}
                    onSolve={handleSolve}
                    errorMessage="Hai sbagliato la combinazione della ruota!"
                />
            )}

            {isSolved && <p>🎡 La Ruota Panoramica è accesa!</p>}
        </div>
    );
};

export default ControlPanel
