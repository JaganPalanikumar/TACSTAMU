import FAQItem from "../../b4g/components/FAQItem";

export default function FAQ() {
  const faqs = [
    {
      question: "I have no experience, can I still participate?",
      answer:
        "Yes! Build4Good is open to all levels and we have officers who will help guide you along the way!",
    },
    {
      question: "Do I need to have a team to sign up?",
      answer:
        "Not at all! You can sign up solo. A team matching feature is coming soon on our website to help you connect with other participants and form a team.",
    },
    {
      question: "Will there be food?",
      answer:
        "Absolutely, we will be serving food throughout the hackathon including Lunch and snacks. Make sure you check in on arrival to ensure you get food.",
    },
    {
      question: "Can I still come if I miss the opening ceremony?",
      answer:
        "Yes! You can join at anytime, but. just make sure to check in with an officer so you can get food and a shirt!",
    },
    {
      question: "What should I bring with me?",
      answer:
        "You will definitely want to bring your laptop and probably a charger.",
    },
  ];

  return (
    <div className="flex flex-col gap-3 py-16 w-[90%] max-w-[1500px] mx-auto p-5">
      <h1 className="w-fit mx-auto text-5xl mb-12">
        Frequently Asked Questions
      </h1>
      <div>
        <ul className="list-none p-0">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </ul>
      </div>
    </div>
  );
}
