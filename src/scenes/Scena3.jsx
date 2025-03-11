import { useState } from 'react';
import Dialogue from '../components/Dialogue';

import cujoImg from '../assets/images/Scena3/Cujo.png';
import cujoWoof from '../assets/woof.mp3';
import speaker_box_img from '../assets/images/generic/bg-button.png';

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

    console.log("./public/"+ scene.scene_image);
    

    return (

        <div className={"w-full flex flex-col items-center justify-center gap-2 md:gap-10 h-svh bg-[url(./public/"+ scene.scene_image +")] bg-center bg-cover bg-origin-border bg-no-repeat gap-auto"}>
            <div key={sceneIndex} className="absolute bottom-10 z-10">
                {
                    scene.dialogue.map((dialogue, index) => (
                        index === currentDialogueIndex && (
                            <Dialogue key={index} dialogue={dialogue} onClose={() => {
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

                        <button className='absolute top-0 left-[40%] border-red-500 border-4 bg-white' onClick={() => {
                                setHasDogBeef(true);
                            }
                        }>
                            Defeat dog
                        </button>

                        <button className='border-green-500 border-4 bg-white' onClick={() => {
                                setHasDogFood(true);
                            }
                        }>
                            Get dog food
                        </button>

                        {/* Kithcen door button */}
                        <button className="z-10 border-4 border-red-500 absolute w-[20%] h-[80%] top-[20%] left-[12%] lg:h-[38%] lg:top-[36%] lg:w-[22%] lg:left-[38%] xl:h-[78%] xl:top-[20%] xl:w-[18%] xl:left-[13%] cursor-pointer bg-transparent"
                            onClick={() => {
                                if (hint == "kitchen") {
                                    setHint("");
                                }
                                if (!hasDogFood) {
                                    setSceneIndex(3);
                                } else if (!hasDogBeef) {
                                    setSceneIndex(5);
                                }
                                setCurrentDialogueIndex(0);
                            }}
                        ></button>

                        <div className="flex items-center justify-center w-full h-full relative top-23 left-5">
                            <img className='w-70 relative bottom-5 lg:w-100 lg:top-10 xl:top-20 xl:scale-120' src={cujoImg} alt="" />
                            <button
                                className={"border-blue-500 border-4 absolute w-[65%] h-[70%] top-[6%] left-[15%] lg:h-[38%] lg:top-[36%] lg:w-[22%] lg:left-[38%] xl:h-[87%] xl:top-[25%] xl:w-[90%] xl:left-[0%] cursor-pointer bg-transparent"}
                                onClick={() => {
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
                                        // TODO: Dog is defeated, go to scene Scena4 using router
                                    }
                                    setCurrentDialogueIndex(0);
                                    
                                    if (!hasDogBeef || !hasDogFood) {
                                        // Player does not have dog food or beef. Highlight the door
                                        setHint("kitchen");
                                    } else {
                                        setHint("");
                                    }
                                }}
                            ></button>
                        </div>
                    </div>
                ) : (
                    <div className={"w-100 h-100"}>

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