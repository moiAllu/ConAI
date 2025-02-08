import { deleteAiWritingById } from "../apicalls/ai-writing";

interface Props {
    mode: string;
    userId: string;
    _id: string;
  }
export const deleteHistoryByIdHandler = ({mode, userId,_id}:Props)=>{
    if(mode==="aiwriting"){
        return deleteAiWritingById(_id,userId)
    }

}