import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, message } from "antd";
import { API } from "../../api/api";
import CatchError from "../../components/CatchError";

const BrandEdit = ({ record, refetch }) => {
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
        id: record.id,
        name: values.name,
      };

      await API.patch("/brand/update", submitData);
      message.success("Brand updated successfully!");
      refetch?.();

      setIsModalOpen(false);
    } catch (err) {
      CatchError(err, "Failed to update brand");
    } finally {
      setLoading(false);
    }
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
            id: record?.id,
            name: record?.name,
          }}
        >
          <Form.Item
            label={<span className="font-[500]">Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter brand name" }]}
          >
            <Input size="large" placeholder="Enter brand name" />
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

export default BrandEdit;
