import React from "react";
import Image from "next/image";

import Navbar from "@/pages/TACS/components/Navbar";
import Footer from "@/pages/TACS/components/Footer";
import EventCard from "@/pages/TACS/components/EventCard";

import eventsPageImage from "/public/events_page_image.webp";
import build4GoodHackathonPhoto from "/public/build_4_good_hackathon_photo.webp";
import easterEggHuntPhoto from "/public/easter_egg_hunt_social_image.webp";
import capitalOneSpeakersPhoto from "/public/capital_one_speakers.webp";
import notionEventPhoto from "/public/notion_event_image.webp";
import paycomTechnicalInterviewPhoto from "/public/paycom_technical_interview_photo.webp";
import monte_database_workshop_photo from "/public/monte_database_workshop_photo.webp";
import halloween_social_photo from "/public/halloween_social_photo.webp";
import engr_102_final_review_photo from "/public/engr_102_final_review_photo.webp";
import hilcorp_photo from "/public/hilcorp_photo.webp";

const events = [
  {
    title: "Build4Good Hackathon",
    description:
      "“Join us for an exciting one or two-day hackathon-style event where engineering organizations and university students from diverse fields converge to tackle real-world challenges. Build4Good aims to foster collaboration, innovation, and the transformative power of technology to create solutions that make a positive impact.”",
    link: "https://www.instagram.com/p/C49aNHHrY0j",
    photo: build4GoodHackathonPhoto,
  },
  {
    title: "Easter Egg Hunt Social",
    description:
      "“Easter Egg Hunt at Aggie Park!! Gift card prize for the most eggs, with a headphones prize if you find one lucky egg. Free boba, courtesy of the DoorDash Campus Launchers.”",
    link: "https://www.instagram.com/p/C5OUjVOOmOj/",
    photo: easterEggHuntPhoto,
  },
  {
    title: "Database Workshop With Monte",
    description:
      "“Learn about the different hosted database providers, how to make SQL and NoSQL queries and different tradeoffs in this interactive workshop.”",
    link: "https://www.instagram.com/p/DACFneay98S/",
    photo: monte_database_workshop_photo,
  },
  {
    title: "Halloween Social with Team Building Games",
    description:
      "“Join us for a Halloween social with free food and team related games.”",
    link: "https://www.instagram.com/p/DBtoATqx4jw/",
    photo: halloween_social_photo,
  },
  {
    title: "CapitalOne Industry Speakers",
    description:
      "“Perfect your elevator pitch and interview skills with direction from Capital One software engineers who are Texas A&M alumni! Free pizza and club shirts!”",
    link: "https://www.instagram.com/p/C51SpnWuPvn/",
    photo: capitalOneSpeakersPhoto,
  },
  {
    title: "TACS + Notion Event",
    description:
      "“Get ready for a tech talk with a Notion software engineer and MIT alumni who will go over a day in the life of a software engineer at Notion and how she leverages Notion in her daily work routine. Q&A session and free food, courtesy of the Notion Campus Launchers.”",
    link: "https://www.instagram.com/p/CzkBf05LWPj/",
    photo: notionEventPhoto,
  },
  {
    title: "ENGR 102 Final Review",
    description:
      "“Join us for a comprehensive review session for the ENGR 102 final exam. We will be covering a lot of tricks and tips that tend to get people, as well as covering general material that can be hard to grasp.”",
    link: "https://www.instagram.com/p/DCUXs_QRX4m/",
    photo: engr_102_final_review_photo,
  },
  {
    title: "Technical Interview Workshop With Paycom",
    description:
      "“Learn how to make the most out of your career fair experience with Paycom Talent Acquisition!”",
    link: "https://www.instagram.com/p/CwywGK1OUqq/",
    photo: paycomTechnicalInterviewPhoto,
  },
  {
    title: "Hilcorp Information Session & Tech Talk",
    description:
      "“Stop by for an IT information session and tech talk hosted by Hilcorp. This is an amazing opportunity to network and possibly get a tech internship!”",
    link: "https://www.instagram.com/p/DAmC4uMyWxT/",
    photo: hilcorp_photo,
  },
];

const EventsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar selectedPage="events" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col-reverse sm:flex-row gap-8 items-center justify-center">
          <div className="space-y-4 sm:w-1/2">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">Events</h1>
            <p className="text-gray-600">
              We host industry professionals and academic experts as guest
              speakers throughout the semester, as well as executing our own
              workshops and events to cover necessary skills to navigate the
              industry. Each meeting provides unique opportunities for
              networking and practical learning, and our social events foster a
              supportive and close community.
            </p>
            <p className="text-gray-500">
              In the past we have collaborated with top tech companies and
              startups in order to give the most industry exposure to students.
              Take a look at some of the cool stuff we’ve been up to!
            </p>
          </div>
          <div className="flex justify-end">
            <div className="rounded-3xl overflow-hidden">
              <Image
                src={eventsPageImage}
                alt="Events page image"
                width={500}
                height={300}
                objectFit="cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
