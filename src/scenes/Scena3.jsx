import { useState } from 'react';
import ImageMapper from "react-img-mapper";
import Dialogue from '../components/Dialogue';

import cujoImg from '../assets/images/Scena3/Cujo.png';
import cujoWoof from '../assets/woof.mp3';
import speaker_box_img from '../assets/images/generic/bg-button.png';
import { useNavigate } from "react-router";

import sceneBitritto from '../assets/scenesBitritto.json';

const Scena3 = () => {
    // Questa è la scena della cucina, compresa di ostacolo canino.
    const [sceneIndex, setSceneIndex] = useState(2);
    const scene = sceneBitritto.scenes[sceneIndex];
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

    const [dispensaOpen, setDispensaOpen] = useState(false);

    const [hasDogFood, setHasDogFood] = useState(false);
    const [hasDogBeef, setHasDogBeef] = useState(false);
    const [hint, setHint] = useState("");

    const navigate = useNavigate();

    return (

        <div className={"w-full flex flex-col items-center justify-center gap-2 md:gap-10 h-svh gap-auto"}>
            {/* Dialogues */}
            <div key={sceneIndex} className="absolute bottom-10 z-10">
                {
                    scene.dialogue.map((dialogue, index) => (
                        index === currentDialogueIndex && (
                            <Dialogue key={currentDialogueIndex} dialogue={dialogue} onClose={() => {
                                // If kitchen scene, show only first dialogue
                                console.log("Scene "+ sceneIndex+": "+scene.title);
                                
                                if (currentDialogueIndex < scene.dialogue.length - 1) {
                                    setCurrentDialogueIndex(currentDialogueIndex + 1);
                                } else {
                                    // All dialogues are finished, show the button to go to the next scene
                                    console.log('All dialogues are finished');
                                }

                            }} />
                        )
                    ))
                }
            </div>
            {/* End dialogues */}

            <ImageMapper
                src={"./" + scene.scene_image}
                name="Sfondo"
                natural
                parentWidth={window.innerWidth}
                responsive={true}
                disabled={currentDialogueIndex < scene.dialogue.length - 1}
                areas={[
                    sceneIndex %2 == 0 ? ({
                    id: "porta_cucina",
                    shape: "rect",
                    coords: [256, 256, 600, 950],
                    fillColor: "rgba(237, 20, 61, 0.5)",
                    lineWidth: 0,
                    strokeColor: "rgba(237, 20, 61, 0.5)",
                }) : ({
                    id: "dispensa",
                    shape: "rect",
                    coords: [256, 256, 600, 950],
                    fillColor: "rgba(237, 20, 61, 0.5)",
                    lineWidth: 0,
                    strokeColor: "rgba(237, 20, 61, 0.5)",
                }, 
                {
                    id: "tablet",
                    shape: "rect",
                    coords: [256, 256, 600, 950],
                    fillColor: "rgba(237, 20, 61, 0.5)",
                    lineWidth: 0,
                    strokeColor: "rgba(237, 20, 61, 0.5)",
                }),
                ]}
                onChange={() => alert("porta")}
                isMulti={false}
            />

            <div className="absolute pt-50">
                <ImageMapper
                    src={cujoImg}
                    name="Cane"
                    natural
                    parentWidth={window.innerWidth * 0.25}
                    responsive={true}
                    disabled={currentDialogueIndex < scene.dialogue.length - 1}
                    areas={[
                    {
                        id: "cane",
                        shape: "rect",
                        coords: [75, 50, 350, 400],
                        fillColor: "rgba(20, 49, 237, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(20, 20, 237, 0.5)",
                    },
                    ]}
                    onClick={() => {
                        console.log("Cane cliccato");
                        
                        const audio = new Audio(cujoWoof);
                        audio.play();

                        if (hasDogFood) {
                            setSceneIndex(4);
                            setCurrentDialogueIndex(0);
                        } else if (hasDogBeef) {
                            if (currentDialogueIndex >= scene.dialogue.length - 1) {
                                // Set scene to scene 6 and reset the dialogue
                                setSceneIndex(6);
                            }
                            navigate("/scena4");
                        }
                        setCurrentDialogueIndex(0);
                        
                        if (!hasDogBeef || !hasDogFood) {
                            // Player does not have dog food or beef. Highlight the door
                            setHint("kitchen");
                        } else {
                            setHint("");
                        }
                    }}
                    isMulti={false}
                />
            </div>

            
            {
                sceneIndex %2 == 0 ? (
                    <div>
                        {/* Hint */}
                        {
                            hint == "kitchen" && scene == sceneBitritto.scenes[2] && (
                                <div className="absolute left-[16%] top-[40%] z-10 xl:left-95 xl:z-10">
                                    <svg width="100" height="100">
                                        <circle cx="50" cy="50" r="40" fill="#5c5c5c75">
                                            <animate
                                                attributeName="r"
                                                values="40;45;40"
                                                dur="2s"
                                                repeatCount="indefinite"
                                            />
                                        </circle>
                                    </svg>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div className={"w-100 h-100 "}>

                        {/* Croccantini button */}
                        {
                            (!hasDogFood && sceneIndex == 3) && (
                                <button className="z-10 w-[31%] h-[24%] relative left-[12%] -top-[2%]" onClick={() => {
                                    // Open dispensa
                                    setDispensaOpen(true);
                                }} >
                                    <div className="absolute left-[10%] top-[0%] scale-80 xl:left-[37%] xl:top-[7%] z-10">
                                        <svg width="100" height="100">
                                            <circle cx="50" cy="50" r="40" fill="#5c5c5c75">
                                                <animate
                                                    attributeName="r"
                                                    values="40;45;40"
                                                    dur="2s"
                                                    repeatCount="indefinite"
                                                />
                                            </circle>
                                        </svg>
                                    </div>
                                </button>
                            )
                        }

                        {/* Dispensa */}
                        {
                            dispensaOpen && (
                                <div className="fixed inset-0 backdrop-brightness-70 flex items-center justify-center z-20" onClick={() => setDispensaOpen(false)}>
                                    <img src="./public/assets/images/Scena3/Dispensa.jpg" alt="" className="max-h-[80%]" onClick={(e) => e.stopPropagation()} />
                                    <button onClick={() => {
                                        setHasDogFood(true);
                                        setDispensaOpen(false);
                                    }}>
                                        <div className="absolute left-[36%] bottom-[18%] scale-80 xl:left-[37%] xl:top-[7%] z-10">
                                            <svg width="100" height="100">
                                                <circle cx="50" cy="50" r="40" fill="#5c5c5c75">
                                                    <animate
                                                        attributeName="r"
                                                        values="40;45;40"
                                                        dur="2s"
                                                        repeatCount="indefinite"
                                                    />
                                                </circle>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            )
                        }

                        <button onClick={() => { setSceneIndex(2);}} >
                            <div className={ "absolute bottom-[5%] left-[0%] scale-80"}>
                                <div>
                                    <img src={ speaker_box_img } alt=''/>
                                </div>
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <p className={"text-[1.5rem] font-bold text-black"}>Torna da Cujo</p>
                                </div>
                            </div>
                        </button>
                        
                    </div>
                )
            }
            

        </div>
    );
};

export default Scena3;