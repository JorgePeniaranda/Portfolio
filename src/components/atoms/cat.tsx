import { Loader, RotateCcw, SplineIcon } from 'lucide-react'
import { useState, type HTMLAttributes } from 'react'
import { cn } from '../../helpers/class-names'

const CAT_URLs = [
  'https://cataas.com/cat/gif',
  'https://cataas.com/cat',
]

export function CatAsAService(props: HTMLAttributes<HTMLDivElement>) {
  const [loading, setLoading] = useState(true)
  const [currentURL, setCurrentURL] = useState('https://cataas.com/cat/gif')

  const onLoad = () => {
    setLoading(false)
  }

  const handleClick = () => {
    const randomURL = CAT_URLs[Math.floor(Math.random() * CAT_URLs.length)]
    const params = `?size=square&${Date.now()}`
    setCurrentURL(randomURL + params)
    setLoading(true)
  }

  return (
    <div className={cn('flex flex-col justify-center items-center gap-5', props.className)} {...props}>
      <picture className='w-72 h-72 flex justify-center items-center rounded'>
        {
          loading && (
            <Loader className='animate-spin text-black dark:text-white w-10 h-10' aria-label='loader'/>
          )
        }
        <img
          src={currentURL}
          alt='cat'
          className='w-72 h-72 object-cover rounded-lg bg-cover bg-no-repeat'
          onLoad={onLoad}
          style={{ display: loading ? 'none' : 'block' }}
          aria-label='Cat ❤️'
        />
      </picture>
        {
          !loading && (
            <button onClick={handleClick} className=' p-2 text-neutral-500 rounded-lg shadow-2xl bg-neutral-200/80 dark:text-neutral-400 dark:bg-neutral-800' aria-label='Find new cat' accessKey='r'>
              <RotateCcw className="w-8 h-8 transition-transform hover:-rotate-45" aria-label='Reload icon'/>
            </button>
          )
        }
    </div>
  )
}
