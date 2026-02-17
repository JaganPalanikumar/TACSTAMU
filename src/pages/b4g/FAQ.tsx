import FAQItem from "../../components/FAQItem";


export default function FAQ() {
  // TODO Fill this out

  const faqs = [
  { question: "Question 1", answer: "Answer 1" },
  { question: "Question 2", answer: "Answer 2" },
  { question: "Question 3", answer: "Answer 3" },
  { question: "Question 4", answer: "Answer 4" },
  { question: "Question 5", answer: "Answer 5" },
];

  return (
    /*
    <div className="flex flex-col gap-3 p-3 px-20">
      <h1 className="w-fit mx-auto text-5xl">Frequently Asked Questions</h1>
      <div className="w-full mx-auto p-[1rem] rounded-[5rem] bg-gradient-to-b from-[--peach] to-[--pink]">
        <ul className="w-full mx-auto px-5 py-5 rounded-[4rem] bg-white text-[--gray]">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </ul>
      </div>
    </div>
    */
    <div className="flex flex-col gap-3 p-16">
      <h1 className="w-fit mx-auto text-5xl">Frequently Asked Questions</h1>
       <div className="">
        <ul className="">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </ul>
      </div>
    </div>
  );
}
