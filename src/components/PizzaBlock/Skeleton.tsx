import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => {
    return (
        <ContentLoader
            speed={2}
            width={280}
            height={467}
            viewBox="0 0 280 467"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="1" y="317" rx="10" ry="10" width="274" height="84" />
            <rect x="2" y="424" rx="8" ry="8" width="95" height="26" />
            <rect x="138" y="413" rx="23" ry="23" width="140" height="44" />
            <circle cx="131" cy="125" r="111" />
            <rect x="3" y="270" rx="10" ry="10" width="276" height="22" />
        </ContentLoader>
    )
}

export default Skeleton;