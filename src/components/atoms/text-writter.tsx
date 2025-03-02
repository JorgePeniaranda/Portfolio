import { Typewriter } from 'react-simple-typewriter';

import { useTranslations } from '@/hooks/use-translations';

interface TextWritterProps {
  wordList: string[];
  ariaLabel?: string;
}

/**
 * TextWritter component displays a typewriter effect with words from the provided list.
 * @param params - Component props
 * @param params.wordList - List of words to type
 * @param params.ariaLabel - Optional aria-label for accessibility
 * @returns A TextWritter component
 */
export function TextWritter({ wordList, ariaLabel }: TextWritterProps) {
  const { t } = useTranslations();

  return (
    <span aria-label={ariaLabel ? t('components.text-writter.aria-label') : undefined}>
      <Typewriter
        cursor // Shows a cursor during typing
        loop // Loops through the words in the list
        delaySpeed={2000} // Delay before starting the next word
        deleteSpeed={50} // Speed of deleting the word
        typeSpeed={70} // Speed of typing each character
        words={wordList} // List of words to type
      />
    </span>
  );
}
