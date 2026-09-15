import { Space, Table } from "antd";
import AddCategory from "./AddCategory";
import CategoryEdit from "./CategoryEdit";
import ContentStateHandler from "../../components/ContentStateHandler";
import DeleteModal from "../../components/DeleteModal";
import StatusBadge from "../../components/StatusBadge";
import { useGetAllCategories } from "../../api/categoryApi";

function Category() {
  const { allCategories, isLoading, isError, error, refetch } =
    useGetAllCategories();

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
          api_endpoint={"/category/update-status"}
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
            <CategoryEdit record={record} refetch={refetch} />

            <DeleteModal
              api_endpoint={`/category/${record.id}`}
              type={"Category"}
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
      <AddCategory refetch={refetch} />

      <ContentStateHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={allCategories?.data || []}
        onRetry={refetch}
      >
        <Table
          columns={columns}
          dataSource={allCategories?.data}
          rowKey="id"
          loading={isLoading}
          pagination={false}
        />
      </ContentStateHandler>
    </div>
  );
}

export default Category;
