import { useState } from 'react';

function IGPhoto({ item }) {
    const [loaded, setLoaded] = useState(false);
    const src = item.mediaType === 'VIDEO' ? item.thumbnailUrl : item.mediaUrl;

    return (
        <a href={item.permalink} target='_blank' rel='noopener noreferrer' className="IGGallery-item">
            <div className="IGGallery-placeholder" />
            <img
                className="IGGallery-pic"
                loading='lazy'
                alt={item.prunedCaption}
                src={src}
                onLoad={() => setLoaded(true)}
                onError={(e) => { e.target.style.display = 'none'; }}
                style={{ opacity: loaded ? 1 : 0 }}
            />
        </a>
    );
}

function IGGallery({ behold, sanityLoaded }) {
    const isLoaded = sanityLoaded === true && behold && behold.length > 0;

    return (
        <section id='IGGallery'>
            <div id='IGGallery-all-pics'>
                {isLoaded
                    ? behold.map((item) => <IGPhoto key={item.id} item={item} />)
                    : Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="IGGallery-item">
                            <div className="IGGallery-placeholder" />
                        </div>
                    ))
                }
            </div>
        </section>
    );
}

export default IGGallery;
