import axios from "axios";

export const useMeetings = ()=>{
  const getUserMeetings = async()=>{
    const meetings = await axios.get(`${process.env.NEXT_PUBLIC_URL}/google/get_events`);
    return meetings.data
  } 

  return {
    getUserMeetings,
  };
}