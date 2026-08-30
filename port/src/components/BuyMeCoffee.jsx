import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BuyMeCoffee.css';

const BuyMeCoffee = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href="https://buymeacoffee.com/darshansatbhai"
            target="_blank"
            rel="noopener noreferrer"
            className="bmc-floating-btn interactive"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Buy Me a Coffee"
            title="Buy Me a Coffee ☕"
        >
            {/* Steam animation */}
            <div className="bmc-steam-container">
                <div className="bmc-steam bmc-steam-1" />
                <div className="bmc-steam bmc-steam-2" />
                <div className="bmc-steam bmc-steam-3" />
            </div>

            {/* Coffee cup icon */}
            <svg className="bmc-icon" viewBox="0 0 884 1279" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M791.109 297.518L790.231 297.002L788.201 296.383C789.018 297.072 790.04 297.472 791.109 297.518Z" fill="#0D0C22"/>
                <path d="M803.896 388.891L802.916 389.166L803.896 388.891Z" fill="#0D0C22"/>
                <path d="M791.484 297.377C791.359 297.361 791.237 297.332 791.109 297.518C791.248 297.46 791.381 297.404 791.484 297.377Z" fill="#0D0C22"/>
                <path d="M791.484 297.377C791.359 297.361 791.237 297.332 791.109 297.518C791.248 297.46 791.381 297.404 791.484 297.377Z" fill="#0D0C22"/>
                <path d="M804.443 387.322C804.177 387.584 803.939 387.873 803.896 388.891L804.443 387.322Z" fill="#0D0C22"/>
                <path d="M417.185 590.848C417.185 590.848 386.792 524.423 386.792 459.598C386.792 394.773 417.185 328.348 417.185 328.348C417.185 328.348 447.578 394.773 447.578 459.598C447.578 524.423 417.185 590.848 417.185 590.848Z" fill="#FFDD00"/>
                <path d="M512.349 590.848C512.349 590.848 481.956 524.423 481.956 459.598C481.956 394.773 512.349 328.348 512.349 328.348C512.349 328.348 542.742 394.773 542.742 459.598C542.742 524.423 512.349 590.848 512.349 590.848Z" fill="#FFDD00"/>
                <path d="M321.836 590.848C321.836 590.848 291.443 524.423 291.443 459.598C291.443 394.773 321.836 328.348 321.836 328.348C321.836 328.348 352.229 394.773 352.229 459.598C352.229 524.423 321.836 590.848 321.836 590.848Z" fill="#FFDD00"/>
                <path d="M803.896 388.891C803.896 388.891 804.443 387.322 805.067 385.478C805.691 383.634 803.366 381.109 801.186 379.614C801.186 379.614 798.478 377.705 795.553 376.117C793.043 374.748 790.252 374.012 787.397 373.964C785.289 373.964 782.829 374.627 781.198 375.756C779.12 377.192 777.527 379.223 776.617 381.574C774.849 386.138 773.599 390.882 772.888 395.72L772.614 397.386C771.792 402.578 771.355 407.828 771.307 413.092C771.307 436.352 781.198 457.122 800.766 459.488C800.766 459.488 802.916 389.166 803.896 388.891Z" fill="#FFDD00"/>
                <path d="M88.596 590.848H745.591C745.591 590.848 745.591 803.695 557.089 897.696C368.587 991.697 143.624 816.698 143.624 816.698C143.624 816.698 107.195 781.038 88.596 590.848Z" fill="#FFDD00"/>
                <path d="M88.596 590.848L14.514 625.957C14.514 625.957 17.005 782.271 143.624 816.698C107.195 781.038 88.596 590.848 88.596 590.848Z" fill="#0D0C22"/>
                <path d="M745.591 590.848L819.891 625.957C819.891 625.957 817.399 782.271 690.781 816.698C727.21 781.038 745.591 590.848 745.591 590.848Z" fill="#0D0C22"/>
            </svg>

            {/* Expanded label on hover */}
            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        className="bmc-label"
                        initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                        animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
                        exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Buy me a coffee
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.a>
    );
};

export default BuyMeCoffee;
