import PropTypes from 'prop-types';
import buttonBg from '@assets/images/Scena4/Impiccato_cucina/ImpiccatoButton.png'

const ImpiccatoButton = ({keycap, onClick}) => {
    return (
        <div className={'w-20 h-20 bg-['+ buttonBg +'] rounded-lg flex justify-center items-center z-20 cursor-pointer hover:bg-black/30'} onClick={onClick}>
            <img src={buttonBg} alt={"Tasto " + keycap} className='absolute scale-60' />
            <span className='text-[2rem] font-[Special_Elite] w-170 text-center'>{keycap}</span>
        </div>
    );
};

ImpiccatoButton.propTypes = {
    keycap: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
ImpiccatoButton.propTypes = {
    keycap: PropTypes.string.isRequired,
};

export default ImpiccatoButton;