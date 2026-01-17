import { useEffect, useState } from "react";
import { formatDate } from "../../../../../shared/utils/FormatDate";
import { chatLogDetail } from "../../../services/admin/ChatLog";
import { useParams } from "react-router-dom";

export const useChatLogDetail = () => {
const { conversationId } = useParams<{ conversationId: string }>();
  const [data, setData] = useState({
    chat_history: [],
    conversation_created_at: "",
    conversation_id: "",
    conversation_title: "",
    division_name: "",
    referenced_documents: [],
    username: "",
    avg_response_time_ms: "",
    avg_match_score: 0,
  });

  useEffect(() => {
    const fetchChatLogDetail = async () => {
      try {
        if (conversationId) {
          const res = await chatLogDetail(conversationId);
          const dateConvert = formatDate(res.conversation_created_at, true);
          const milisecond = res.avg_response_time_ms;
          const totalSecond = Math.floor(milisecond / 1000);
          const minute = Math.floor(totalSecond / 60);
          const sec = totalSecond % 60;

          const similarityPercent = Math.floor(res.avg_match_score);

          setData({
            chat_history: res.chat_history,
            conversation_created_at: dateConvert,
            conversation_id: res.conversation_id,
            conversation_title: res.conversation_title,
            division_name: res.division_name,
            referenced_documents: res.referenced_documents,
            username: res.username,
            avg_match_score: similarityPercent,
            avg_response_time_ms: `${minute} Menit ${sec} Detik`,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchChatLogDetail();
  }, []);

  return {
    data
  }
}