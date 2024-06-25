import {useState} from "react";

export default function useSound() {
  const [sound, setSound] = useState<boolean>();

  const toggleSound = () => {
    setSound(!sound);
  };

  return {
    sound,
    toggleSound,
  };
}
