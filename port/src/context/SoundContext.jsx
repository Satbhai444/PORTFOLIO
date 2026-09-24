import React, { createContext, useContext } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const playSound = (type) => {
        // Audio disabled per user request
    };

    return (
        <SoundContext.Provider value={{ playSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => useContext(SoundContext);
