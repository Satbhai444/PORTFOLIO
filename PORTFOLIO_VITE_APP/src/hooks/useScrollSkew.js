import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

export const useScrollSkew = (ref) => {
    const { scrollYProgress } = useScroll({ target: ref });
    const lastScroll = useRef(0);
    const scale = useRef(1);

    useEffect(() => {
        const update = () => {
            const currentScroll = window.scrollY;
            const velocity = (currentScroll - lastScroll.current) * 0.1;
            lastScroll.current = currentScroll;

            if (ref.current) {
                const skew = Math.min(Math.max(velocity, -5), 5); // Limit skew
                ref.current.style.transform = `skewY(${skew}deg)`;
            }
            requestAnimationFrame(update);
        };

        const raf = requestAnimationFrame(update);
        return () => cancelAnimationFrame(raf);
    }, [ref]);
};
