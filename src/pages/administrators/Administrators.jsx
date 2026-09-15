import { Button, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import AddAdmin from "./AddAmin";
import AdminEdit from "./AdminEdit";
import { useAllAdmins } from "../../api/adminApi";
import ContentStateHandler from "../../components/ContentStateHandler";
import DeleteModal from "../../components/DeleteModal";
import StatusBadge from "../../components/StatusBadge";

function Administrators() {
  const { allAdmins, isLoading, isError, error, refetch } = useAllAdmins();

  //         "profilePic": null,

  const columns = [
    {
      title: <span>Name</span>,
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => <span className="">{name}</span>,
    },
    {
      title: <span>Email</span>,
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (email) => <span className="">{email}</span>,
    },
    {
      title: <span>Phone</span>,
      dataIndex: "phone",
      key: "phone",
      align: "center",
      render: (phone) => <span className="">{phone || "N/A"}</span>,
    },
    {
      title: <span>Role</span>,
      dataIndex: "roleName",
      key: "roleName",
      align: "center",
      render: (roleName) => <span className="">{roleName}</span>,
    },
    {
      title: <span className="mainColor">Status</span>,
      dataIndex: "status",
      key: "status",
      render: (v, record) => (
        <StatusBadge
          api_endpoint={"/admin/update-status"}
          id={record.id}
          status={v}
          refetch={refetch}
          statusOptions={["ACTIVE", "INACTIVE"] || []}
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
        const isSuperAdmin = record.roleName === "Super Admin";

        return (
          <Space size="middle">
            <AdminEdit adminProfile={record} refetch={refetch} />

            {isSuperAdmin ? (
              <Button
                title="Super Admin cannot be deleted"
                icon={<DeleteOutlined />}
                className="cursor-not-allowed bg-white"
              />
            ) : (
              <DeleteModal
                api_endpoint={`/admin/${record.id}`}
                type={"Admin"}
                title={record?.name}
                refetch={refetch}
              />
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="">
      <AddAdmin refetch={refetch} />

      <ContentStateHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={allAdmins || []}
        onRetry={refetch}
      >
        <Table
          columns={columns}
          dataSource={allAdmins}
          rowKey="id"
          loading={isLoading}
          pagination={false}
        />
      </ContentStateHandler>
    </div>
  );
}

export default Administrators;
