import {Typewriter} from "react-simple-typewriter";

/**
 * Props for the TextWritter component.
 * @typedef {Object} IProps
 * @property {string[]} wordList - List of words to display in the typewriter effect.
 */
interface IProps {
  wordList: string[];
}

/**
 * TextWritter component displays a typewriter effect with words from the provided list.
 * @param {IProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export function TextWritter({wordList}: IProps) {
  return (
    <Typewriter
      cursor // Shows a cursor during typing
      loop // Loops through the words in the list
      delaySpeed={2000} // Delay before starting the next word
      deleteSpeed={50} // Speed of deleting the word
      typeSpeed={70} // Speed of typing each character
      words={wordList} // List of words to type
    />
  );
}
