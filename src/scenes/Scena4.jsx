import { useState, useEffect} from 'react';
import { useNavigate } from "react-router";
import ImageMapper from "react-img-mapper";
import confetti from "canvas-confetti";

import Dialogue from '../components/Dialogue';
import ImpiccatoButton from '../components/ImpiccatoButton';

import cucina_lock from '@assets/images/Scena4/Cucina_lock.png';
import cucina_unlocked from '@assets/images/Scena4/Cucina_unlock.png';
import cucina_open from '@assets/images/Scena4/Cucina_open.png';

import dispensaImg from '@assets/images/Scena4/Dispensa.jpg';
import tabletImg from '@assets/images/Scena4/Tablet.png';
import speaker_box_img from '@assets/images/generic/bg-button.png';

import sceneBitritto from '@assets/scenesBitritto.json';

const Scena4 = () => {
    const navigate = useNavigate();
    const [dispensaOpen, setDispensaOpen] = useState(false);
    const [dispensaHint, setDispensaHint] = useState(true);
    const [impiccatoOpen, setImpiccatoOpen] = useState(false);
    // Stato dell'impiccato, può solo aumentare
    const [impiccatoState, setImpiccatoState] = useState(0);
    
    
    const [hasDogFood, setHasDogFood] = useState(localStorage.getItem("hasDogFood") === null ? false : JSON.parse(localStorage.getItem("hasDogFood")));
    const [hasDogBeef, setHasDogBeef] = useState(localStorage.getItem("hasDogBeef") === null ? false : JSON.parse(localStorage.getItem("hasDogBeef")));
    // Scritta dell'impiccato
    const [impiccatoText, setImpiccatoText] = useState(localStorage.getItem("impiccatoText") === null ? ['_', '_', '_', '_', '_', '_'] : JSON.parse(localStorage.getItem("impiccatoText")));
    
    // 0: Locked, 1: Unlocked, 2: Open
    const [cucinaState, setCucinaState] = useState(hasDogBeef ? 2 : 0);
    // Animazione del pulsante "Torna da Cujo"
    const [backAnimated, setBackAnimated] = useState(false);

    useEffect(() => {
        localStorage.setItem("impiccatoText", JSON.stringify(impiccatoText));
    }, [impiccatoText]);
    
    localStorage.setItem("hasDogFood", JSON.stringify(hasDogFood));
    localStorage.setItem("hasDogBeef", JSON.stringify(hasDogBeef));

    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [scene, setScene] = useState(hasDogBeef && !hasDogFood ? {
        "dialogue": [
            {
                "type": "speaking",
                "speaker": "Detective",
                "text": "Quella dispensa potrebbe nascondere qualcosa di utile."
            },
        ]
    } : sceneBitritto.scenes[3]);

    const showCustomDialogue = (custom_dialogue) => {
        setCurrentDialogueIndex(0);
        setScene({
            dialogue: custom_dialogue
        });
    }

    return (
        <div>
            {/* Dialogues */}
            {
                scene.dialogue.map((dialogue, index) => (
                    index === currentDialogueIndex && (
                        <Dialogue key={currentDialogueIndex} dialogue={dialogue} onClose={() => {
                            if (currentDialogueIndex <= scene.dialogue.length) {
                                setCurrentDialogueIndex(currentDialogueIndex + 1);
                            } else {
                                console.log('All dialogues are finished');
                            }
                        }} />
                    )
                ))
            }

            {/* ImageMapper sfondo */}
            <div className="flex flex-col justify-center items-center h-svh">
                <ImageMapper
                    src={cucinaState == 0 ? cucina_lock : (cucinaState == 1 ? cucina_unlocked : cucina_open)}
                    name="Cucina"
                    natural
                    imgWidth={1920}
                    parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
                    responsive={true}
                    disabled={cucinaState === 2 && hasDogFood}
                    areas={[
                    {
                        id: "dispensa",
                        shape: "rect",
                        coords: [640, 72, 900, 290],
                        fillColor: "rgba(237, 20, 61, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(237, 20, 61, 0.5)",
                        active: !hasDogFood
                    },
                    {
                        id: "frigo_con_tablet",
                        shape: "rect",
                        coords: (cucinaState != 2 ? [1510, 35, 1900, 450] : [1470, 45, 1900, 450]),
                        fillColor: "rgba(237, 20, 61, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(237, 20, 61, 0.5)",
                        disabled: cucinaState === 2
                    },
                    {
                        id: "tablet",
                        shape: "rect",
                        coords: [1510, 450, 1900, 800],
                        fillColor: "rgba(42, 20, 237, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(20, 31, 237, 0.5)",
                        disabled: cucinaState != 0
                    }
                    ]}
                    onClick={(area) => {
                        if (area.id === 'dispensa') {
                            if (hasDogFood) {
                                console.log('You already have dog food');
                            } else {
                                setDispensaOpen(true);
                            }
                        } else if (area.id === 'tablet') {
                            showCustomDialogue([
                                {
                                    "type": "speaking",
                                    "speaker": "Detective",
                                    "text": "Devo risolvere questo indovinello per aprire il frigo."
                                },
                            ]);
                            
                            if (cucinaState === 0) {
                                // Apri impiccato
                                setImpiccatoOpen(true);
                                // Hide hints
                                setDispensaHint(false);
                            }
                        } else if (area.id === 'frigo_con_tablet') {
                            if (cucinaState === 1) {
                                // Apri frigo
                                setCucinaState(2);
                                showCustomDialogue([
                                    {
                                        "type": "speaking",
                                        "speaker": "Detective",
                                        "text": "Una bistecca! Questa mi servirà con Cujo."
                                    },
                                ]);
                                // Get dog beef
                                setHasDogBeef(true);
                                // Set cookie
                                localStorage.setItem("hasDogBeef", JSON.stringify(true));
                                // Make "Torna da Cujo" button animated
                                setBackAnimated(true);
                            } else {
                                showCustomDialogue([
                                    {
                                        "type": "speaking",
                                        "speaker": "Detective",
                                        "text": "Il frigo sembra bloccato... Ma quello è un tablet! Forse posso usarlo per sbloccare il frigo."
                                    },
                                ]);
                            }
                        }
                    }}
                    isMulti={false}
                />
            </div>

            {/* Impiccato */}
            {impiccatoOpen && (
                    <div className="fixed inset-0 backdrop-brightness-70 flex items-center justify-center" onClick={() => setImpiccatoOpen(false)}>
                        <div className="absolute z-4 flex flex-col items-center justify-evenly w-[64%] h-[65%]" onClick={(e) => e.stopPropagation()} >
                            <h1 className='text-[2rem] font-[Special_Elite] w-170 text-center'>Qualcosa che gli investigatori usano ogni giorno per svelare i misteri</h1>
                            <div className="flex flex-row items-center justify-between">
                                <img src={'/EscapeToTheFuture/src/assets/images/Scena4/Impiccato_cucina/' + impiccatoState + '.png'} alt={"stato " + impiccatoState + " dell'impiccato"} className='w-80' />
                                <div className="flex flex-col items-center justify-center grow-1">
                                    <div className="flex flex-row">
                                        {/* Map impiccato text char */}
                                        {impiccatoText.map((char, index) => (
                                            <div key={index} className="flex flex-col items-center justify-center">
                                                <p className='text-[2rem] font-[Special_Elite]'>{char}</p>
                                                <div className="w-10 h-1 bg-transparent"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap flex-row w-80">
                                        {/* Map buttons N E U O Z D I Z */}
                                        {['N', 'E', 'U', 'O', 'Z', 'D', 'I', 'Z'].map((keycap, index) => (
                                            <ImpiccatoButton key={index} keycap={keycap} onClick={() => {
                                                console.log(keycap);
                                                // Check if the keycap is in the text
                                                let secret_word = "INDIZI";
                                                if( secret_word.includes(keycap) ){
                                                    // Update the impiccatoText state with its localstorage
                                                    // place the pressed key in the right place
                                                    let new_text = impiccatoText.map((char, index) => 
                                                        secret_word[index] === keycap ? keycap : char
                                                    );
                                                    setImpiccatoText(new_text);
                                                    localStorage.setItem("impiccatoText", JSON.stringify(new_text));
                                                    // Check if the word is complete
                                                    if( new_text.join('') === secret_word ){
                                                        // Set cucinaState to 1
                                                        setCucinaState(1);
                                                        
                                                        confetti({
                                                                particleCount: 200,
                                                                spread: 70,
                                                                origin: { y: 1 },
                                                              });

                                                        // Show custom dialogue
                                                        showCustomDialogue([
                                                            {
                                                                "type": "speaking",
                                                                "speaker": "Detective",
                                                                "text": "Il frigo si è sbloccato! Ora posso aprirlo."
                                                            },
                                                        ]);

                                                        // Wait for the dialogue to finish
                                                        setTimeout(() => {
                                                            // Close impiccato
                                                            setImpiccatoOpen(false);
                                                        }, 3000);
                                                    }
                                                } else {
                                                    // Update the impiccatoState
                                                    if (impiccatoState < 6){
                                                        setImpiccatoState(impiccatoState + 1);
                                                    } else {
                                                        console.log('Game over');
                                                        // If impiccato reaches 6, go to game over
                                                        // TODO: navigate("/gameover?reason=impiccato")
                                                    }
                                                }
                                            }} />
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <img src={tabletImg} alt="Tablet del frigo" />
                    </div>
                )
            }

            {/* Dispensa */}
            {
                dispensaOpen ? (
                    <div className="fixed inset-0 backdrop-brightness-70 flex items-center justify-center z-2" onClick={() => setDispensaOpen(false)}>
                        <ImageMapper
                            src={dispensaImg}
                            name="Dispensa"
                            natural
                            imgWidth={1920 * 0.8}
                            parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth * .55}
                            responsive={true}
                            areas={[
                            {
                                id: "dog_food",
                                shape: "rect",
                                coords: [330, 435, 690, 800],
                                fillColor: "rgba(237, 20, 61, 0.5)",
                                lineWidth: 0,
                                strokeColor: "rgba(237, 20, 61, 0.5)",
                            },
                            {
                                id: "other",
                                shape: "poly",
                                coords: [
                                    330, 65, 
                                    330, 435,
                                    690, 435,
                                    690, 800,
                                    1060, 800,
                                    1060, 65, 
                                ],
                                fillColor: "rgba(20, 237, 24, 0.5)",
                                lineWidth: 0,
                                strokeColor: "rgba(42, 237, 20, 0.5)",
                            }
                            ]}
                            onClick={(area, index, e) => {
                                e.stopPropagation()
                                if (area.id === 'dog_food') {
                                    setHasDogFood(true);
                                    // Set cookie
                                    localStorage.setItem("hasDogFood", JSON.stringify(true));
                                    setDispensaOpen(false);
                                    // Dialogo croccantini
                                    showCustomDialogue([
                                        {
                                            "type": "speaking",
                                            "speaker": "Detective",
                                            "text": "Forse questi piaceranno a Cujo."
                                        },
                                    ]);
                                } else if (area.id === 'other') {
                                    showCustomDialogue([
                                        {
                                            "type": "speaking",
                                            "speaker": "Detective",
                                            "text": "Questo non mi serve."
                                        },
                                    ]);
                                }
                            }}
                            isMulti={false}
                        />
                    </div>
                ) : 
                (!hasDogFood && dispensaHint) && <div className="absolute left-[33%] top-[10%] scale-80 xl:left-[37%] xl:top-[13%] lg:top-[18%] lg:left-[35%] pointer-events-none z-2">
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
            }

            {/* Tablet del frigo */}



            {/* Back button */}
            <button onClick={() => { navigate("/scena3");}}>
                <div className={"absolute bottom-[7%] left-[2%] z-2 cursor-pointer" + (backAnimated && " animate-bounce")}>
                    <div>
                        <img src={ speaker_box_img } alt=''/>
                    </div>
                    <div className="absolute inset-0 flex justify-center items-center">
                        <p className={"text-[1.5rem] font-bold text-black"}>Torna da Cujo</p>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default Scena4;