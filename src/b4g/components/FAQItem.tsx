import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <li 
      className="group list-none mb-6 pb-6 border-b border-white/20 last:border-0 cursor-pointer" 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center select-none">
        <h2 className={`text-3xl transition-colors duration-300 ease-out 
          group-hover:text-[--pink] 
          ${isOpen ? "text-[--pink]" : "text-white"}`}
        >
          {question}
        </h2>

        {/* Sparkle Container */}
        <div className="relative w-8 h-8 ml-4">

          {/* Sparkle 1 (Closed State) */}
          <img
            src="/b4g/sparkle1.svg"
            alt="sparkle"
            className={`absolute inset-0 w-full h-full transition-all duration-300 ease-in-out
              ${isOpen
                ? "rotate-0 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
              }`}
          />

          {/* Sparkle 2 (Open State) */}
          <img
            src="/b4g/sparkle2.svg"
            alt="sparkle"
            className={`absolute inset-0 w-full h-full transition-all duration-300 ease-in-out
              ${isOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-0 scale-0 opacity-0"
              }`}
          />

        </div>
      </div>
      
      {/* answer */}
      <div 
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-2xl cursor-default leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </li>
  );
}