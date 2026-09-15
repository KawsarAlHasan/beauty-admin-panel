import React, { useState } from "react";
import { Space, Table, Image, Input, Select, Tag, Card, Button } from "antd";
import { SearchOutlined, FilterOutlined, EyeOutlined } from "@ant-design/icons";
import ContentStateHandler from "../../components/ContentStateHandler";
import DeleteModal from "../../components/DeleteModal";
import StatusBadge from "../../components/StatusBadge";
import { useAllMakeupTutorials } from "../../api/tutorialsApi";
import AddTutorial from "./AddTutorial";
import EditTutorial from "./EditTutorial";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

function MakeupTutorial() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 20,
    search: "",
    status: "all",
    type: "", // enum: BEGINNER, INTERMEDIATE, ADVANCED
  });

  const navigate = useNavigate();

  const { allMakeupTutorials, isLoading, isError, error, refetch } =
    useAllMakeupTutorials(filter);

  const getTypeColor = (type) => {
    switch (type) {
      case "BEGINNER":
        return "green";
      case "INTERMEDIATE":
        return "blue";
      case "ADVANCED":
        return "purple";
      default:
        return "default";
    }
  };

  const handleViewSteps = (record) => {
    navigate(`/makeup-tutorial/${record.id}`);
  };

  const columns = [
    {
      title: <span>Thumbnail</span>,
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) => (
        <Image
          src={image}
          alt="tutorial thumbnail"
          width={60}
          height={60}
          style={{
            objectFit: "cover",
            borderRadius: "8px",
            border: "1px solid #f0f0f0",
          }}
        />
      ),
    },
    {
      title: <span>Title & Description</span>,
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div style={{ maxWidth: "300px" }}>
          <div className="font-semibold text-gray-800 text-base mb-1">
            {record.title}
          </div>
          <div
            className="text-gray-500 text-xs line-clamp-2"
            title={record.description}
          >
            {record.description}
          </div>
        </div>
      ),
    },
    {
      title: <span>Level</span>,
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => (
        <Tag
          color={getTypeColor(type)}
          className="px-3 py-1 rounded-full text-xs font-medium"
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "View Steps",
      dataIndex: "steps",
      key: "steps",
      render: (_, record) => (
        <Button onClick={() => handleViewSteps(record)} icon={<EyeOutlined />}>
          View
        </Button>
      ),
    },
    // {
    //   title: <span className="mainColor">Status</span>,
    //   dataIndex: "status",
    //   key: "status",
    //   align: "center",
    //   render: (v, record) => (
    //     <StatusBadge
    //       api_endpoint={"/makeup-tutorial/update"}
    //       id={record.id}
    //       status={v}
    //       refetch={refetch}
    //       statusOptions={["ACTIVE", "INACTIVE"]}
    //       isEditable={true}
    //     />
    //   ),
    // },
    {
      title: <span>Action</span>,
      key: "action",
      align: "center",
      render: (_, record) => {
        return (
          <Space size="middle">
            <EditTutorial record={record} refetch={refetch} />
            <DeleteModal
              api_endpoint={`/makeup-tutorial/delete/${record.id}`}
              type={"Tutorial"}
              title={record?.title}
              refetch={refetch}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 m-0">
            Makeup Tutorials
          </h2>
          <p className="text-gray-500 m-0 text-sm">
            Manage all makeup video tutorials and lessons
          </p>
        </div>
        <AddTutorial refetch={refetch} />
      </div>

      <Card
        className="mb-6 shadow-sm border border-gray-100 rounded-xl"
        bodyStyle={{ padding: "16px" }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <Search
            placeholder="Search by title..."
            allowClear
            size="large"
            onSearch={(value) =>
              setFilter({ ...filter, search: value, page: 1 })
            }
            className="md:w-80"
          />
          <Select
            size="large"
            allowClear
            placeholder={
              <span>
                <FilterOutlined className="mr-2" /> Filter by Level
              </span>
            }
            className="md:w-64"
            onChange={(value) =>
              setFilter({ ...filter, type: value || "", page: 1 })
            }
          >
            <Option value="BEGINNER">Beginner</Option>
            <Option value="INTERMEDIATE">Intermediate</Option>
            <Option value="ADVANCED">Advanced</Option>
          </Select>
        </div>
      </Card>

      <Card
        className="shadow-sm border border-gray-100 rounded-xl overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        <ContentStateHandler
          isLoading={isLoading}
          isError={isError}
          error={error}
          data={allMakeupTutorials?.data || []}
          onRetry={refetch}
        >
          <Table
            columns={columns}
            dataSource={allMakeupTutorials?.data}
            rowKey="id"
            loading={isLoading}
            pagination={{
              current: filter.page,
              pageSize: filter.limit,
              total: allMakeupTutorials?.pagination?.total || 0,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50"],
              onChange: (p, l) => {
                setFilter((prev) => ({
                  ...prev,
                  page: p,
                  limit: l,
                }));
              },
            }}
          />
        </ContentStateHandler>
      </Card>
    </div>
  );
}

export default MakeupTutorial;
