import { useState, useEffect} from 'react';
import { useNavigate } from "react-router";
import ImageMapper from "react-img-mapper";
import confetti from "canvas-confetti";

import cucina_lock from '@assets/images/Scena4/Cucina_lock.png';
import cucina_unlocked from '@assets/images/Scena4/Cucina_unlock.png';
import cucina_open from '@assets/images/Scena4/Cucina_open.png';
import ImpiccatoButton from '../components/ImpiccatoButton';

import dispensaImg from '@assets/images/Scena4/Dispensa.jpg';
import tabletImg from '@assets/images/Scena4/Tablet.png';
import speaker_box_img from '@assets/images/generic/bg-button.png';

const Scena4 = () => {
    const navigate = useNavigate();
    const [dispensaOpen, setDispensaOpen] = useState(false);
    const [dispensaHint, setDispensaHint] = useState(true);
    const [impiccatoOpen, setImpiccatoOpen] = useState(false);
    // 0: Locked, 1: Unlocked, 2: Open
    const [cucinaState, setCucinaState] = useState(0);
    // Stato dell'impiccato, può solo aumentare
    const [impiccatoState, setImpiccatoState] = useState(0);
    // Animazione del pulsante "Torna da Cujo"
    const [backAnimated, setBackAnimated] = useState(false);
    
    
    const [hasDogFood, setHasDogFood] = useState(localStorage.getItem("hasDogFood") === null ? false : JSON.parse(localStorage.getItem("hasDogFood")));
    const [hasDogBeef, setHasDogBeef] = useState(localStorage.getItem("hasDogBeef") === null ? false : JSON.parse(localStorage.getItem("hasDogBeef")));
    // Scritta dell'impiccato
    const [impiccatoText, setImpiccatoText] = useState(localStorage.getItem("impiccatoText") === null ? ['_', '_', '_', '_', '_', '_'] : JSON.parse(localStorage.getItem("impiccatoText")));

    useEffect(() => {
        localStorage.setItem("impiccatoText", JSON.stringify(impiccatoText));
    }, [impiccatoText]);
    
    localStorage.setItem("hasDogFood", JSON.stringify(hasDogFood));
    localStorage.setItem("hasDogBeef", JSON.stringify(hasDogBeef));
    return (
        <div>

            {/* ImageMapper sfondo */}
            <div className="absolute object-cover z-0">
                <ImageMapper
                    src={cucinaState == 0 ? cucina_lock : (cucinaState == 1 ? cucina_unlocked : cucina_open)}
                    name="Cucina"
                    natural
                    imgWidth={1920}
                    parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
                    responsive={true}
                    disabled={cucinaState === 2}
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
                        coords: (cucinaState != 2 ? [1510, 35, 1900, 800] : [1470, 45, 1900, 800]),
                        fillColor: "rgba(237, 20, 61, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(237, 20, 61, 0.5)",
                        active: !hasDogFood
                    },
                    ]}
                    onClick={(area) => {
                        if (area.id === 'dispensa') {
                            if (hasDogFood) {
                                console.log('You already have dog food');
                            } else {
                                setDispensaOpen(true);
                            }
                        } else if (area.id === 'frigo_con_tablet') {
                            console.log(cucinaState);
                            
                            if (cucinaState === 0) {
                                // Apri impiccato
                                setImpiccatoOpen(true);
                                // Hide hints
                                setDispensaHint(false);
                            } else if (cucinaState === 1) {
                                // Apri frigo
                                setCucinaState(2);
                            } else {
                                // Get dog beef
                                setHasDogBeef(true);
                                // Set cookie
                                localStorage.setItem("hasDogBeef", JSON.stringify(true));
                                // Make "Torna da Cujo" button animated
                                setBackAnimated(true);
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
                            <div className="flex flex-row items-center justify-between w-[100%]">
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
                                                        // Close tablet
                                                        setImpiccatoOpen(false);
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
                            ]}
                            onImageClick={(e) => e.stopPropagation()}
                            onClick={(area) => {
                                if (area.id === 'dog_food') {
                                    console.log('You got the dog food');
                                    setHasDogFood(true);
                                    // Set cookie
                                    localStorage.setItem("hasDogFood", JSON.stringify(true));
                                    setDispensaOpen(false);
                                }
                            }}
                            isMulti={false}
                        />
                    </div>
                ) : 
                (!hasDogFood && dispensaHint) && <div className="absolute left-[33%] top-[10%] scale-80 xl:left-[37%] xl:top-[13%] lg:top-[8%] lg:left-[35%] pointer-events-none z-2">
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