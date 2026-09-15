import { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { FaPlus } from "react-icons/fa";
import { API } from "../../api/api";
import CatchError from "../../components/CatchError";

const AddCategory = ({ refetch }) => {
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
      await API.post("/category/create", values);
      message.success("Category created successfully!");
      refetch?.();
      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      CatchError(err, "Failed to create category");
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
        Add New Category
      </Button>

      <Modal
        title="Create New Category"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <Form.Item
            label={<span className="font-[500]">Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input size="large" placeholder="Enter category name" />
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
              Create Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategory;
