import { useEffect, useState } from "react";

export default function Tracks() {
  const [selected, setSelected] = useState<number>(0);
  return (
    <div className="w-dvw flex flex-col gap-5">
      <h1 className="mx-auto w-fit p-10 text-8xl">Tracks</h1>
      <div className="flex flex-row w-fit mx-auto gap-20">
        <button
          className={`text-2xl ${selected == 0 ? "text-[--blue]" : "text-white"}`}
          onClick={() => {
            setSelected(0);
          }}
        >
          BEST OVERALL
        </button>
        <button
          className={`text-2xl ${selected == 1 ? "text-[--blue]" : "text-white"}`}
          onClick={() => {
            setSelected(1);
          }}
        >
          POKER BOT
        </button>
        <button
          className={`text-2xl ${selected == 2 ? "text-[--blue]" : "text-white"}`}
          onClick={() => {
            setSelected(2);
          }}
        >
          FIGMA(UI/UX)
        </button>
        <button
          className={`text-2xl ${selected == 3 ? "text-[--blue]" : "text-white"}`}
          onClick={() => {
            setSelected(3);
          }}
        >
          AGGIEX STARTUP
        </button>
      </div>
      <div className="mx-auto w-fit" hidden={selected != 0}>
        <p className="w-fit text-3xl">
          Best overall hack that meets all of the judging criteria: creativity,
          technical complexity, and societal impact
        </p>
      </div>
      <div className="mx-auto w-fit" hidden={selected != 1}>
        <p className="w-fit text-3xl">
          Create an algorithm to play against other bots in a variant of poker.
        </p>
      </div>
      <div className="mx-auto w-fit" hidden={selected != 2}>
        <p className="w-fit text-3xl">
          Hack with best design and seamless user experience using the Figma API
        </p>
      </div>
      <div className="mx-auto w-fit" hidden={selected != 3}>
        <p className="w-fit text-3xl">Hello</p>
      </div>
    </div>
  );
}
