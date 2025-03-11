import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Speaker from '../Engine/components/Speaker';

const Dialogue = ({ dialogue, onClose }) => {
    let box = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 563 145" width="100%" height="100%" fill="none"><path fill="#D2A684" d="M531.198 51.587c0 28.49-116.803 51.586-260.888 51.586-144.084 0-260.888-23.096-260.888-51.587C9.422 23.097 126.226 0 270.31 0c144.085 0 260.888 23.096 260.888 51.587Z"/><path fill="#D2A684" d="M563 92.743c0 28.49-126.032 51.586-281.5 51.586C126.032 144.329 0 121.233 0 92.743s126.032-51.587 281.5-51.587c155.468 0 281.5 23.096 281.5 51.587Z"/><path fill="#F2CCAE" d="M513.514 53.689c0 26.469-108.517 47.926-242.38 47.926S28.754 80.158 28.754 53.689c0-26.47 108.517-47.927 242.38-47.927s242.38 21.457 242.38 47.927Z"/><path fill="#F2CCAE" d="M543.059 91.925c0 26.47-117.09 47.927-261.529 47.927S20 118.395 20 91.925C20 65.456 137.091 44 281.53 44c144.439 0 261.529 21.457 261.529 47.926Z"/></svg>;

    let font_name = "Inknut Antiqua";
    let font_source = "https://fonts.googleapis.com/css2?family=Inknut+Antiqua&display=swap";
    useEffect(() => {
        const link = document.createElement('link');
        link.href = font_source;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, [font_source]);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClick = () => {
        setIsVisible(false);
        setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, 300); // Duration should match the CSS transition duration
    };
    

    return (
        <div onClick={handleClick} className={`relative flex justify-center items-center mx-auto sm:mb-8 min-h-[23%] md:mb-0 lg:w-100 w-3/8 transition-transform transform ${isVisible ? 'scale-100' : 'scale-0'} animate-bounce-in`} style={{ fontFamily: font_name }}>
            <div className="scale-100 lg:scale-200 sm:scale-400">
                {box}
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center w-full">
                {dialogue.speaker && (
                    <div className="absolute -top-4 left-4 lg:-top-2 lg:-left-24 sm:-top-12 sm:-left-28">
                        <Speaker speaker={dialogue.speaker} type={dialogue.type} />
                    </div>
                )}
                <p className={`w-75 text-gray-800 text-center text-base text-md ${dialogue.text.includes('\n') ? 'whitespace-pre' : ''}`}>{dialogue.text}</p>
            </div>
            <div className="animate-bounce absolute -bottom-7 -right-28 lg:-bottom-4 lg:-right-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16l-6-6h12l-6 6z" />
                </svg>
            </div>
        </div>
    );
};
Dialogue.propTypes = {
    dialogue: PropTypes.shape({
        speaker: PropTypes.string,
        type: PropTypes.string,
        text: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func,
};

export default Dialogue;