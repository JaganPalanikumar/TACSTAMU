import {useState} from "react";

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
        {/* Color Logic:
            - text-white by default
            - group-hover:text-[--pink] triggers when mouse enters the <li>
            - isOpen ? "text-[--pink]" keeps it pink while open
        */}
        <h2 className={`text-3xl transition-colors duration-300 ease-out 
          group-hover:text-[--pink] 
          ${isOpen ? "text-[--pink]" : "text-white"}`}
        >
          {question}
        </h2>
        
        <span className={`text-4xl font-mono ml-4 transition-colors duration-300
          group-hover:text-[--pink] 
          ${isOpen ? "text-[--pink]" : "text-white"}`}
        >
          {isOpen ? "−" : "+"}
        </span>
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