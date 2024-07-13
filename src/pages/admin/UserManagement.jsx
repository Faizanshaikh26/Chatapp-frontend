import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar } from "@mui/material";
import { transformImage } from '../../lib/features';
import { useGetAllUsersDataQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";

function UserManagement() {
  const { data, error, isError } = useGetAllUsersDataQuery();
  const dashboardData = data;

  useErrors([{ error, isError }]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      headerClassName: "table-header",
      width: 150,
      renderCell: (params) => (
        <Avatar src={params.row.avatar} alt={params.row.name} />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "friends",
      headerName: "Friends",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "groups",
      headerName: "Groups",
      headerClassName: "table-header",
      width: 200,
    },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (dashboardData?.users) {
      setRows(
        dashboardData.users.map((data) => ({
          ...data,
          id: data._id,
          avatar: transformImage(data.avatar, 50),
        }))
      );
    }
  }, [dashboardData]);

  return (
    <AdminLayout>
      <div>
        <Table heading={"All Users"} columns={columns} rows={rows} />
      </div>
    </AdminLayout>
  );
}

export default UserManagement;
