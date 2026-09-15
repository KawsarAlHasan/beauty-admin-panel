import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  Card,
  Tag,
  Image,
  Space,
  Button,
  Typography,
  Spin,
  Divider,
} from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useSingleMakeupTutorial } from "../../../api/tutorialsApi";
import StatusBadge from "../../../components/StatusBadge";
import DeleteModal from "../../../components/DeleteModal";
// Import when ready
import AddSteps from "./AddSteps";
import EditSteps from "./EditSteps";

const { Title, Text, Paragraph } = Typography;

function Steps() {
  const { tutorialId } = useParams();

  const { singleTutorial, isLoading, isError, error, refetch } =
    useSingleMakeupTutorial(tutorialId);

  const tutorial = singleTutorial?.data;
  const steps = tutorial?.steps || [];

  const columns = [
    {
      title: "Sequence",
      dataIndex: "sequence",
      key: "sequence",
      align: "center",
      render: (seq) => (
        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold mx-auto border border-blue-100">
          {seq}
        </div>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (img) =>
        img ? (
          <Image
            src={img}
            alt="step"
            width={60}
            height={60}
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
        ) : (
          <div className="w-[60px] h-[60px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        ),
    },
    {
      title: "Step Details",
      key: "details",
      render: (_, record) => (
        <div style={{ maxWidth: "300px" }}>
          <div className="font-bold text-gray-800 text-base mb-1">
            {record.title}
          </div>
          <div className="text-gray-500 text-sm">{record.description}</div>
        </div>
      ),
    },
    {
      title: "Products Used",
      dataIndex: "products",
      key: "products",
      render: (products) => (
        <div className="flex flex-wrap gap-2 max-w-[250px]">
          {products && products.length > 0 ? (
            products.map((p) => (
              <Tag key={p.id} color="purple" className="m-0">
                {p.product?.name || "Unknown"}
              </Tag>
            ))
          ) : (
            <Text type="secondary" className="text-xs">
              No products
            </Text>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (v, record) => (
        <StatusBadge
          api_endpoint={"/makeup-tutorial/step-status"} // Update API endpoint if different
          id={record.id}
          status={v}
          refetch={refetch}
          statusOptions={["ACTIVE", "INACTIVE"]}
          isEditable={true}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <EditSteps record={record} refetch={refetch} />
          <DeleteModal
            api_endpoint={`/makeup-tutorial/step/${record.id}`} // Update API endpoint if different
            type={"Step"}
            title={record?.title}
            refetch={refetch}
          />
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !tutorial) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load tutorial data. {error?.message}
      </div>
    );
  }

  return (
    <div className="">
      {/* Header Section */}
      <div className="mb-6">
        <Link to="/makeup-tutorial">
          <Button
            icon={<ArrowLeftOutlined />}
            type="text"
            className="mb-4 text-gray-500 hover:text-gray-800"
          >
            Back to Tutorials
          </Button>
        </Link>
        <Card
          className="shadow-sm border-gray-100 rounded-xl overflow-hidden"
          bodyStyle={{ padding: 0 }}
        >
          <div className="flex flex-col md:flex-row">
            {tutorial.image && (
              <div className="w-full md:w-1/3 lg:w-1/4">
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="w-full h-full object-cover min-h-[200px]"
                />
              </div>
            )}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <Tag
                  color="magenta"
                  className="px-3 py-1 rounded-full text-xs font-bold tracking-wider"
                >
                  {tutorial.type}
                </Tag>
                <Tag
                  color={tutorial.status === "ACTIVE" ? "green" : "red"}
                  className="rounded-full"
                >
                  {tutorial.status}
                </Tag>
              </div>
              <Title level={2} className="!mt-2 !mb-2 !text-3xl text-gray-800">
                {tutorial.title}
              </Title>
              <Paragraph className="text-gray-500 text-base mt-2 mb-0">
                {tutorial.description}
              </Paragraph>
              {tutorial.duration && (
                <Text className="text-gray-400 mt-4 block">
                  <span className="font-semibold text-gray-600">Duration:</span>{" "}
                  {tutorial.duration}
                </Text>
              )}
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      {/* Steps Table Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <Title level={4} className="!m-0 text-gray-800">
            Tutorial Steps
          </Title>
          <Text className="text-gray-500">
            Manage the sequence and details of each step
          </Text>
        </div>
        <AddSteps tutorialId={tutorialId} refetch={refetch} />
      </div>

      <Card
        className="shadow-sm border-gray-100 rounded-xl overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        <Table
          columns={columns}
          dataSource={steps}
          rowKey="id"
          pagination={false}
          rowClassName="hover:bg-gray-50 transition-colors"
        />
      </Card>
    </div>
  );
}

export default Steps;
