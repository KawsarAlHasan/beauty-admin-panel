import { useState } from "react";
import { Button, Modal, Form, Input, Select, Upload, message } from "antd";
import { FaPlus } from "react-icons/fa";
import { UploadOutlined } from "@ant-design/icons";
import { API } from "../../api/api";
import CatchError from "../../components/CatchError";
import { useGetAllbrands } from "../../api/brandApi";
import { useGetAllCategories } from "../../api/categoryApi";

const AddProduct = ({ refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const { allbrands } = useGetAllbrands();
  const { allCategories } = useGetAllCategories();

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
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("categoryId", values.categoryId);
      formData.append("brandId", values.brandId);
      
      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj);
      }

      if (values.shade) formData.append("shade", values.shade);
      if (values.underTone) formData.append("underTone", values.underTone);
      if (values.finish) formData.append("finish", values.finish);
      if (values.coverage) formData.append("coverage", values.coverage);
      
      if (values.skinTypes && values.skinTypes.length > 0) {
        formData.append("skinTypes", JSON.stringify(values.skinTypes));
      }

      await API.post("/product/create", formData);
      message.success("Product created successfully!");
      refetch?.();
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (err) {
      CatchError(err, "Failed to create product");
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
        Add New Product
      </Button>

      <Modal
        title="Create New Product"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="font-[500]">Name</span>}
              name="name"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input size="large" placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Brand</span>}
              name="brandId"
              rules={[{ required: true, message: "Please select a brand" }]}
            >
              <Select
                size="large"
                placeholder="Select a brand"
                options={allbrands?.data?.map((b) => ({
                  label: b.name,
                  value: b.id,
                }))}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Category</span>}
              name="categoryId"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select
                size="large"
                placeholder="Select a category"
                options={allCategories?.data?.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Price</span>}
              name="price"
              rules={[{ required: true, message: "Please enter price" }]}
            >
              <Input type="number" size="large" placeholder="Enter price" />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Shade</span>}
              name="shade"
            >
              <Input size="large" placeholder="Enter shade (optional)" />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Undertone</span>}
              name="underTone"
            >
              <Select
                size="large"
                placeholder="Select undertone"
                allowClear
                options={[
                  { label: "Warm", value: "WARM" },
                  { label: "Cool", value: "COOL" },
                  { label: "Neutral", value: "NEUTRAL" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Finish</span>}
              name="finish"
            >
              <Select
                size="large"
                placeholder="Select finish"
                allowClear
                options={[
                  { label: "Matte", value: "MATTE" },
                  { label: "Dewy", value: "DEWY" },
                  { label: "Satin", value: "SATIN" },
                  { label: "Natural", value: "NATURAL" },
                  { label: "Radiant", value: "RADIANT" },
                  { label: "Velvet", value: "VELVET" },
                  { label: "Metallic", value: "METALLIC" },
                  { label: "Shimmer", value: "SHIMMER" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Coverage</span>}
              name="coverage"
            >
              <Select
                size="large"
                placeholder="Select coverage"
                allowClear
                options={[
                  { label: "Sheer", value: "SHEER" },
                  { label: "Light", value: "LIGHT" },
                  { label: "Medium", value: "MEDIUM" },
                  { label: "Full", value: "FULL" },
                  { label: "Buildable", value: "BUILDABLE" },
                  { label: "None", value: "NONE" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Skin Types</span>}
              name="skinTypes"
            >
              <Select
                mode="multiple"
                size="large"
                placeholder="Select skin types"
                allowClear
                options={[
                  { label: "Oily", value: "OILY" },
                  { label: "Dry", value: "DRY" },
                  { label: "Combination", value: "COMBINATION" },
                  { label: "Normal", value: "NORMAL" },
                  { label: "Sensitive", value: "SENSITIVE" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Product Image</span>}
              required
            >
              <Upload
                beforeUpload={beforeUpload}
                onChange={handleFileChange}
                fileList={fileList}
                maxCount={1}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
            </Form.Item>
          </div>

          <Form.Item className="mt-4">
            <Button
              type="primary"
              size="large"
              className="my-main-button"
              htmlType="submit"
              loading={loading}
              block
            >
              Create Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProduct;
