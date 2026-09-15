import React, { useState } from "react";
import { Space, Table, Image } from "antd";
import ContentStateHandler from "../../components/ContentStateHandler";
import DeleteModal from "../../components/DeleteModal";
import StatusBadge from "../../components/StatusBadge";
import { useProducts } from "../../api/productsApi";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

function Product() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 20,
    name: "",
    brand: "",
    category: "",
    status: "all",
    skinTypes: [],
    coverage: "",
    finish: "",
    shade: "",
    underTone: "",
  });

  const { allProducts, isLoading, isError, error, refetch } =
    useProducts(filter);

  const columns = [
    {
      title: <span>Image</span>,
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) => (
        <Image
          src={image}
          alt="product"
          width={50}
          height={50}
          style={{ objectFit: "cover", borderRadius: "4px" }}
        />
      ),
    },
    {
      title: <span>Name</span>,
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: <span>Brand</span>,
      dataIndex: "brand",
      key: "brand",
      align: "center",
      render: (brand) => brand?.name || "-",
    },
    {
      title: <span>Category</span>,
      dataIndex: "category",
      key: "category",
      align: "center",
      render: (category) => category?.name || "-",
    },
    {
      title: <span>Price</span>,
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => `$${price}`,
    },
    {
      title: <span>Details</span>,
      key: "details",
      align: "center",
      render: (_, record) => (
        <div style={{ fontSize: "12px", textAlign: "left" }}>
          <div>
            <strong>Shade:</strong> {record.shade || "-"}
          </div>
          <div>
            <strong>Undertone:</strong> {record.underTone || "-"}
          </div>
          <div>
            <strong>Finish:</strong> {record.finish || "-"}
          </div>
          <div>
            <strong>Coverage:</strong> {record.coverage || "-"}
          </div>
        </div>
      ),
    },
    {
      title: <span className="mainColor">Status</span>,
      dataIndex: "status",
      key: "status",
      render: (v, record) => (
        <StatusBadge
          api_endpoint={"/product/update-status"}
          id={record.id}
          status={v}
          refetch={refetch}
          statusOptions={["ACTIVE", "INACTIVE"]}
          isEditable={true}
        />
      ),
      align: "center",
    },
    {
      title: <span>Action</span>,
      key: "action",
      align: "center",
      render: (_, record) => {
        return (
          <Space size="middle">
            <EditProduct record={record} refetch={refetch} />
            <DeleteModal
              api_endpoint={`/product/${record.id}`}
              type={"Product"}
              title={record?.name}
              refetch={refetch}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <div className="">
      <AddProduct refetch={refetch} />

      <ContentStateHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={allProducts?.data || []}
        onRetry={refetch}
      >
        <Table
          columns={columns}
          dataSource={allProducts?.data}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: filter.page,
            pageSize: filter.limit,
            total: allProducts?.pagination?.total || 0,
            onChange: (p, l) => {
              setFilter((prev) => ({
                ...prev,
                page: p,
                limit: l,
              }));
            },
          }}
        />
      </ContentStateHandler>
    </div>
  );
}

export default Product;
