import ImageMapper from "react-img-mapper";
import blue from "../assets/images/Scena5/lab-blue.png";
import red from "../assets/images/Scena5/lab-red.png";
import green from "../assets/images/Scena5/lab-green.png";
import yellow from "../assets/images/Scena5/lab-yellow.png";
import purple from "../assets/images/Scena5/lab-purple.png";
import orange from "../assets/images/Scena5/lab-orange.png";
import empty from "../assets/images/Scena5/lab-empty.png";
import code from "../assets/images/Scena5/lab-code.png";
import hint from "../assets/images/Scena5/lab-hint.png";
import unlocked from "../assets/images/Scena5/lab-unlocked.png";
import Button from "../components/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";

const Scena5 = () => {
    const navigate = useNavigate();
    const labImages = [
        { id: 0, src: empty },
        { id: 1, src: yellow },
        { id: 2, src: blue },
        { id: 3, src: green },
        { id: 4, src: red },
        { id: 5, src: orange },
        { id: 6, src: purple },
        { id: 7, src: hint },
        { id: 8, src: code },
        { id: 9, src: unlocked },
    ];
    const [bgValue, setBgValue] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [prevBgValue, setPrevBgValue] = useState(0);
    const [lastClickedId, setLastClickedId] = useState(null);
    const [correctCode, setCorrectCode] = useState(false);

    const handleMapClick = (area) => {
        if (bgValue === 7 || bgValue === 8) {
            setBgValue(prevBgValue);
        } else {
            if (clickCount < 2 || (clickCount === 2 && area.id === "code")) {
                if (
                    lastClickedId !== area.id ||
                    !["red", "blue", "yellow"].includes(area.id)
                ) {
                    setPrevBgValue(bgValue);
                    setBgValue((prevValue) => prevValue + area.value);
                    if (area.id !== "code" && area.id !== "hint") {
                        setClickCount((prevCount) => prevCount + 1);
                    }
                    setLastClickedId(area.id);
                }
            }
        }
    };

    const handleReset = () => {
        setBgValue(0);
        setClickCount(0);
        setPrevBgValue(0);
        setLastClickedId(null);
    };

    const handleNavigate = () => {
        navigate("/scena6");
    };

    return (
        <section className="w-full h-svh flex flex-col items-center justify-center relative">
            {correctCode ? (
                <Button classes="absolute bottom-2 left-2" onClick={handleNavigate}>
                    Vai Avanti
                </Button>
            ) : (
                <Button classes="absolute bottom-2 left-2" onClick={handleReset}>
                    Reset
                </Button>
            )}
            <ImageMapper
                src={labImages[bgValue].src}
                name="lab"
                width={window.innerWidth > 1920 ? 1920 : window.innerWidth}
                height={window.innerHeight}
                parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
                responsive={true}
                onChange={(area) => {
                    if (area.id === "grid") {
                        //console.log("Navigating to scena6");
                        handleNavigate();
                    } else {
                        //console.log("Handling map click");
                        handleMapClick(area);
                    }
                }}
                areas={[
                    {
                        id: "blue",
                        shape: "poly",
                        coords: [
                            416, 398, 416, 326, 471, 327, 471, 387, 527, 524, 522, 541, 506,
                            551, 379, 554, 366, 543, 357, 524,
                        ],
                        fillColor: "rgba(0, 0, 255, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(0, 0, 255, 0.5)",
                        value: 2,
                    },
                    {
                        id: "yellow",
                        shape: "poly",
                        coords: [
                            555, 536, 620, 410, 617, 348, 676, 346, 671, 358, 669, 371, 673,
                            409, 730, 532, 730, 548, 723, 563, 717, 571, 705, 575, 581, 575,
                            564, 568, 555, 551,
                        ],
                        fillColor: "rgba(255, 255, 0, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(255, 255, 0, 0.5)",
                        value: 1,
                    },
                    {
                        id: "red",
                        shape: "poly",
                        coords: [
                            761, 507, 822, 383, 818, 327, 876, 319, 873, 349, 873, 375, 871,
                            388, 927, 509, 924, 529, 920, 544, 908, 551, 779, 548, 761, 537,
                            756, 519,
                        ],
                        fillColor: "rgba(255, 0, 0, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(255, 0, 0, 0.5)",
                        value: 4,
                    },
                    {
                        id: "code",
                        shape: "rect",
                        coords: [444, 86, 523, 181],
                        fillColor: "rgba(0, 0, 0, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(0, 0, 0, 0.5)",
                        value: 8,
                    },
                    {
                        id: "hint",
                        shape: "rect",
                        coords: [703, 190, 820, 298],
                        fillColor: "rgba(0, 0, 0, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(0, 0, 0, 0.5)",
                        value: 7,
                    },
                    {
                        id: "grid",
                        shape: "rect",
                        coords: [23, 52, 417, 240],
                        fillColor: "rgba(0, 0, 0, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(0, 0, 0, 0.5)",
                        disabled: !correctCode,
                    },
                ]}
                style={{ cursor: "pointer" }}
            />
        </section>
    );
};

export default Scena5;
