import { useState } from 'react';

import Camera from '@assets/images/Scena7/Camera.png';
import Notiziario from '@assets/images/Scena7/Notiziario.png';

import Dialogue from '../components/Dialogue';

import sceneBitritto from '@assets/scenesBitritto.json';

const Scena7 = () => {
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState(Camera);
    const [scene, setScene] = useState(sceneBitritto.scenes[13]);

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
                                // if scene index is 13 go to 14
                                if (scene === sceneBitritto.scenes[13]) {                                    
                                    setScene(sceneBitritto.scenes[14]);
                                    setCurrentDialogueIndex(0);
                                    // Change image to Notiziario
                                    setCurrentImage(Notiziario);
                                }

                            }
                        }} />
                    )
                ))
            }
            <div className="flex flex-col justify-center items-center h-svh">
                <img
                    src={currentImage}
                    alt="Ingresso cucina"
                    className='w-full h-full object-cover'
                />
            </div>
        </div>
    );
};

export default Scena7;