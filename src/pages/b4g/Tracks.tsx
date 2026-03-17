import { useState } from "react";

export default function Tracks() {
  const [selected, setSelected] = useState<number>(0);
  // return (
  //   <div className="flex flex-col max-w-[80dvw] mx-auto gap-10">
  //     <h1 className="text-6xl text-white text-center">
  //       STOP LOOKING AT THIS PAGE
  //     </h1>
  //     <Link
  //       href="/b4g"
  //       className="text-6xl text-white text-center mx-auto bg-[--pink] rounded-full p-5"
  //     >
  //       GO BACK
  //     </Link>
  //   </div>
  // );
  // TODO Finish this page
  return (
    <div className="w-dvw flex flex-col gap-5 max-w-[90dvw] mx-auto">
      <h1 className="mx-auto w-fit p-10 text-8xl">Tracks</h1>
      <div className="flex flex-row w-fit mx-auto gap-[2dvw]">
        <button
          className={`hover:scale-105 duration-300 active:scale-95 text-2xl ${selected == 0 ? "text-[--pink]" : "text-white"}`}
          onClick={() => {
            setSelected(0);
          }}
        >
          BEST OVERALL
        </button>
        <button
          className={`hover:scale-105 duration-300 active:scale-95 text-2xl ${selected == 1 ? "text-[--pink]" : "text-white"}`}
          onClick={() => {
            setSelected(1);
          }}
        >
          POKER BOT
        </button>
        <button
          className={`hover:scale-105 duration-300 active:scale-95 text-2xl ${selected == 2 ? "text-[--pink]" : "text-white"}`}
          onClick={() => {
            setSelected(2);
          }}
        >
          FIGMA(UI/UX)
        </button>
        <button
          className={`hover:scale-105 duration-300 active:scale-95 text-2xl ${selected == 3 ? "text-[--pink]" : "text-white"}`}
          onClick={() => {
            setSelected(3);
          }}
        >
          AGGIEX STARTUP
        </button>
      </div>
      <BestOverall hidden={selected != 0} />
      <PokerBot hidden={selected != 1} />
      <Figma hidden={selected != 2} />
      <AggieX hidden={selected != 3} />
    </div>
  );
}

function BestOverall({ hidden }: { hidden: boolean }) {
  return (
    <div className="mx-auto" hidden={hidden}>
      <h1>BestOverall</h1>
    </div>
  );
}

function PokerBot({ hidden }: { hidden: boolean }) {
  return (
    <div className="mx-auto" hidden={hidden}>
      <h1>PokerBot</h1>
    </div>
  );
}
function Figma({ hidden }: { hidden: boolean }) {
  return (
    <div className="mx-auto" hidden={hidden}>
      <h1>Figma</h1>
    </div>
  );
}

function AggieX({ hidden }: { hidden: boolean }) {
  return (
    <div className="mx-auto" hidden={hidden}>
      <h1>AggieX</h1>
    </div>
  );
}
