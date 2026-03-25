import { useState } from "react";

export default function Tracks() {
  const [selected, setSelected] = useState<number>(0);
  // TODO Finish this page
  return (
    <div className="w-dvw flex flex-col gap-5 max-w-[90dvw] mx-auto">
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
