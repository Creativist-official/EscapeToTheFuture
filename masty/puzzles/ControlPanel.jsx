import React, { useState } from "react";
import SequencePuzzle from "../SequencePuzzle";

const ControlPanel = ({ onSolve }) => {
    const [isSolved, setIsSolved] = useState(false);

    const handleSolve = () => {
        setIsSolved(true);
        onSolve();
    };

    return (
        <div>
            <h3>Pannello di Controllo - Ruota Panoramica</h3>

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

            {isSolved && <p>✅ Puzzle completato! La ruota è ora accesa.</p>}
        </div>
    );
};

export default ControlPanel;
