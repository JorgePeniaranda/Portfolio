import { Loader, RotateCcw } from 'lucide-react';
import { useState, type HTMLAttributes } from 'react';

import { cn } from '@/helpers/common/classnames';

// List of URLs for the cat images (gif and static)
const CAT_URLs = ['https://cataas.com/cat/gif', 'https://cataas.com/cat'];

/**
 * CatAsAService component displays a random cat image, and allows the user to request a new one by clicking a button.
 */
export function CatAsAService(props: HTMLAttributes<HTMLDivElement>) {
  const [loading, setLoading] = useState(true);
  const [currentURL, setCurrentURL] = useState('https://cataas.com/cat/gif');

  /**
   * Handler function triggered when the image is fully loaded.
   * Hides the loader.
   */
  const onLoad = () => {
    setLoading(false);
  };

  /**
   * Handler function triggered when the user clicks the button to get a new cat.
   * Selects a random URL from the list and reloads the image.
   */
  const handleClick = () => {
    const randomURL = CAT_URLs[Math.floor(Math.random() * CAT_URLs.length)];
    const params = `?size=square&${Date.now()}`; // Adding timestamp to prevent image caching

    setCurrentURL(randomURL + params);
    setLoading(true); // Show the loader until the new image loads
  };

  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-5', props.className)}
      {...props}
    >
      <picture className='flex size-72 items-center justify-center rounded'>
        {loading ? (
          <Loader aria-label='loader' className='size-10 animate-spin text-black dark:text-white' />
        ) : null}
        <img
          alt='cat'
          aria-label='Cat ❤️'
          className='size-72 rounded-lg bg-cover bg-no-repeat object-cover'
          src={currentURL}
          style={{ display: loading ? 'none' : 'block' }} // Hide image while loading
          onLoad={onLoad} // Trigger onLoad handler when the image finishes loading
        />
      </picture>
      {!loading && (
        <button
          aria-label='Find new cat'
          className='rounded-lg bg-neutral-200/80 p-2 text-neutral-500 shadow-2xl dark:bg-neutral-800 dark:text-neutral-400'
          type='button'
          onClick={handleClick} // Change to a new cat when clicked
        >
          <RotateCcw
            aria-label='Reload icon'
            className='size-8 transition-transform hover:-rotate-45'
          />
        </button>
      )}
    </div>
  );
}
