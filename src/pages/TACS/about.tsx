import React from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/pages/TACS/components/Navbar";
import Footer from "@/pages/TACS/components/Footer";
import OfficerCard from "@/pages/TACS/components/OfficerCard";

import WhatWeDoPageImage from "/public/what_we_do_page_image.webp";

import ayush_garg_headshot from "/public/ayush_garg_headshot.png";
import akshay_belhe_headshot from "/public/akshay_belhe_headshot.png";
import kayley_vu_headshot from "/public/kayley_vu_headshot.png";
import aditya_nambi_headshot from "/public/adi_nambi_headshot.png";
import montgomery_bohde_headshot from "/public/montgomery_bohde_headshot.png";
import sumit_nalavade_headshot from "/public/sumit_nalavade_headshot.png";
import keshari_rijal_headshot from "/public/keshari_rijal_headshot.png";
import aarya_patel_headshot from "/public/aarya_patel_headshot.png";
import neelesh_garg_headshot from "/public/neelesh_garg_headshot.png";
import alysa_zhao_headshot from "/public/alysa_zhao_headshot.png";
import mann_bellani_headshot from "/public/mann_bellani_headshot.png";
import lauren_vu_headshot from "/public/lauren_vu_headshot.png";
import jagan_palanikumar_headshot from "/public/jagan_palanikumar_headshot.png";
import blank from "/public/GrayAvatar.jpg";

const Officers = [
  {
    name: "Aarya Patel",
    title: "President",
    linkedinLink: "https://www.linkedin.com/in/aaryaapatel/",
    email: "aarya.patel@tamu.edu",
    photo: aarya_patel_headshot,
  },
  {
    name: "Aditya Nambi",
    title: "Treasurer",
    linkedinLink: "https://www.linkedin.com/in/adityanambi/",
    email: "anambi@tamu.edu",
    photo: aditya_nambi_headshot,
  },
  {
    name: "Kayley Vu",
    title: "Creative Lead",
    linkedinLink: "https://www.linkedin.com/in/kayley-vu/",
    email: "kayley_vu@tamu.edu",
    photo: kayley_vu_headshot,
  },
  {
    name: "Aayush Garg",
    title: "Logistics Lead",
    linkedinLink: "https://www.linkedin.com/in/aayushg1414/",
    email: "aayushg1414@tamu.edu",
    photo: ayush_garg_headshot,
  },
  {
    name: "Akshay Belhe",
    title: "Outreach Lead",
    linkedinLink: "https://www.linkedin.com/in/akshaybelhe/",
    email: "abelhe8900@tamu.edu",
    photo: akshay_belhe_headshot,
  },
  {
    name: "Montgomery Bohde",
    title: "Tech Lead",
    linkedinLink: "https://www.linkedin.com/in/montgomery-bohde/",
    email: "mbohde@tamu.edu",
    photo: montgomery_bohde_headshot,
  },
  {
    name: "Keshari Rijal",
    title: "Marketing Officer",
    linkedinLink: "https://www.linkedin.com/in/keshari-rijal/",
    email: "kr66562@tamu.edu",
    photo: keshari_rijal_headshot,
  },
  {
    name: "Sumit Nalavade",
    title: "Tech Officer",
    linkedinLink: "https://www.linkedin.com/in/sumit-nalavade/",
    email: "sumit.nalavade@tamu.edu",
    photo: sumit_nalavade_headshot,
  },
  {
    name: "Phoebe Han",
    title: "Creative Officer",
    linkedinLink: "https://www.linkedin.com/in/phoebee-han/",
    email: "phoebeehan@tamu.edu",
    photo: blank,
  },
  {
    name: "Alysa Zhao",
    title: "Creative Officer",
    linkedinLink: "https://www.linkedin.com/in/alysaz/",
    email: "alysazhao111@tamu.edu",
    photo: alysa_zhao_headshot,
  },
  {
    name: "Ethan Nguyen",
    title: "Outreach + Logistics Officer",
    linkedinLink: "https://www.linkedin.com/in/ethan-v-nguyen/",
    email: "ethann03@tamu.edu",
    photo: blank,
  },
  {
    name: "Lauren Vu",
    title: "Outreach + Logistics Officer",
    linkedinLink: "https://www.linkedin.com/in/lauren-k-vu",
    email: "lkv384@tamu.edu",
    photo: lauren_vu_headshot,
  },
  {
    name: "Mann Bellani",
    title: "Outreach + Logistics Officer",
    linkedinLink: "https://www.linkedin.com/in/mannbellani/",
    email: "mannbellani1@tamu.edu",
    photo: mann_bellani_headshot,
  },
  {
    name: "Neelesh Garg",
    title: "Tech Officer",
    linkedinLink: "https://www.linkedin.com/in/neelesh-garg/",
    email: "ngarg2@tamu.edu",
    photo: neelesh_garg_headshot,
  },
  {
    name: "Jagan Palanikumar",
    title: "Tech Officer",
    linkedinLink: "https://www.linkedin.com/in/jagan-palanikumar/",
    email: "jpalanikumar@tamu.edu",
    photo: jagan_palanikumar_headshot,
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar selectedPage="about" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col-reverse sm:flex-row gap-8 items-center justify-center">
          <div className="space-y-4 sm:w-1/2">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">What We Do</h1>
            <p className="text-gray-600">
              As the student chapter of ACM, Texas A&M Computing Society
              encourages the exploration of computing technology, while also
              providing guidance in navigating the field of computer science.
            </p>
            <p className="text-gray-500">
              We host industry professionals and academic experts as guest
              speakers throughout the semester, as well as execute our own
              workshops and events to cover necessary skills to navigate the
              industry. Each meeting provides unique opportunities for
              networking and practical learning, and our social events foster a
              supportive and close community.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/tamucs/"
                target="_blank"
                className="bg-primary-light border-2 border-b-4 border-r-4 border-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-primary"
              >
                More about us on LinkedIn
              </a>
              <Link
                href="mailto:tacs-officers@lists.tamu.edu"
                className="bg-white border-2 border-b-4 border-r-4 border-primary text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-light hover:text-white"
              >
                Shoot us an email
              </Link>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="rounded-3xl overflow-hidden">
              <Image
                src={WhatWeDoPageImage}
                alt="TACS meeting"
                width={500}
                height={300}
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12 mb-4">
          <h2 className="text-4xl font-bold">Officers</h2>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-12 w-full">
            {Officers.map((officer, index) => (
              <OfficerCard key={index} officer={officer} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
