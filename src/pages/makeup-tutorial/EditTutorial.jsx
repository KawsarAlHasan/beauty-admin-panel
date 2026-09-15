import { useState } from "react";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Upload,
  Image,
} from "antd";
import { API } from "../../api/api";
import CatchError from "../../components/CatchError";

const { TextArea } = Input;
const { Option } = Select;

const EditTutorial = ({ record, refetch }) => {
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
      formData.append("id", record.id);

      if (values.title) formData.append("title", values.title);
      if (values.description)
        formData.append("description", values.description);
      if (values.type) formData.append("type", values.type);

      if (values.duration) {
        formData.append("duration", values.duration);
      }

      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj);
      }

      await API.patch("/makeup-tutorial/update", formData);
      message.success("Tutorial updated successfully!");
      refetch?.();
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (err) {
      CatchError(err, "Failed to update tutorial");
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
        type={"primary"}
        icon={<EditOutlined />}
        className={"my-main-button"}
        onClick={showModal}
      />

      <Modal
        title="Update Tutorial"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            title: record?.title,
            type: record?.type,
            duration: record?.duration,
            description: record?.description,
          }}
        >
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
              label={
                <span className="font-[500]">Update Image (Optional)</span>
              }
            >
              {record?.image && (
                <div className="mb-3">
                  <p className="text-gray-500 text-sm mb-1">Current Image:</p>
                  <Image
                    src={record.image}
                    alt="Current Tutorial"
                    width={80}
                    height={80}
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #d9d9d9",
                    }}
                  />
                </div>
              )}
              <Upload
                beforeUpload={beforeUpload}
                onChange={handleFileChange}
                fileList={fileList}
                maxCount={1}
                listType="picture"
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Select New Image</Button>
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
              Update Tutorial
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditTutorial;
