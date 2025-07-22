import { createContext, useState, useContext, ReactNode } from "react";
import { askAboutMe } from "@/lib/aiServices";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

interface ChatContextType {
  chatHistory: ChatMessage[];
  sendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (question: string) => {
    const userMessage: ChatMessage = { sender: "user", text: question };
    setChatHistory((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const botResponse = await askAboutMe(question);
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

  return (
    <ChatContext.Provider value={{ chatHistory, sendMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
