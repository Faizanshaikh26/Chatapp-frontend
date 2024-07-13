import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { useErrors } from "../../hooks/hook";
import { useGetDashBoardStatsQuery } from "../../redux/api/api";

function Dashboard() {
  const getDashBoardStats = useGetDashBoardStatsQuery();
  const data = getDashBoardStats.data?.message;

  // console.log("totalChatsCount",data?.totalChatsCount);
  // console.log("groupCount",data?.groupCount);

  const errors = [
    {
      isError: getDashBoardStats.isError,
      error: getDashBoardStats.error,
    },
  ];

  useErrors(errors);
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "3rem",
          }}
        />
        <SearchField placeholder="Search" />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
        >
          {moment().format("MMMM Do YYYY")}
        </Typography>
      </Stack>
    </Paper>
  );

  const Widgets = (
    <>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent={"space-between"}
        alignItems={"center"}
        margin={"2rem 0"}
      >
        <Widget title={"Users"} value={data?.userCount||0} icon={<PersonIcon />} />
        <Widget title={"Chats"} value={data?.totalChatsCount || 0} icon={<GroupIcon />} />
        <Widget title={"Messages"} value={data?.messagesCount||0} icon={<MessageIcon />} />
      </Stack>
    </>
  );
  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}

        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
          spacing={"4rem"}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: {
                xs: "45rem",
                lg: "30rem",
              },
            }}
          >
            <Typography margin={"2rem 0"} variant="h5">
              Last messages
            </Typography>

            <LineChart value={data?.messagesChart} />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              position: "relative",
              alignItems: "center",
              width: {
                xs: "100%",
                lg: "50%",
              },
              maxWidth: "25rem",
              width: "100%",
              // height: "25rem",
            }}
          >
            <DoughnutChart
              labels={["Single Chat", "Group Chat"]}
              value={[data?.totalChatsCount-data?.groupCount
                ,data?.groupCount]}
            />

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon /> <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>

        <Stack>{Widgets}</Stack>
      </Container>
    </AdminLayout>
  );
}

const Widget = ({ title, value, icon }) => (
  <Paper
    sx={{
      padding: "2rem",
      margin: "2rem 1rem ",
      borderRadius: "1rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: "5px solid rgba(0,0,0,0.9)",
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);
export default Dashboard;
