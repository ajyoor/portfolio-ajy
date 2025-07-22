import { useState, FormEvent, useRef, useEffect } from "react";
import { askAboutMe } from "../lib/aiServices";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import Card from "@/components/Card";
import { DotCircleContent } from "@/components/Content";
import { useChat } from "@/context/Talk";
import GeminiIcon from "@/assets/gemini.svg";
import { SiGooglegemini } from "react-icons/si";
import ImgPerson from "@/assets/kren.jpeg";
import { Textarea } from "@/components/Textarea";
import clsx from "clsx";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

export default function TalkContent({ dark }: { readonly dark: boolean }) {
  const { chatHistory, setChatHistory } = useChat();
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    const userMessage: ChatMessage = { sender: "user", text: userInput };
    setChatHistory((prev) => [...prev, userMessage]);
    setUserInput("");

    try {
      const botResponse = await askAboutMe(userInput);
      const botMessage: ChatMessage = { sender: "bot", text: botResponse };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log(error);
      const errorMessage: ChatMessage = {
        sender: "bot",
        text: "Maaf, terjadi kesalahan. Coba lagi nanti.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Card dark={dark} className="h-[calc(100dvh-105px)] flex flex-col">
      {/* description content */}
      {chatHistory.length > 0 ? (
        <div
          className={`flex items-baseline justify-center gap-1 h-fit ${
            !dark ? "text-grayText" : "text-white"
          } font-bold text-xs -mt-2`}
        >
          <span>Powered by</span>
          <button
            type="button"
            className="bg-transparent border-none p-0 m-0 flex items-center"
            aria-label="Kunjungi Gemini Google"
            onClick={() => {
              window.location.href = "https://gemini.google/about/?hl=id";
            }}
          >
            <img
              className="w-11 translate-y-[1px] cursor-pointer"
              src={GeminiIcon}
              alt="gemini-icon"
              loading="lazy"
            />
          </button>
        </div>
      ) : (
        <section className="items-center">
          <DotCircleContent dark={dark} title="Persona" />
          <span
            className={`${
              !dark ? "text-grayText" : "text-white"
            } text-justify text-base sm:text-sm leading-8 sm:!leading-6 pt-2 block`}
          ></span>
        </section>
      )}

      <div
        ref={chatContainerRef}
        className={`flex-1 min-h-0 overflow-y-auto transition-colors ${
          !dark ? "bg-grayBg border-grayBorder" : "bg-lightBg2"
        } ${chatHistory.length === 0 && "flex items-center m-auto"} rounded-lg`}
      >
        {chatHistory.length > 0 ? (
          <>
            {chatHistory.map((chat, index) => (
              <div
                key={index + "chat"}
                className={`flex ${
                  chat.sender === "user" ? "justify-end" : "justify-start gap-3"
                } mb-4`}
              >
                {chat.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={ImgPerson}
                      alt="Airlangga Joyonegoro"
                      className="w-full h-full object-cover pointer-events-none scale-[3] -mt-4 ml-[1px]"
                      loading="lazy"
                    />
                  </div>
                )}
                <div
                  className={clsx(
                    "max-w-md flex flex-col gap-2 p-3 text-sm font-medium leading-relaxed rounded-lg",
                    {
                      "bg-blue-900 text-white": chat.sender === "user" && !dark,
                      "bg-blue-500 text-white": chat.sender === "user" && dark,
                      "bg-[#373737] text-grayTextContent":
                        chat.sender !== "user" && !dark,
                      "border-lightBorder bg-lightBg text-grayText":
                        chat.sender !== "user" && dark,
                    }
                  )}
                >
                  <p>{chat.text}</p>
                </div>
              </div>
            ))}
            {/* {isLoading && (
              <div className="flex items-center justify-center -my-8">
                <DotLottieReact
                  src="https://lottie.host/381faebd-6f71-480d-a0b5-afa7fd100f29/hfc7snLdCY.lottie"
                  loop
                  autoplay
                  style={{ height: "80px", width: "80px" }}
                />
              </div>
            )} */}
          </>
        ) : (
          <div
            className={`flex flex-col text-center items-center h-fit font-bold text-base transition-colors ${
              !dark ? "text-grayText" : "text-white"
            }`}
          >
            <SiGooglegemini size={52} className="mb-6" />
            An Interactive Persona
            <br />
            <span className="flex items-center -mt-1">
              Running On{" "}
              <img
                className="size-14 -mt-2 ml-[6px]"
                src={GeminiIcon}
                alt="gemini-icon"
                loading="lazy"
              />
            </span>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className={`flex items-center border gap-2 p-3 flex-col rounded-xl transition-colors ${
          !dark
            ? "border-grayBorder bg-[#373737] text-white"
            : "border-lightBorder bg-lightBg text-grayText"
        }`}
      >
        <Textarea
          dark={dark}
          className={`h-10 !p-0 font-medium !border-none`}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          placeholder="Ask me anything..."
          disabled={isLoading}
        />
        <div className="flex justify-end w-full">
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              dark
                ? "bg-lightText disabled:text-grayTextContent disabled:bg-lightBg"
                : "border-grayBorder bg-grayBg text-white"
            } text-white font-semibold rounded-full p-3 disabled:cursor-not-allowed transition-colors sm:w-auto`}
          >
            {isLoading ? (
              <FaSpinner size={14} className="animate-spin" />
            ) : (
              <FaPaperPlane size={14} />
            )}
          </button>
        </div>
      </form>
    </Card>
  );
}
