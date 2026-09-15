import { useState } from "react";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, Select, message, Upload, Image } from "antd";
import { API } from "../../api/api";
import CatchError from "../../components/CatchError";
import { useGetAllCategories } from "../../api/categoryApi";
import { useGetAllbrands } from "../../api/brandApi";

const EditProduct = ({ record, refetch }) => {
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
      formData.append("id", record.id);

      if (values.name) formData.append("name", values.name);
      if (values.price) formData.append("price", values.price.toString());
      if (values.categoryId) formData.append("categoryId", values.categoryId);
      if (values.brandId) formData.append("brandId", values.brandId);
      
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

      await API.patch("/product/update", formData);
      message.success("Product updated successfully!");
      refetch?.();
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (err) {
      CatchError(err, "Failed to update product");
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
        title="Update Product"
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
            name: record?.name,
            brandId: record?.brandId || record?.brand?.id,
            categoryId: record?.categoryId || record?.category?.id,
            price: record?.price,
            shade: record?.shade,
            underTone: record?.underTone,
            finish: record?.finish,
            coverage: record?.coverage,
            skinTypes:
              typeof record?.skinTypes === "string"
                ? JSON.parse(record?.skinTypes)
                : record?.skinTypes,
          }}
        >
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
            >
              <Select
                size="large"
                placeholder="Select a brand"
                allowClear
                options={allbrands?.data?.map((b) => ({
                  label: b.name,
                  value: b.id,
                }))}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Category</span>}
              name="categoryId"
            >
              <Select
                size="large"
                placeholder="Select a category"
                allowClear
                options={allCategories?.data?.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Price</span>}
              name="price"
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
                  { label: "WARM", value: "WARM" },
                  { label: "COOL", value: "COOL" },
                  { label: "NEUTRAL", value: "NEUTRAL" },
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
                  { label: "MATTE", value: "MATTE" },
                  { label: "DEWY", value: "DEWY" },
                  { label: "SATIN", value: "SATIN" },
                  { label: "NATURAL", value: "NATURAL" },
                  { label: "RADIANT", value: "RADIANT" },
                  { label: "VELVET", value: "VELVET" },
                  { label: "METALLIC", value: "METALLIC" },
                  { label: "SHIMMER", value: "SHIMMER" },
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
                  { label: "SHEER", value: "SHEER" },
                  { label: "LIGHT", value: "LIGHT" },
                  { label: "MEDIUM", value: "MEDIUM" },
                  { label: "FULL", value: "FULL" },
                  { label: "BUILDABLE", value: "BUILDABLE" },
                  { label: "NONE", value: "NONE" },
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
                  { label: "OILY", value: "OILY" },
                  { label: "DRY", value: "DRY" },
                  { label: "COMBINATION", value: "COMBINATION" },
                  { label: "NORMAL", value: "NORMAL" },
                  { label: "SENSITIVE", value: "SENSITIVE" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-[500]">Update Image (Optional)</span>}
            >
              {record?.image && (
                <div className="mb-3">
                  <p className="text-gray-500 text-sm mb-1">Current Image:</p>
                  <Image
                    src={record.image}
                    alt="Current Product"
                    width={80}
                    height={80}
                    style={{ objectFit: "cover", borderRadius: "8px", border: "1px solid #d9d9d9" }}
                  />
                </div>
              )}
              <Upload
                beforeUpload={beforeUpload}
                onChange={handleFileChange}
                fileList={fileList}
                maxCount={1}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Select New Image</Button>
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProduct;
