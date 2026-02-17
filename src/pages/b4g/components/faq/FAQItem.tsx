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
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* question */}
        <h2 className="text-[--pink] text-4xl">{question}</h2>
        
        {/* +/- */}
        <span className="text-[--pink] text-4xl font-mono ml-4">
          {isOpen ? "−" : "+"}
        </span>
      </div>

      {isOpen && (
        <p className="text-2xl">{answer}</p>
      )}
    </li>
  );
}