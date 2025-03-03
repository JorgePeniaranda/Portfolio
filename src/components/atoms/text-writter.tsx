import { Typewriter } from 'react-simple-typewriter';

interface TextWritterProps {
  wordList: string[];
}

/**
 * TextWritter component displays a typewriter effect with words from the provided list.
 * @param params - Component props
 * @param params.wordList - List of words to type
 * @returns A TextWritter component
 */
export function TextWritter({ wordList }: TextWritterProps) {
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
