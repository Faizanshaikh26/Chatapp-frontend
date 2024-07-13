// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import Table from "../../components/shared/Table";
// import { Avatar, Box, Stack } from "@mui/material";
// import { dashboardData } from "../../constants/sampleData";
// import { fileFormat, transformImage } from "../../lib/features";
// import AvatarCard from "../../components/shared/AvatarCard";
// import RenderAttachment from '../../components/shared/RenderAttachment'

// const columns = [
//   {
//     field: "id",
//     headerName: "ID",
//     headerClassName: "table-header",
//     width: 200,
//   },
//   {
//     field: "attachment",
//     headerName: "Attachment",
//     headerClassName: "table-header",
//     width: 200,
//     renderCell: (params) => {
//       const {attachment} = params.row;

      





//       return  attachment?.length>0 ? 
//       attachment.map((item)=>{

//         const url=item.url;
//         const file=fileFormat(url)

//         return <Box>
//           <a href={url} download target="_blank" style={{
//             color:'black'
//           }}
//           >
//         {RenderAttachment(file,url)}

//           </a>
//         </Box>
//       }): 'No attachment'
      
    
//     },
//   },
//   {
//     field: "content",
//     headerName: "Content",
//     headerClassName: "table-header",
//     width: 400,
//   },
//   {
//     field: "sender",
//     headerName: "Sent By",
//     headerClassName: "table-header",
//     width: 200,
//     renderCell: (params) => (
//       <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
//         <Avatar src={params.row.sender.name} alt={params.row.sender.name} />
//         <span>{params.row.sender.name}</span>
//       </Stack>
//     ),
//   },
//   {
//     field: "chat",
//     headerName: "Chats",
//     headerClassName: "table-header",
//     width: 220,
//   },
//   {
//     field: "groupschat",
//     headerName: "Group Chat",
//     headerClassName: "table-header",
//     width: 100,
//   },
//   {
//     field: "createdAt",
//     headerName: "Time",
//     headerClassName: "table-header",
//     width: 250,
//   },
// ];

// function MessageManagement() {
//   const [rows, setRows] = useState([]);
//   return (
//     <AdminLayout>
//       <Table heading={"All Mesages"} columns={columns} rows={rows} rowheight={200} />
//     </AdminLayout>
//   );
// }

// export default MessageManagement;
import { useFetchData } from "6pp";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderAttachment from "../../components/shared/RenderAttachment";
import Table from "../../components/shared/Table";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { fileFormat, transformImage } from "../../lib/features";
import { useGetAllMessagesQuery } from "../../redux/api/api";


const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const attachments = params.row.attachments || []; // Ensure attachments is at least an empty array

      return attachments.length > 0
        ? attachments.map((i, index) => {
            const url = i.url;
            const file = fileFormat(url);

            return (
              <Box key={index}>
                <a
                  href={url}
                  download
                  target="_blank"
                  style={{
                    color: "black",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];




const MessageManagement = () => {
  const { data, isLoading, isError, error } = useGetAllMessagesQuery();

  useErrors([{ isError, error }]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.message?.map((i) => ({
          ...i,
          id: i._id,
          sender: {
            name: i.sender?.name || "Unknown",
            avatar: transformImage(i.sender?.avatar || "", 50),
          },
          attachments: i.attachment || [], // Ensure attachments has a default value
          createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table
          heading={"All Messages"}
          columns={columns}
          rows={rows}
          rowHeight={200}
        />
      )}
    </AdminLayout>
  );
};






export default MessageManagement;






