import {Typewriter} from "react-simple-typewriter";

interface IProps {
  wordList: string[];
}

export function TextWritter({wordList}: IProps) {
  return (
    <Typewriter cursor loop delaySpeed={2000} deleteSpeed={50} typeSpeed={70} words={wordList} />
  );
}
