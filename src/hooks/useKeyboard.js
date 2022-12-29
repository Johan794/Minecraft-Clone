import { useEffect, useState } from "react";

const ACTIONS_KEYBOARD_MAP = {
  KeyW: "moveForward",
  KeyS: "moveBackward",
  KeyA: "moveLeft",
  KeyD: "moveRight",
  Space: "jump",
  Digit1: "dirt",
  Digit2: "grass",
  Digit3: "glass",
  Digit4: "wood",
  Digit5: "log",
};
export const useKeyboard = () => {
  function handleEvent(selection, event) {
    const { code } = event;
    const action = ACTIONS_KEYBOARD_MAP[code];
    if (action) {
      setActions((prev) => ({
        ...prev,
        [action]: selection,
      }));
    }
  }
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  useEffect(() => {
    const onKeyPress = (event) => {
      handleEvent(true, event);
    };

    const onKeyUp = (event) => {
      handleEvent(false, event);
    };

    document.addEventListener("keydown", onKeyPress);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return actions;
};
