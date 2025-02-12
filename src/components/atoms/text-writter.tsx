import { Typewriter } from 'react-simple-typewriter';

interface IProps {
  wordList: string[];
}

/**
 * TextWritter component displays a typewriter effect with words from the provided list.
 */
export function TextWritter({ wordList }: IProps) {
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
