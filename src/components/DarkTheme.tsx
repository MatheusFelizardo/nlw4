import { faMoon as DarkMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import { faMoon as RegularMoon } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styles from '../styles/themes/DarkTheme.module.scss'

export const DarkTheme = ({changeToDark, changeToLight, isDark, isLight }) => {
    
    return (
        <div className={styles.container}>   
            { isLight && <button onClick={changeToDark} ><FontAwesomeIcon icon={DarkMoon} /><p>Dark Mode</p> </button> }
            { isDark && <button onClick={changeToLight} ><FontAwesomeIcon icon={faSun} /><p>Light Mode</p></button> }
        </div>
    )
}
