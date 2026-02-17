import {useState} from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <li className="list-none cursor-pointer mb-6 pb-6 border-b border-gray last:border-0" onClick={() => setIsOpen(!isOpen)}>
      <div 
        className="flex justify-between items-center cursor-pointer select-none" 
      >
        {/* question */}
        <h2 className="text-[--pink] text-4xl">{question}</h2>
        
        {/* +/- */}
        <span className="text-[--pink] text-4xl font-mono ml-4">
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