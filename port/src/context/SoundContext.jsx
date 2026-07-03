import React, { createContext, useContext } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const playSound = (type) => {
        let url = '';
        switch (type) {
            case 'hover': url = 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'; break;
            case 'click': url = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'; break;
            case 'success': url = 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'; break;
            case 'wipe': url = 'https://assets.mixkit.co/active_storage/sfx/1487/1487-preview.mp3'; break;
            default: return;
        }

        const audio = new Audio(url);
        audio.volume = 0.2;
        audio.play().catch(e => console.log("Audio blocked"));
    };

    return (
        <SoundContext.Provider value={{ playSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => useContext(SoundContext);
