import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/utils/supabase";
import { send } from "process";

export function Navigation() {
  const { user, profile, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [msgError, setMsgError] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsgError("");
    setSendingMsg(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const { error: submissionError } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name,
          email,
          message,
          user_id: profile?.id ?? null,
        },
      ]);

    if (submissionError) {
      setMsgError(submissionError.message);
      setSendingMsg(false);
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (!res.ok) {
      setMsgError((await res.json()).error);
      setSendingMsg(false);
      return;
    }

    alert("Message sent successfully!");
    setContactOpen(false);
    setSendingMsg(false);
  };

  return (
    <nav className="relative mx-auto my-0 w-[90%] max-w-[1500] h-fit flex items-center justify-between p-5 text-black rounded-full z-50">
      <Link
        className="hover:scale-110 w-fit p-4 transition-transform duration-300"
        href="/b4g"
        onClick={() => setMenuOpen(false)}
      >
        <Image
          src="/b4g/long logo.svg"
          width={1072.48}
          height={229.37}
          alt=""
          className="h-14 w-auto"
        />
      </Link>
      {/* TODO Change max-w to 1000 when Tracks are added */}
      <div className="hidden max-w-[800] flex-1 xl:flex justify-end">
        <div className="flex gap-5 text-2xl items-center justify-between p-3 px-6 rounded-full bg-white text-center">
          {/* XXX Remove track atm
          <Link className="p-2 hover:scale-110 my-auto" href="/b4g/Tracks">
            Tracks
          </Link>
          */}

          <Link
            className="p-2 hover:scale-110 my-auto transition-transform duration-300"
            href="/b4g/FAQ"
          >
            FAQ
          </Link>

          <button
            onClick={() => setContactOpen(true)}
            className="p-2 hover:scale-110 my-auto transition-transform duration-300"
          >
            Contact
          </button>

          {profile?.id && (
            <Link
              href="/b4g/Dashboard"
              className="flex flex-row w-fit p-2 gap-3 px-5 hover:scale-110 text-black my-auto transition-transform duration-300"
            >
              <Image
                src="/b4g/bunny icon.svg"
                alt="bunny icon"
                width={21.92}
                height={31.16}
              />
              <span className="min-w-0 truncate">{profile.first_name}</span>
            </Link>
          )}

          {profile?.id ? (
            <button
              onClick={logout}
              className="p-2 px-5 hover:scale-105 bg-[--pink] text-white rounded-full my-auto transition-transform duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/b4g/Auth"
              className="p-2 px-5 hover:scale-110 bg-[--pink] text-white rounded-full my-auto transition-transform duration-300"
            >
              Login
            </Link>
          )}

          <Link
            className="flex gap-5 p-2 px-5 hover:scale-110 border-[--pink] text-[--pink] border-4 rounded-full my-auto transition-transform duration-300"
            href="https://discord.gg/CBWn8mKFvx"
          >
            <svg
              fill="#D594DC"
              strokeWidth="0"
              viewBox="0 0 640 512"
              height="2rem"
              width="2rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
            </svg>
            <h1 className="w-fit whitespace-nowrap">Join our Discord</h1>
          </Link>
        </div>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`relative flex xl:hidden flex-col justify-between items-center p-5 rounded-full ${menuOpen ? "bg-[--pink]" : ""} aspect-square transition duration-500`}
      >
        <div className="grid justify-items-center gap-1.5 my-auto">
          <span
            className={`h-1 w-8 rounded-full bg-white transition duration-500 ${menuOpen ? "rotate-45" : ""} ${menuOpen ? "translate-y-2.5" : ""}`}
          />
          <span
            className={`h-1 w-8 rounded-full bg-white ${menuOpen ? "scale-x-0" : ""} transition duration-500`}
          />
          <span
            className={`h-1 w-8 rounded-full bg-white transition duration-500 ${menuOpen ? "-rotate-45" : ""} ${menuOpen ? "-translate-y-2.5" : ""} duration-500`}
          />
        </div>
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="p-3 absolute top-full h-fit w-full left-0 xl:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <div className="p-[1rem] rounded-[3rem] bg-gradient-to-b from-[--peach] to-[--pink]">
              <div className="p-4 rounded-[2rem] bg-white flex flex-col gap-5 text-2xl">
                {profile?.id && (
                  <Link
                    href="/b4g/Dashboard"
                    className="flex flex-row w-fit p-2 gap-3 px-5 hover:scale-110 text-black my-auto"
                  >
                    <Image
                      src="/b4g/bunny icon.svg"
                      alt="bunny icon"
                      width={21.92}
                      height={31.16}
                    />
                    <span className="min-w-0 truncate">
                      {profile.first_name}
                    </span>
                  </Link>
                )}

                {/* XXX Remove tracks atm
                <Link
                  className="p-2 hover:scale-105 w-fit my-auto"
                  href="/b4g/Tracks"
                >
                  Tracks
                </Link>
                 */}

                <Link
                  className="p-2 hover:scale-105 w-fit my-auto"
                  href="/b4g/FAQ"
                >
                  FAQ
                </Link>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setContactOpen(true);
                  }}
                  className="p-2 hover:scale-105 w-fit my-auto text-left"
                >
                  Contact
                </button>

                {profile?.id ? (
                  <button
                    onClick={logout}
                    className="p-2 px-5 hover:scale-105 w-fit bg-[--pink] text-white rounded-full my-auto min-w-0 truncate"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/b4g/Auth"
                    className="p-2 px-5 hover:scale-105 w-fit bg-[--pink] text-white rounded-full my-auto"
                  >
                    Login
                  </Link>
                )}

                <Link
                  className="flex gap-5 p-2 px-5 hover:scale-105 w-fit border-[--pink] text-[--pink] border-4 rounded-full my-auto"
                  href="https://discord.gg/CBWn8mKFvx"
                >
                  <svg
                    fill="#D594DC"
                    strokeWidth="0"
                    viewBox="0 0 640 512"
                    height="2rem"
                    width="2rem"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
                  </svg>
                  <h1 className="w-fit whitespace-nowrap my-auto">
                    Join our Discord
                  </h1>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]"
            onClick={() => setContactOpen(false)}
          >
            <motion.div
              initial={{ y: -40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[90%] max-w-md p-8 rounded-[2rem] shadow-xl flex flex-col gap-5"
            >
              <h2 className="text-3xl font-semibold text-center">
                Contact TACS
              </h2>

              <p className="text-red-600" hidden={!msgError}>
                {msgError}
              </p>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Your Name"
                  required
                  defaultValue={
                    profile ? `${profile.first_name} ${profile.last_name}` : ""
                  }
                  className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[--pink]"
                />

                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue={user?.email ?? ""}
                  placeholder="Your Email"
                  className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[--pink]"
                />

                <div className="flex flex-col gap-2">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    maxLength={500}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    required
                    rows={4}
                    className="p-3 rounded-xl border resize-none focus:outline-none focus:ring-2 focus:ring-[--pink]"
                  />
                  <small
                    className={`m-0 text-sm ${
                      message.length === 500 ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    {message.length}/500 characters
                  </small>
                </div>

                <button
                  type="submit"
                  disabled={sendingMsg}
                  className="bg-[--pink] text-white p-3 rounded-full hover:scale-105 transition"
                >
                  {sendingMsg ? "Sending Message..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
