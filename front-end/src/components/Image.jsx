import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { url } from '../utils/url';


export const Image = ({ compressedSrc, originalSrc, imageClass }) => {
    const [highResLoaded, setHighResLoaded] = useState(false);
    return (
        <div
            style={{
                backgroundImage: !highResLoaded && `url(${url}/${compressedSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                width: '100%',
            }}
        >
            <img
                className={imageClass}
                alt=""
                style={{
                    opacity: highResLoaded ? 1 : 0,

                    filter: highResLoaded ? 'blur(0px)' : 'blur(100px)',
                    transition: ' opacity 500ms',
                    height: '100%',
                    width: '100%',
                }}

                src={`${url}/${originalSrc}`}
                onLoad={() => setHighResLoaded(true)}
            />
        </div>
    )
}
