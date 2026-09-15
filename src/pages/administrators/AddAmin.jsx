import { useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { FaPlus } from "react-icons/fa";
import { API } from "../../api/api";
import CatchError from "../../components/CatchError";

const { Option } = Select;

const AddAdmin = ({ refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      await API.post("/admin/create", values);
      message.success("Admin created successfully!");
      refetch?.();
      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      CatchError(err, "Failed to create admin");
    } finally {
      setLoading(false);
    }
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
        Add New Admin
      </Button>

      <Modal
        title="Create New Admin"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <Form.Item
            label={<span className="font-[500]">Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter admin name" }]}
          >
            <Input size="large" placeholder="Enter admin name" />
          </Form.Item>

          <Form.Item
            label={<span className="font-[500]">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Please enter admin email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input size="large" placeholder="Enter admin email" />
          </Form.Item>

          <Form.Item
            label={<span className="font-[500]">Password</span>}
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
            ]}
          >
            <Input.Password size="large" placeholder="Enter admin password" />
          </Form.Item>

          <Form.Item
            label={<span className="font-[500]">Phone</span>}
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input size="large" placeholder="+880..." />
          </Form.Item>

          <Form.Item
            label={<span className="font-[500]">Role</span>}
            name="roleName"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select size="large" placeholder="Select role">
              <Option value="Super Admin">Super Admin</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              size="large"
              className="my-main-button"
              htmlType="submit"
              loading={loading}
              block
            >
              Create Admin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAdmin;
