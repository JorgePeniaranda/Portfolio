import { useState, useEffect } from "react";
import style from "./style.module.css";
import { themes } from "../../../services/ColorsList.json";
import "../../../styles/theme.css";

export default function ThemeSelector() {
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${style.ThemeSelector}`)) {
        setShowPopover(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPopover]);

  const handleThemeChange = (event) => {
    event.target.parentElement.querySelector('#active').id = ""
    event.target.id = "active"

    const root = document.documentElement;
    root.style.setProperty('--primary-light', `var(--color-${event.target.getAttribute("color")})`);
    root.style.setProperty('--primary-dark', `var(--color-${event.target.getAttribute("color")}-dark)`);
    root.style.setProperty('color-scheme', `${event.target.getAttribute("scheme-color")}`);
  }

  return (
    <div className={style.ThemeSelector}>
      {
        showPopover && (
          <ul>
            {
              themes.map((theme) => (
                <li 
                  key={1}
                  color={theme.color}
                  scheme-color={theme.schemeColor}
                  onClick={handleThemeChange}
                  style={{backgroundColor: `var(--color-${theme.color})`}}
                  id={theme?.active ? "active" : null}/>
              ))
            }
          </ul>
        )
      }
      <button onClick={() => setShowPopover(!showPopover)} aria-label="Change Theme">
        <svg width="32" height="32" viewBox="0 0 14 14">
          <path fill="currentColor" fill-rule="evenodd" d="M4.35.577a7 7 0 0 1 9.381 4.085c.27.758.15 1.626-.315 2.282A2.526 2.526 0 0 1 11.37 8H9.5a1.5 1.5 0 0 0-.455 2.931c.55.205.935.702.972 1.286a1.43 1.43 0 0 1-1.01 1.524A6.8 6.8 0 0 1 7.129 14a7 7 0 0 1-3.636-1.021A7.055 7.055 0 0 1 .15 6.517a7.055 7.055 0 0 1 4.2-5.94ZM4.5 7a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6-3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm-6 6.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>
  );
}