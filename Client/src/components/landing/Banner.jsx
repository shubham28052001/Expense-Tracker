import React from 'react'

function Banner() {
    return (
        <div className="mx-auto max-w-[90%] pb-10 -mt-16"
        data-aos="zoom-in"
        >
            <div className="overflow-hidden rounded-3xl shadow-xl">
                <img
                    src="/banner.jpeg"
                    alt="Banner"
                    className="w-full object-cover"
                />
            </div>
        </div>
    )
}

export default Banner;
