import { useState } from "react";
import { Space, Table, Avatar, Input } from "antd";
import ContentStateHandler from "../../components/ContentStateHandler";
import DeleteModal from "../../components/DeleteModal";
import StatusBadge from "../../components/StatusBadge";
import { useAllUsers } from "../../api/userApi";

const UserAvatar = ({ name, profile }) => {
  const initials = (name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (profile) {
    return (
      <Avatar
        src={profile}
        size={42}
        className="shadow-sm border border-gray-200"
      />
    );
  }

  return (
    <Avatar
      size={42}
      className="bg-emerald-500 font-semibold text-white shadow-sm flex items-center justify-center"
    >
      {initials}
    </Avatar>
  );
};

function Users() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 20,
    search: "",
  });
  const { allUsers, isLoading, isError, error, refetch } = useAllUsers(filter);

  const isSearching = filter.search.trim().length > 0;

  const columns = [
    {
      title: <span>Name</span>,
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3 py-1">
          <UserAvatar name={record?.name} profile={record?.profile} />
          <div className="flex flex-col justify-center text-left min-w-0">
            <span className="font-semibold text-gray-800 text-[15px] leading-tight truncate">
              {record?.name ?? "—"}
            </span>
            <span className="text-gray-500 text-[13px] mt-0.5 truncate">
              {record?.email ?? "—"}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: <span>Phone</span>,
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: <span>Skin Tone</span>,
      dataIndex: "skinTone",
      key: "skinTone",
      align: "center",
    },
    {
      title: <span>Face Shape</span>,
      dataIndex: "faceShape",
      key: "faceShape",
      align: "center",
    },
    {
      title: <span>Eye Shape</span>,
      dataIndex: "eyeShape",
      key: "eyeShape",
      align: "center",
    },
    {
      title: <span>Skin Type</span>,
      dataIndex: "skinType",
      key: "skinType",
      align: "center",
    },
    {
      title: <span>Under Tone</span>,
      dataIndex: "underTone",
      key: "underTone",
      align: "center",
    },
    {
      title: <span className="mainColor">Status</span>,
      dataIndex: "status",
      key: "status",
      render: (v, record) => (
        <StatusBadge
          api_endpoint={"/user/update-status"}
          id={record.id}
          status={v}
          refetch={refetch}
          statusOptions={["ACTIVE", "PENDING", "INACTIVE", "SUSPENDED"] || []}
          isEditable={true}
        />
      ),
      align: "center",
    },
    {
      title: <span>Action</span>,
      key: "action",
      align: "center",
      render: (_, record) => {
        return (
          <Space size="middle">
            <DeleteModal
              api_endpoint={`/user/${record.id}`}
              type={"User"}
              title={record?.name}
              refetch={refetch}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <div className="">
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          // justifyContent: "flex-end",
        }}
      >
        <Input.Search
          size="large"
          placeholder="Search by name, email..."
          onSearch={(value) => setFilter({ ...filter, search: value, page: 1 })}
          style={{ width: 300 }}
          allowClear
        />
      </div>
      <ContentStateHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={allUsers?.data || []}
        onRetry={refetch}
      >
        <Table
          columns={columns}
          dataSource={allUsers?.data}
          rowKey="id"
          loading={isLoading}
          pagination={
            isSearching
              ? {
                  current: filter.page,
                  pageSize: filter.limit,
                  total: allUsers?.pagination?.total || 0,
                  onChange: (p) => setFilter({ ...filter, page: p }),
                  showTotal: (total) => `${total} users found`,
                  showSizeChanger: false,
                  style: { paddingRight: 16, paddingBottom: 8 },
                }
              : {
                  current: filter.page,
                  pageSize: filter.limit,
                  total: allUsers?.pagination?.total || 0,
                  onChange: (p) => setFilter({ ...filter, page: p }),
                  showSizeChanger: false,
                  showTotal: (total) => `${total} Users`,
                  style: { paddingRight: 16, paddingBottom: 8 },
                }
          }
        />
      </ContentStateHandler>
    </div>
  );
}

export default Users;
