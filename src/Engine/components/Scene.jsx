// Desc: Scene component
// Single scene example:
// {
//     "title": "La Lettera Misteriosa",
//     "scene_image": "./src/assets/images/bg-splash.webp",
//     "dialogue": [
//         {
//             "type": "narrator",
//             "text": "Il detective riceve una lettera misteriosa accompagnata da una fotografia di una foresta."
//         },
//         {
//             "type": "hint",
//             "speaker": "Lettera",
//             "asset": "./src/assets/images/lettera.webp",
//             "text": "Ciao, ti scrivo di nascosto questa lettera per aiutarmi a liberare Enrico. Troverai tutte le indicazioni necessarie per trovare il laboratorio dove è prigioniero."
//         },
//         {
//             "type": "narrator",
//             "text": "Incuriosito, il detective decide di recarsi nella foresta alla ricerca del laboratorio."
//         }
//     ]
// }

// This component should render a scene setting page title to the scene title and background image to the scene image
// Then, after 1.3 seconds, it should start the dialogue by showing the array of dialogue objects
// Each dialogue object should be shown after the previous one has finished
// If the dialogue object has a type of "hint", it should show the speaker and the asset image
// Once all dialogues are finished it should show a button to go to the next scene
// The button should not be shown until all dialogues are finished

import { useState } from 'react';
import PropTypes from 'prop-types';
import Dialogue from '../../components/Dialogue';
import Dialogue_with_prop from './Dialogue_with_prop';

const Scene = ({ scene }) => {
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

    const handleDialogueClose = () => {
        if (currentDialogueIndex < scene.dialogue.length - 1) {
            setCurrentDialogueIndex(currentDialogueIndex + 1);
        } else {
            // All dialogues are finished, show the button to go to the next scene
            console.log('All dialogues are finished');
        }
    };


    return (
        <div
            className={"w-full h-full flex flex-col justify-center items-center gap-2 md:gap-10 h-svh bg-[url(" + scene.scene_image + ")] bg-center bg-clip-border bg-cover bg-origin-border bg-no-repeat"}>
            {/* Qui c'è l'area per interagire */}
            {scene.dialogue.map((dialogue, index) => (
                index === currentDialogueIndex && (
                    dialogue.type === "prop" ? (
                        <Dialogue_with_prop key={index} dialogue={dialogue} on_skip_optional={() => {
                            handleDialogueClose();
                        }} />
                    ) : (
                        <Dialogue key={index} dialogue={dialogue} onClose={handleDialogueClose} />
                    )
                )
            ))}
        </div>
    );
};
Scene.propTypes = {
    scene: PropTypes.shape({
        title: PropTypes.string.isRequired,
        scene_image: PropTypes.string.isRequired,
        dialogue: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string.isRequired,
                text: PropTypes.string,
                speaker: PropTypes.string,
                asset: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
};

export default Scene;