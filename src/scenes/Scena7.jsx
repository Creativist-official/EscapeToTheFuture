import { useState, useEffect } from 'react';
import ImageMapper from "react-img-mapper";

import Camera from '@assets/images/Scena7/Camera.png';
import Notiziario from '@assets/images/Scena7/Notiziario.png';

import news_intro from '@assets/sounds/scena7/tv-news-logo-154117.mp3';
import news from '@assets/sounds/scena7/SFX - Tv Tower Observation Deck Epidemic Sound.mp3';


import Dialogue from '../components/Dialogue';

import sceneBitritto from '@assets/scenesBitritto.json';
import { useNavigate } from "react-router";

const Scena7 = () => {
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState(Camera);
    const [scene, setScene] = useState(sceneBitritto.scenes[13]);
    const [audioNewsIntro, setAudioNewsIntro] = useState(new Audio(news_intro));
    const [audioNews, setAudioNews] = useState(new Audio(news));

    const navigate = useNavigate();

    // Preload
    const [preload, setPreload] = useState({
        camera: false,
        notiziario: false,
    });

    
    // Play news intro sound when the image changes to Notiziario, then after audio ends play news sound
    useEffect(() => {
        if (currentImage === Notiziario && !preload.notiziario) {
            audioNewsIntro.play();
            audioNewsIntro.onended = () => {
                audioNews.volume = 0.2;
                audioNews.play();
                setPreload({
                    ...preload,
                    notiziario: true,
                });
            };
        }
    }, [currentImage, preload, audioNews, audioNewsIntro]);

    return (
        <div>
            {/* Dialogues */}
            {
                scene.dialogue.map((dialogue, index) => (
                    index === currentDialogueIndex && (
                        <Dialogue key={currentDialogueIndex} dialogue={dialogue} onClose={() => {

                            if (currentDialogueIndex < scene.dialogue.length-1) {
                                setCurrentDialogueIndex(currentDialogueIndex + 1);
                            } else {
                                console.log('All dialogues are finished');
                                // Aspetta 3 secondi e poi naviga alla win
                                setTimeout(() => {
                                    // Stop audio
                                    audioNews.pause();
                                    audioNewsIntro.pause();

                                    navigate("/win");
                                }, 3000);
                            }
                        }} />
                    )
                ))
            }
            
            {/* ImageMapper sfondo */}
            <div className="z-0 flex flex-col justify-center items-center h-svh">
                {/* Preload */}
                {
                    !preload.camera &&
                    <img
                        src={Camera}
                        alt="Cucina locked"
                        className={'img-mapper-img'}
                        style={
                            {
                                position: 'absolute',
                                top: '0px',
                                left: '0px',
                                zIndex: '1',
                                userSelect: 'none',
                                width: '100%',
                                height: 'auto',
                            }
                        }
                    />
                }

                <ImageMapper
                    src={currentImage}
                    name="Cucina"
                    natural
                    // Preload
                    onLoad={() => {
                        if (!preload.camera) {
                            setPreload({
                                ...preload,
                                camera: true,
                            });
                        }
                    }}
                    imgWidth={1920}
                    parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
                    responsive={true}
                    disabled={currentDialogueIndex < scene.dialogue.length-1}
                    areas={[
                    {
                        id: "televisione",
                        shape: "rect",
                        coords: [380, 310, 1050, 690],
                        fillColor: "rgba(237, 20, 61, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(237, 20, 61, 0.5)",
                        disabled: currentImage === Notiziario,
                    }
                    ]}
                    onClick={(area) => {
                        if (area.id === "televisione") {
                            // Play News Intro
                            // Change image to Notiziario
                            setCurrentImage(Notiziario);
                            // Change scene to 14
                            setScene(sceneBitritto.scenes[14]);
                            // Reset dialogues
                            setCurrentDialogueIndex(0);
                        }
                    }}
                    isMulti={false}
                />
            </div>

        </div>
    );
};

export default Scena7;