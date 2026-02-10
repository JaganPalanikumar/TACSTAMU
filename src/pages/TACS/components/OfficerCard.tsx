import React from "react";
import Image from "next/image";
import linkedinIcon from "/public/linkedin_icon.png";
import mailIcon from "/public/mail_icon.png";

interface Props {
  officer: {
    name: string;
    title: string;
    photo?: any;
    linkedinLink?: string;
    email: string;
  };
}

const OfficerCard: React.FC<Props> = ({ officer }) => {
  return (
    <div className="border-2 border-primary-light border-r-4 border-b-4 rounded-2xl py-6 px-4 w-96 text-center space-y-4 bg-white">
      <div className="relative w-36 h-36 mx-auto mb-4">
        <Image
          src={officer.photo}
          alt={`${officer.name} photo`}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-primary font-semibold text-xl">{officer.name}</h2>
        <p className="text-gray-600 text-sm">{officer.title}</p>
      </div>
      <div className="flex justify-center space-x-4">
        {officer.linkedinLink && (
          <a
            href={officer.linkedinLink}
            target="_blank"
            className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
          >
            <Image src={linkedinIcon} alt="LinkedIn" width={18} height={18} />
          </a>
        )}
        {officer.email && (
          <a
            href={`mailto:${officer.email}`}
            className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
          >
            <Image src={mailIcon} alt="Email" width={18} height={18} />
          </a>
        )}
      </div>
    </div>
  );
};

export default OfficerCard;
