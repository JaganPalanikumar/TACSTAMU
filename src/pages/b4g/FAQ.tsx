export default function FAQ() {
  // TODO Fill this out
  return (
    <div className="flex flex-col gap-3 p-3">
      <h1 className="w-fit mx-auto text-5xl">Frequently Asked Questions</h1>
      <div className="w-full mx-auto p-[1rem] rounded-[5rem] bg-gradient-to-b from-[--peach] to-[--pink]">
        <ul className="w-full mx-auto p-7 rounded-[4rem] bg-white text-[--gray]">
          <li>
            <h2 className="text-[--pink] text-5xl">Question</h2>
            <p className="text-2xl">Answer</p>
          </li>
          <li>
            <h2 className="text-[--pink] text-5xl">Question</h2>
            <p className="text-2xl">Answer</p>
          </li>
          <li>
            <h2 className="text-[--pink] text-5xl">Question</h2>
            <p className="text-2xl">Answer</p>
          </li>
          <li>
            <h2 className="text-[--pink] text-5xl">Question</h2>
            <p className="text-2xl">Answer</p>
          </li>
          <li>
            <h2 className="text-[--pink] text-5xl">Question</h2>
            <p className="text-2xl">Answer</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
