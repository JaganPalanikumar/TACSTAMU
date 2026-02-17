import React from 'react';
import Image from 'next/image';

interface Props {
    event: {
        title: string,
        description: string,
        link: string;
        photo: any;
    };
}

const EventCard: React.FC<Props> = ({ event }) => {
    return (
        <div className="border-2 border-primary-light border-r-4 border-b-4 rounded-2xl py-6 px-8 w-full bg-white flex flex-col h-full">
            {/* Content */}
            <div className="flex flex-col flex-grow">
                {/* Text and icons */}
                <div className="flex flex-col p-4 space-y-4">
                    <h2 className="text-primary font-semibold text-xl">{event.title}</h2>
                    <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
                {/* Image */}
                <div className="relative w-full mt-6">
                    <Image
                        src={event.photo}
                        alt={`${event.title} photo`}
                        layout="responsive" // Adjusts the image to the container width while maintaining aspect ratio
                        width={1000} // Use a high value to ensure aspect ratio is maintained correctly
                        height={750} // Use a corresponding value based on the aspect ratio of the image
                        objectFit="cover"
                        className="rounded-xl"
                    />
                </div>
            </div>
            {/* Learn More button */}
            <div className="flex my-4">
                <a
                    href={event.link}
                    target='_blank'
                    className="bg-primary-light border-2 border-b-4 border-r-4 border-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-primary"
                >
                    Learn More
                </a>
            </div>
        </div>
    );
};

export default EventCard;
