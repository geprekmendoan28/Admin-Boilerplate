import React, { useEffect, useState } from 'react';
import Meta from '@components/Meta';
import Layout from '@components/Layout';
import Table from '@components/StoryTable';
import { Row, Col, Input, Dropdown, Menu, notification, Modal, Form } from 'antd';
import Pagination from '@components/Pagination';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createTags, deleteTags, getTags, getTagsById, updateTags } from '@service/tags';
const { Search } = Input;
const { confirm } = Modal;

export default function Tags() {
  const { currentTheme } = useThemeSwitcher();
  const { push } = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const [tags, setTags] = useState([]);
  const [perPage, setPerPage] = useState(params?.perPage ? Number(params?.perPage) : 10);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(params?.page ? Number(params?.page) : 1);
  const [isLoading, setIsloading] = useState(true);
  const [search, setSearch] = useState(params?.search ? params.search.toString() : '');
  const [visibleModal, setVisibleModal] = useState(false);
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState('');
  useEffect(() => {
    async function fetchAPI() {
      const res = await getTags(page, perPage, search);
      setTags(res.data);
      setTotalPage(res?.message?.totalPage);
      setPage(res?.message?.page);
      setIsloading(false);
    }
    fetchAPI();
  }, [page, perPage, search]);

  const handleDelete = async (id: string) => {
    setIsloading(true);
    await deleteTags(id)
      .then(async (result) => {
        if (result) {
          push('/tags');
          notification.success({
            message: 'Success Delete story !',
          });
          const res = await getTags(page, perPage, search);
          setTags(res.data);
          setTotalPage(res?.message?.totalPage);
          setPage(res?.message?.page);
          setIsloading(false);
        }
      })
      .catch((err) => {
        if (err) {
          push('/tags');
          setIsloading(false);
          notification.error({
            message: 'Error while Delete story !',
          });
        }
      });
  };
  const handleEntries = ({ key }: { key: string }) => {
    setIsloading(true);
    setPerPage(Number(key));
    push({
      pathname: '/tags',
      search: `?page=${page}&perPage=${key}&search=${search}`,
    });
  };
  const MenuEntries = (
    <div style={{ boxShadow: '0 4px 24px 0 rgba(34, 41, 47, 0.01)' }}>
      <Menu onClick={handleEntries}>
        <Menu.Item key={5}>5</Menu.Item>
        <Menu.Item key={10}>10</Menu.Item>
        <Menu.Item key={20}>20</Menu.Item>
        <Menu.Item key={50}>50</Menu.Item>
      </Menu>
    </div>
  );

  const ModalTags = ({
    isVisible,
    closeModal,
    onOke,
    confirmLoading,
  }: {
    isVisible: boolean;
    closeModal: () => void;
    onOke: () => void;
    confirmLoading?: boolean;
  }) => (
    <Modal
      title="Create Tags"
      visible={isVisible}
      onOk={onOke}
      onCancel={closeModal}
      okText="Save Tags"
      cancelText="Cancel"
      confirmLoading={confirmLoading}
    >
      <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="basic">
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
          <Input placeholder="Masukkan name tags" />
        </Form.Item>
      </Form>
    </Modal>
  );
  return (
    <React.Fragment>
      <Meta title="Tags List">
        <Layout>
          <div className={`container-story ${currentTheme === 'dark' ? 'dark' : 'light'}`}>
            <Row align="middle" className="titles">
              <Col span={12} style={{ padding: 24, paddingBottom: 0 }}>
                <h1 style={{ fontSize: 24 }}>
                  <b>Tags</b>
                </h1>
              </Col>
            </Row>
            <Row className="head-section">
              <Col span={12}>
                <div className="right-section">
                  <div>
                    <p>Entries</p>
                    <Dropdown overlay={MenuEntries}>
                      <Input value={perPage} />
                    </Dropdown>
                  </div>
                  <button
                    onClick={() => {
                      setVisibleModal(true);
                    }}
                  >
                    Add Tags
                  </button>
                </div>
              </Col>
              <Col span={12}>
                <Row justify="end">
                  <Search
                    placeholder="Search tags..."
                    allowClear
                    className="search-box"
                    style={{ width: 350, height: 40 }}
                    onSearch={(value) => {
                      setIsloading(true);
                      setSearch(value);
                      setPage(1);
                      setPerPage(10);
                      push({
                        pathname: '/tags',
                        search: `?search=${value}`,
                      });
                    }}
                  />
                </Row>
              </Col>
            </Row>
            <Table
              handleDelete={(e) => {
                confirm({
                  title: 'Are you sure delete this Tags?',
                  icon: <ExclamationCircleOutlined />,
                  okText: 'Yes',
                  okType: 'danger',
                  cancelText: 'No',
                  onOk() {
                    handleDelete(e);
                  },
                  onCancel() {},
                });
              }}
              loading={isLoading}
              data={tags}
              isTags
              handleEditTags={async (id: string) => {
                await getTagsById(id)
                  .then((res) => {
                    if (res) {
                      setIsEditMode(id);
                      form.setFieldsValue({ name: res?.data?.name });
                      setVisibleModal(true);
                    }
                  })
                  .catch((err) => {
                    if (err) {
                      notification.error({ message: 'Error while catch Tags!' });
                    }
                  });
              }}
            />
            <Row className="end-section" justify="end" style={{ padding: 24 }}>
              {tags?.length > 0 && (
                <Pagination
                  handlePage={(e) => {
                    setIsloading(true);
                    setPage(e);
                    push({
                      pathname: '/tags',
                      search: `?page=${e}&perPage=${perPage}&search=${search}`,
                    });
                  }}
                  totalPage={totalPage}
                  page={page}
                />
              )}
            </Row>
          </div>
          <ModalTags
            isVisible={visibleModal}
            confirmLoading={isLoading}
            onOke={() => {
              setIsloading(true);
              form.validateFields().then(async (values) => {
                if (isEditMode === '') {
                  await createTags(values)
                    .then(async (res) => {
                      if (res) {
                        notification.success({ message: 'Success Create Tags' });
                        const res = await getTags(page, perPage, search);
                        setTags(res.data);
                        setIsloading(false);
                        setVisibleModal(!visibleModal);
                        setIsEditMode('');

                        form.resetFields();
                      }
                    })
                    .catch(async (err) => {
                      if (err) {
                        notification.error({ message: 'Error while Create Tags' });
                        const res = await getTags(page, perPage, search);
                        setTags(res.data);
                        setIsloading(false);
                        setIsEditMode('');
                        form.resetFields();
                      }
                    });
                } else {
                  await updateTags(isEditMode, values)
                    .then(async (res) => {
                      if (res) {
                        notification.success({ message: 'Success Update Tags' });
                        const res = await getTags(page, perPage, search);
                        setTags(res.data);
                        setIsloading(false);
                        setVisibleModal(!visibleModal);
                        setIsEditMode('');

                        form.resetFields();
                      }
                    })
                    .catch(async (err) => {
                      if (err) {
                        notification.error({ message: 'Error while Create Tags' });
                        const res = await getTags(page, perPage, search);
                        setTags(res.data);
                        setIsloading(false);
                        setIsEditMode('');

                        form.resetFields();
                      }
                    });
                }
              });
            }}
            closeModal={() => {
              form.resetFields();
              setVisibleModal(false);
            }}
          />
        </Layout>
      </Meta>
    </React.Fragment>
  );
}
