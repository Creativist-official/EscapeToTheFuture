import { useState } from 'react';
import { useNavigate } from "react-router";
import ImageMapper from "react-img-mapper";
import Dialogue from '../components/Dialogue';

import cujoImg from '@assets/images/Scena3/Cujo.png';
import cujoWoof from '@assets/woof.mp3';
import ingressoCucina from '@assets/images/Scena3/Ingresso_cucina.jpg';

import sceneBitritto from '@assets/scenesBitritto.json';


const Scena3 = () => {
    const scene = sceneBitritto.scenes[2];
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

    const navigate = useNavigate();
    return (
        <div>
            {/* Dialogues */}
            <div className="absolute w-full bottom-[7%]">
                {
                    scene.dialogue.map((dialogue, index) => (
                        index === currentDialogueIndex && (
                            <Dialogue key={currentDialogueIndex} dialogue={dialogue} onClose={() => {                                
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

            {/* ImageMapper sfondo */}
            <div className="absolute object-cover">
                <ImageMapper
                    src={ingressoCucina}
                    name="Ingresso cucina"
                    natural
                    imgWidth={1920}
                    parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
                    disabled={currentDialogueIndex < scene.dialogue.length - 1}
                    responsive={true}
                    areas={[
                    {
                        id: "porta_cucina",
                        shape: "rect",
                        coords: [256, 256, 600, 950],
                        fillColor: "rgba(237, 20, 61, 0.5)",
                        lineWidth: 0,
                        strokeColor: "rgba(237, 20, 61, 0.5)",
                    },
                    ]}
                    onChange={() => navigate("/scena4")}
                    isMulti={false}
                />
            </div>

            {/* ImageMapper Cujo */}
            <div className="absolute w-full flex justify-center top-0 mt-[25%]">
                <ImageMapper
                    src={cujoImg}
                    name="Cujo"
                    natural
                    parentWidth={window.innerWidth * 0.25}
                    disabled={currentDialogueIndex < scene.dialogue.length - 1}
                    responsive={true}
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
                    onChange={() => {
                        const audio = new Audio(cujoWoof);
                        audio.play();
                    }}
                    isMulti={false}
                />
            </div>
        </div>
    );
};

export default Scena3;