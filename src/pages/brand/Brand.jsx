import { Space, Table } from "antd";
import AddBrand from "./AddBrand";
import BrandEdit from "./BrandEdit";
import ContentStateHandler from "../../components/ContentStateHandler";
import DeleteModal from "../../components/DeleteModal";
import StatusBadge from "../../components/StatusBadge";
import { useGetAllbrands } from "../../api/brandApi";

function Brand() {
  const { allbrands, isLoading, isError, error, refetch } = useGetAllbrands();

  const columns = [
    {
      title: <span>Name</span>,
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => <span className="">{name}</span>,
    },
    {
      title: <span className="mainColor">Status</span>,
      dataIndex: "status",
      key: "status",
      render: (v, record) => (
        <StatusBadge
          api_endpoint={"/brand/update-status"}
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
        return (
          <Space size="middle">
            <BrandEdit record={record} refetch={refetch} />

            <DeleteModal
              api_endpoint={`/brand/${record.id}`}
              type={"Brand"}
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
      <AddBrand refetch={refetch} />

      <ContentStateHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={allbrands?.data || []}
        onRetry={refetch}
      >
        <Table
          columns={columns}
          dataSource={allbrands?.data}
          rowKey="id"
          loading={isLoading}
          pagination={false}
        />
      </ContentStateHandler>
    </div>
  );
}

export default Brand;
