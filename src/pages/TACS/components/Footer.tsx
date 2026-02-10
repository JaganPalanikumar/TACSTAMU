import Link from "next/link";
import { FaDiscord, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="h-40 w-full rounded-t-3xl mt-auto flex flex-col text-white">
            <div className="bg-primary-light bg-secondary-light flex flex-col items-center justify-center h-full space-y-4">
                <div className="flex text-2xl gap-x-8 text-primary">
                    <a href="https://discord.gg/CBWn8mKFvx" target="_blank" className="p-2 bg-white rounded-full cursor-pointer">
                        <FaDiscord />
                    </a>
                    <a href="https://www.instagram.com/tacstamu/" target="_blank" className="p-2 bg-white rounded-full cursor-pointer">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com/company/tamucs/" target='_blank' className="p-2 bg-white rounded-full cursor-pointer">
                        <FaLinkedinIn />
                    </a>
                </div>
                <small className="font-thin">Texas A&M Computing Society © 2024</small>
            </div>
        </footer>
    );
};

export default Footer;