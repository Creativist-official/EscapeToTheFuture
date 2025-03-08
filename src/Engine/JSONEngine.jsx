import Scene from './components/Scene';
import sceneBitritto from '../assets/scenesBitritto.json';

const gameEngine = () => {
    // Get the scene title and image from the JSON
    return (
        <div>
            <Scene scene={sceneBitritto.scenes[0]} />
        </div>
    );
};

export default gameEngine;