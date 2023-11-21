import { useState, useEffect } from "react";
import style from "./style.module.css";

interface Props {
  imagesURL: string[];
  titleProject?: string;
}

export default function ImageCarousel({imagesURL, titleProject} : Props) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageIndex === imagesURL.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [imageIndex]);

  const handleBack = () => {
    if (imageIndex === 0) {
      setImageIndex(imagesURL.length - 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  }
  const handleNext = () => {
    if (imageIndex === imagesURL.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  }

  return (
    <figure className={style.ImageCarousel}>
      <button onClick={handleBack}>
        <svg width="32" height="32" viewBox="0 0 24 24">
          <path fill="currentColor" d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12q0-.2.063-.375T8.7 11.3l4.6-4.6q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L10.8 12Z"/>
        </svg>
      </button>
      <img src={imagesURL[imageIndex]} alt={`${titleProject}`} />
      <button onClick={handleNext}>
        <svg width="32" height="32" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l3.9-3.9Z"/>
        </svg>
      </button>
      <ul>
        {
          imagesURL.map((image, index) => (
            <li key={index} className={index === imageIndex ? "active" : undefined}>
              <button onClick={() => setImageIndex(index)} arial-label={index}/>
            </li>
          ))
        }
      </ul>
    </figure>
  );
}