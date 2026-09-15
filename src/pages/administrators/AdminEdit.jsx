import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, message, Select } from "antd";
import { API } from "../../api/api";
import CatchError from "../../components/CatchError";

const AdminEdit = ({ adminProfile, refetch }) => {
  const isSuperAdmin = adminProfile?.roleName === "Super Admin";
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

      const submitData = {
        id: adminProfile.id,
        name: values.name,
        phone: values.phone,
      };

      await API.patch("/admin/update", submitData);
      message.success("Admin updated successfully!");
      refetch?.();

      setIsModalOpen(false);
    } catch (err) {
      CatchError(err, "Failed to update admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        title={isSuperAdmin ? "Super Admin cannot be edited" : "Edit Admin"}
        type={isSuperAdmin ? "" : "primary"}
        icon={<EditOutlined />}
        className={
          isSuperAdmin ? "cursor-not-allowed bg-white" : "my-main-button"
        }
        onClick={isSuperAdmin ? undefined : showModal}
      />

      <Modal
        title="Update Profile"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            id: adminProfile?.id,
            name: adminProfile?.name,
            email: adminProfile?.email,
            phone: adminProfile?.phone,
            roleName: adminProfile?.roleName,
          }}
        >
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
          >
            <Input size="large" disabled />
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
              <Option value="Moderator">Moderator</Option>
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminEdit;
