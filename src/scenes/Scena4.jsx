import { useState } from 'react';
import { useNavigate } from "react-router";
import ImageMapper from "react-img-mapper";

import cucina from '@assets/images/Scena4/Cucina.png';
import dispensaImg from '@assets/images/Scena4/Dispensa.jpg';

const Scena4 = () => {
    const navigate = useNavigate();
    const [dispensaOpen, setDispensaOpen] = useState(false);
    const [hasDogFood, setHasDogFood] = useState(false);
    return (
        <div>

            {/* ImageMapper sfondo */}
            <div className="absolute object-cover">
                <ImageMapper
                    src={cucina}
                    name="Cucina"
                    natural
                    imgWidth={1920}
                    parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
                    responsive={true}
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
                    ]}
                    onClick={() => {
                        if (hasDogFood) {
                            console.log('You already have dog food');
                        } else {
                            setDispensaOpen(true);
                        }
                    }}
                    isMulti={false}
                />
            </div>

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
                                    setDispensaOpen(false);
                                }
                            }}
                            isMulti={false}
                        />
                    </div>
                    // <div className="fixed inset-0 backdrop-brightness-70 flex items-center justify-center z-20" onClick={() => setDispensaOpen(false)}>
                    //     <img src={dispensaImg} alt="" className="max-h-[80%]" onClick={(e) => e.stopPropagation()} />
                    //     <button onClick={() => {
                    //         setHasDogFood(true);
                    //         setDispensaOpen(false);
                    //     }}>
                    //     </button>
                    // </div>
                ) : 
                !hasDogFood && <div className="absolute left-[36%] bottom-[18%] scale-80 xl:left-[37%] xl:top-[7%] pointer-events-none z-2">
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
        </div>
    );
};

export default Scena4;