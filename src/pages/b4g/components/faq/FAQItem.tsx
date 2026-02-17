interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <li>
      <h2 className="text-[--pink] text-5xl">{question}</h2>
      <p className="text-2xl">{answer}</p>
    </li>
  );
}
