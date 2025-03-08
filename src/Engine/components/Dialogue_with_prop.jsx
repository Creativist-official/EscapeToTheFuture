import React, {useState} from 'react';
import Dialogue from '../../components/Dialogue';

const Dialogue_with_prop = ({dialogue, on_skip_optional, key}) => {

    // Initiate the show_dialogue state to false
    const [show_dialogue, setShow_dialogue] = useState({});
    // Initiate the asset state to ["", false] (asset path, asset shaking)
    const [asset, setAsset] = useState([dialogue.asset, true]);
    
    const handleOnPropClick = (value) => {
        if (value.change_asset !== "") {
            // Change the asset to the new one
            setAsset([value.change_asset, true]);
        }
        
        setShow_dialogue(value);
    }
    

    return (
        <div className='h-full flex flex-col justify-evenly items-center'>
            <div className='flex justify-center items-center w-full'>
                <div onClick={() => handleOnPropClick(dialogue.onClick.value)} className="" key={key}>
                    <img src={asset[0]} alt="prop" className={"select-none w-90 xl:h-16 z-1 transition-transform duration-600 ease-in-out transform hover:scale-120" + (asset[1] ?? "animate-shake")} />
                    {
                        dialogue.optional ?? (
                            <button onClick={() => {on_skip_optional()}} className="z-1 bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-300 mt-4">Avanti</button>
                        )
                    }
                </div>
            </div>
            {
                Object.keys(show_dialogue).length !== 0 && (
                    <Dialogue dialogue={dialogue.onClick.value} onClose={() => setShow_dialogue({})} />
                )
            }
        </div>
    );
};

export default Dialogue_with_prop;