import { useEffect, useRef, useState } from "react";
import {
  createConversationApi,
  fetchConversationApi,
  refreshAllConversation,
} from "../services/aiChat";
import { usePlanStore } from "../../../shared/store/useSubsStat";
import { useParams } from "react-router-dom";

export const useAIConversation = () => {
  const { conversationId } = useParams();
  const [chats, setChats] = useState<{ question: string; answer: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [value, setValue] = useState("");
  const { monthly_quota } = usePlanStore();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const normalizeMarkdown = (text: string) => {
    return (
      text
        // 1. Paksa numbering jadi list valid
        .replace(/([.:]|^)\s*(\d+)\.(?=\S)/g, "\n\n$2. ")

        // 2. Pecah deskripsi pakai dash jadi sub-bullet
        .replace(/\s+-\s+/g, "\n   - ")

        // 3. Trim akhir
        .trim()
    );
  };

  const fetchConversation = async () => {
    setIsLoading(true);
    try {
      if (conversationId) {
        const res = await fetchConversationApi(conversationId);
        const regex = res.map((rx: { answer: string }) => ({
          ...rx,
          answer: normalizeMarkdown(rx.answer),
        }));

        setChats(regex);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    scrollToBottom();
    fetchConversation();
  }, [conversationId]);

  // const formatAnswer = (text: string) => {
  //   return (
  //     text
  //     .replace(/(\d+)\./g, "\n$1.")

  //       // bold **text**
  //       .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

  //       // italic *text*
  //       .replace(/\*(.*?)\*/g, "<em>$1</em>")

  //       // numbering list 1. item
  //       .replace(/^\d+\.\s+(.*)$/gm, "<li>$1</li>")

  //       // bullet list - item
  //       .replace(/^[\-\*]\s+(.*)$/gm, "<li>$1</li>")

  //       // ubah baris li menjadi <ul>...</ul>
  //       .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")

  //       // newline → <br/>
  //       .replace(/\n/g, "<br/>")
  //   );
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue("");
    if (!value.trim()) return;

    setIsLoadingSubmit(true);
    setIsStreaming(true);
    try {
      if (conversationId) {
        // Tambahkan pertanyaan pengguna dulu
        const newChat = { question: value, answer: "" };
        setChats((prev) => [...prev, newChat]);
        const currentIndex = chats.length;

        const response = await createConversationApi(value, conversationId);
        if (response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let fullAnswer = "";
          try {
            while (true) {
              const { done, value: chunkValue } = await reader.read();
              if (done) break;
              let chunk = decoder.decode(chunkValue, { stream: true });

              chunk = chunk
                .split("\n") // pecah per baris
                .filter(
                  (line) =>
                    line.startsWith("data:") && line.trim() !== "data: {}"
                ) // ambil baris data
                .map((line) => line.replace(/^data:\s*/, "")) // hapus "data:" dan spasi
                .join("\n");
              // .replace(/(\d+)\./g, "\n$1. ");
              fullAnswer += normalizeMarkdown(chunk);

              // Update chat terakhir secara live
              setChats((prev) => {
                const updated = [...prev];
                updated[currentIndex].answer = fullAnswer;
                return updated;
              });
              scrollToBottom();
            }
          } catch (error) {
            console.log("stream error", error);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      refreshAllConversation();
      setIsLoadingSubmit(false);
      setIsStreaming(false);
    }
  };
  return {
    handleSubmit,
    chats,
    isLoading,
    isStreaming,
    chatEndRef,
    value,
    setValue,
    isLoadingSubmit,
    monthly_quota
  };
};
