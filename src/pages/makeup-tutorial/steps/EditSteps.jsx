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
import { API } from "../../../api/api";
import CatchError from "../../../components/CatchError";
import { useProducts } from "../../../api/productsApi";

const { TextArea } = Input;
const { Option } = Select;

const EditSteps = ({ record, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const { allProducts, isLoading } = useProducts({
    page: 1,
    limit: 500,
    status: "ACTIVE",
  });

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
      if (values.sequence) formData.append("sequence", values.sequence);
      
      if (values.products) {
        formData.append("products", JSON.stringify(values.products));
      }

      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj);
      }

      await API.patch("/makeup-tutorial/update-step", formData);
      message.success("Tutorial step updated successfully!");
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
            sequence: record?.sequence,
            products: record?.products?.map((p) => p.product?.id || p.id) || [],
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
              label={<span className="font-[500]">Sequence</span>}
              name="sequence"
              rules={[{ required: true, message: "Please enter sequence" }]}
            >
              <Input type="number" size="large" placeholder="Enter sequence" />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Products</span>}
              name="products"
              rules={[{ required: true, message: "Please select products" }]}
            >
              <Select 
                mode="multiple" 
                size="large" 
                placeholder="Select products"
                loading={isLoading}
              >
                {/* Show existing products to ensure names are visible initially */}
                {record?.products?.map((p) => {
                  const prod = p.product || p;
                  if (!prod?.id) return null;
                  return (
                    <Option key={`existing-${prod.id}`} value={prod.id}>
                      {prod.name || "Unknown Product"}
                    </Option>
                  );
                })}
                {/* Show fetched products, preventing duplicates */}
                {allProducts?.data?.map((product) => {
                  const exists = record?.products?.some((p) => (p.product?.id || p.id) === product.id);
                  if (exists) return null;
                  return (
                    <Option key={`fetched-${product.id}`} value={product.id}>
                      {product.name}
                    </Option>
                  );
                })}
              </Select>
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

export default EditSteps;
