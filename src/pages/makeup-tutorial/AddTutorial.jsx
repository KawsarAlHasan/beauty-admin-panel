import { useState } from "react";
import { Button, Modal, Form, Input, Select, Upload, message } from "antd";
import { FaPlus } from "react-icons/fa";
import { UploadOutlined } from "@ant-design/icons";
import { API } from "../../api/api";
import CatchError from "../../components/CatchError";

const { TextArea } = Input;
const { Option } = Select;

const AddTutorial = ({ refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const showModal = () => {
    form.resetFields();
    setFileList([]);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const handleFinish = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("type", values.type);

      if (values.duration) {
        formData.append("duration", values.duration);
      }

      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj);
      } else {
        message.error("Please upload an image");
        setLoading(false);
        return;
      }

      await API.post("/makeup-tutorial/create", formData);
      message.success("Tutorial created successfully!");
      refetch?.();
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (err) {
      CatchError(err, "Failed to create tutorial");
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file) => {
    setFileList([file]);
    return false; // Prevent auto upload
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <>
      <Button
        size="large"
        type="primary"
        className="mb-2 my-main-button"
        onClick={showModal}
      >
        <FaPlus />
        Add New Tutorial
      </Button>

      <Modal
        title="Create New Tutorial"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-[500]">Title</span>}
              name="title"
              rules={[
                { required: true, message: "Please enter tutorial title" },
              ]}
            >
              <Input size="large" placeholder="Enter tutorial title" />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Type (Level)</span>}
              name="type"
              rules={[{ required: true, message: "Please select a type" }]}
            >
              <Select size="large" placeholder="Select type">
                <Option value="BEGINNER">Beginner</Option>
                <Option value="INTERMEDIATE">Intermediate</Option>
                <Option value="ADVANCED">Advanced</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Duration</span>}
              name="duration"
            >
              <Input size="large" placeholder="e.g. 30 Minutes" />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Image</span>}
              required
            >
              <Upload
                beforeUpload={beforeUpload}
                onChange={handleFileChange}
                fileList={fileList}
                maxCount={1}
                listType="picture"
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="font-[500]">Description</span>}
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea rows={4} placeholder="Enter tutorial description" />
          </Form.Item>

          <Form.Item className="mt-4">
            <Button
              type="primary"
              size="large"
              className="my-main-button"
              htmlType="submit"
              loading={loading}
              block
            >
              Create Tutorial
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTutorial;
