// import React from "react";
// import { Link } from "../styles/StyledComponents";
// import { Box, Stack, Typography } from "@mui/material";
// import AvatarCard from "./AvatarCard";

// function Chatitem({
//   avatar = [],
//   name,
//   _id,
//   groupChat = false,
//   samesender,
//   isOnline,
//   newMessageAlert,
//   index = 0,
//   handleDeleteChat,
// }) {
//   return (
//     <>
//       <Link sx={{padding:'0'}}  to={`/chat/${_id}`} onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}>
//         <div
//           style={{
//             display: "flex",
//             gap: "1rem",
//             alignItems: "center",
//             padding: "1rem",
//             backgroundColor: samesender ? "black" : "unset",
//             color: samesender ? "white" : "unset",
//             position: "relative",
//           }}
//         >
//           <AvatarCard avatar={avatar}/>
//           <Stack>
//             <Typography>{name}</Typography>
//             {newMessageAlert && (
//               <Typography>{newMessageAlert.count} New Message</Typography>
//             )}
//           </Stack>

//           {
//             isOnline && <Box sx={{
//                 width:'10px',
//                 height:'10px',
//                 borderRadius:'50%',
//                 backgroundColor:'green',
//                 position:'absolute',
//                 top:'50%',
//                 right:'1rem',
//                 transform:'translateY(-50%)'
//             }}/>
//           }
//         </div>
//       </Link>
//     </>
//   );
// }

// export default Chatitem;


// import React from "react";
// import { Link } from "react-router-dom";
// import AvatarCard from '../shared/AvatarCard'
// import {motion,delay} from 'framer-motion'

// function Chatitem({
//   avatar = [],
//   name,
//   _id,
//   groupChat = false,
//   samesender,
//   isOnline,
//   newMessageAlert,
//   index = 0,
//   handleDeleteChat,
// }) {
//   return (
//     <Link
//       to={`/chat/${_id}`}
//       onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
//       className="block"
//     >
//       <motion.div
//        initial={{ opacity: 0, y: "-100%" }}
//        whileInView={{ opacity: 1, y: 0 }}
//        trasition={{delay:index * 0.1}}
      
//         className={`flex gap-4 items-center p-4 border-b border-white ${samesender ? 'bg-[#FFF1F1] text-[#0E1514]' : 'text-[#0E1514]'} hover:bg-[#FFF1F1] transition duration-200 ease-in-out`}
//         style={{ position: "relative" }}
//       >
//         <div className="flex-shrink-0 ">
//         <AvatarCard avatar={avatar}/>
//         </div>
//         <div className="flex flex-col">
//           <span className="font-bold text-[16px] font-serif mb-7">{name}</span>
//           {newMessageAlert && (
//             <span>{newMessageAlert.count} New Message</span>
//           )}
//         </div>
//         {isOnline && (
//           <div
//             className="w-2.5 h-2.5 rounded-full bg-green-500 absolute top-1/2 right-4 transform -translate-y-1/2"
//           />
//         )}
//       </motion.div>
//     </Link>
//   );
// }

// export default Chatitem;

import React from "react";
import { Link } from "react-router-dom";
import AvatarCard from '../shared/AvatarCard'
import {motion,delay} from 'framer-motion'

function Chatitem({
  avatar = [],
  name,
  _id,
  groupChat = false,
  samesender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) {
 
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      className="block"
    >
      <motion.div
       initial={{ opacity: 0, y: "-100%" }}
       whileInView={{ opacity: 1, y: 0 }}
       trasition={{delay:index * 0.1}}
      
        className={`flex gap-4 items-center p-4 border-b bg-[#ffffff] text-[#111b21] border-white ${samesender ? 'bg-[#f0f2f5] text-[#0E1514]' : 'text-[#111b21]'} hover:bg-[#f0f2f5] transition duration-200 ease-in-out`}
        style={{ position: "relative" }}
      >
        <div className="flex-shrink-0 ">
        <AvatarCard avatar={avatar}/>
        </div>
        <div className="flex flex-col border-b-[1px]  w-full ">
          <span className="font-bold text-[16px] font-serif mb-2 ml-3">{name}</span>
          {newMessageAlert && (
            <span className="text-[14px] mb-[2px]" >{newMessageAlert.count} New Message</span>
          )}
        </div>
        {isOnline && (
          <div
            className="w-2.5 h-2.5 rounded-full bg-green-500 absolute top-1/2 right-4 transform -translate-y-1/2"
          />
        )}
      </motion.div>
    </Link>
  );
}

export default Chatitem;


