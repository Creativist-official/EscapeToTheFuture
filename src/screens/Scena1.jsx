import { extend } from "@pixi/react";
import {
  Container,
  Assets,
  Sprite,
  Graphics,
  Text,
  TextStyle,
} from "pixi.js";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

import LegnoBG from "@images/Scena1/Legno.webp";
import LetteraCImage from "@images/Scena1/Lettera_C.webp";
import LetteraOImage from "@images/Scena1/Lettera_O.webp";

extend({
  Container,
  Sprite,
  Graphics,
  Text,
});

const Scena1 = () => {
  const [loaded, setLoaded] = useState(false);
  const [letterClicked, setLetterClicked] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const letteraRef = useRef(null);

  const cardWidth = window.innerWidth >= 1000 ? Math.min(window.innerWidth * 0.7, 600) : Math.min(window.innerWidth * 0.3, 300);
  const cardHeight = window.innerWidth >= 1000 ? Math.min(window.innerHeight * 0.7, 300) : Math.min(window.innerHeight * 0.4, 300);
  const padding = 20;



  //* Caricamento assets bundle
  useEffect(() => {
    if (!loaded) {
      Assets.addBundle("scena1", {
        "scena1-legno": LegnoBG,
        "scena1-letteraClosed": LetteraCImage,
        "scena1-letteraOpen": LetteraOImage,
      });

      Assets.loadBundle("scena1")
        .then(() => {
          setLoaded(true);
          import.meta.env.DEV && console.log("Assets loaded successfully.");
        })
        .catch((error) => {
          console.error("Error loading assets:", error);
        });
    }
  }, [loaded]);



  //* Animazione lettera
  useEffect(() => {
    if (loaded && letteraRef.current) {
      letteraRef.current.scale.set(0);

      gsap.to(letteraRef.current.scale, {
        x: Math.min(window.innerWidth, window.innerHeight) / 1000,
        y: Math.min(window.innerWidth, window.innerHeight) / 1000,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => setAnimationCompleted(true),
      });

      gsap.to(letteraRef.current, {
        rotation: Math.PI * 2,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }
  }, [loaded]);

  useEffect(() => {
    if (letteraRef.current && animationCompleted) {
      if (!letterClicked) {
        gsap.to(letteraRef.current.scale, {
          x: "+=0.1",
          y: "+=0.1",
          duration: 0.5,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        });
      } else {
        gsap.killTweensOf(letteraRef.current.scale);
        letteraRef.current.scale.set(
          Math.min(window.innerWidth, window.innerHeight) / 1000
        );
      }
    }
  }, [animationCompleted, letterClicked]);

  return (
    <pixiContainer>
      {loaded && (
        <>
          <pixiSprite
            texture={Assets.get("scena1-legno")}
            width={window.innerWidth}
            height={window.innerHeight}
          />
          <pixiSprite
            ref={letteraRef}
            texture={Assets.get(
              letterClicked ? "scena1-letteraOpen" : "scena1-letteraClosed"
            )}
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
            anchor={0.5}
            eventMode="static"
            interactive
            onPointerDown={() => animationCompleted && setLetterClicked(!letterClicked)}
          />
          {letterClicked && (
            <>
              <pixiGraphics
                draw={(graphics) => {
                  graphics.clear();
                  graphics.setFillStyle({ color: "#e5e7eb" });

                  graphics.roundRect(
                    window.innerWidth / 2 - cardWidth / 2,
                    window.innerHeight / 2 - cardHeight / 2,
                    cardWidth,
                    cardHeight,
                    3
                  );
                  graphics.fill();
                }}
              />
              <pixiText
                text={
                  "Ciao, ti scrivo di nascosto questa lettera per aiutarmi a liberare Enrico.\n\n"
                }
                style={
                  new TextStyle({
                    fontFamily: "Julee",
                    fontSize: 16,
                    fill: "#000000",
                    wordWrap: true,
                    wordWrapWidth: cardWidth - padding * 2,
                    align: "center",
                  })
                }
                x={window.innerWidth / 2 - cardWidth / 2 + padding}
                y={window.innerHeight / 2 - cardHeight / 2 + padding}
              />
              <pixiText
                text={
                  "Troverai tutte le indicazioni necessarie per trovare il laboratorio dove è prigioniero."
                }
                style={
                  new TextStyle({
                    fontFamily: "Julee",
                    fontSize: 13,
                    fill: "#193cb8",
                    wordWrap: true,
                    wordWrapWidth: cardWidth - padding * 2,
                    align: "center",
                  })
                }
                x={window.innerWidth / 2 - cardWidth / 2 + padding}
                y={window.innerHeight / 2 - cardHeight / 2 + padding+60}
              />
            </>
          )}
        </>
      )}
    </pixiContainer>
  );
};

export default Scena1;
