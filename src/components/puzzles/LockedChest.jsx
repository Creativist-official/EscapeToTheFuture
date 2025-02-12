import React, { useState } from "react";
import SequencePuzzle from "../SequencePuzzle";

const LockedChest = ({ onUnlock }) => {
    return (
        <SequencePuzzle
            sequence={["1", "2", "3"]} // Codice segreto
            buttons={[
                { value: "1", label: "1️⃣" },
                { value: "2", label: "2️⃣" },
                { value: "3", label: "3️⃣" },
                { value: "4", label: "4️⃣" }
            ]}
            onSolve={() => {
                alert("Baule aperto!");
                onUnlock();
            }}
            errorMessage="Codice errato! Riprova."
        />
    );
};

export default LockedChest;
