import { useNavigate } from "react-router";
import Button from '../components/Button';

import win_sound from '@assets/sounds/win/you-win-sequence-1-183948.mp3';

// eslint-disable-next-line react/prop-types
const Win = ({reason}) => {
    const navigate = useNavigate();
    // Play the game over sound
    const audio = new Audio(win_sound);
    audio.volume = 0.5;
    audio.play();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white bg-center bg-clip-border bg-cover bg-origin-border bg-no-repeat">
            <div className="h-full w-full flex flex-col items-center justify-evenly">
                <h1 className="2xl:w-1/2 md:w-2/3 w-2/3 text-5xl md:text-7xl xl:text-8xl font-bold text-center select-none font-elite text-blue-600 z-1" >
                    Missione conclusa!
                </h1>
                <h2 className="font-elite text-3xl md:text-3xl xl:text-4xl z-1 text-black select-none w-300 text-center">Hai vinto!</h2>
                <Button
                    onClick={async () => {
                        navigate("/")
                    }}
                >Ricomincia</Button>
            </div>
        </div>
    );
};

export default Win;