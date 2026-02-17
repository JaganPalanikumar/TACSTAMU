import {useState} from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <li className="list-none cursor-pointer mb-6" onClick={() => setIsOpen(!isOpen)}>
      <h2 className="text-[--pink] text-4xl">{question}</h2>
      
      {isOpen && (
        <p className="text-2xl">{answer}</p>
      )}
    </li>
  );
}