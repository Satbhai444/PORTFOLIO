import { useEffect } from 'react';
import { useSound } from '../context/SoundContext';

export const useGlobalSounds = () => {
    const { playSound } = useSound();

    useEffect(() => {
        const handleMouseEnter = (e) => {
            const target = e.target;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.clickable')) {
                playSound('hover');
            }
        };

        const handleClick = (e) => {
            const target = e.target;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.clickable')) {
                playSound('click');
            }
        };

        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('click', handleClick);
        };
    }, [playSound]);
};
