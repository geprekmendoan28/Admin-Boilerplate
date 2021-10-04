import React, { useEffect, useState } from 'react';
import Meta from '@components/Meta';
import Layout from '@components/Layout';
import StoryTable from '@components/StoryTable';
import { Row, Col, Input, Dropdown, Menu, notification, Modal } from 'antd';
import Pagination from '@components/Pagination';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useHistory, useLocation } from 'react-router-dom';
import { deleteStory, getStories } from '@service/stories';
import queryString from 'query-string';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Search } = Input;
const { confirm } = Modal;

export default function Story() {
  const { currentTheme } = useThemeSwitcher();
  const { push } = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const [stories, setStories] = useState([]);
  const [perPage, setPerPage] = useState(params?.perPage ? Number(params?.perPage) : 10);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(params?.page ? Number(params?.page) : 1);
  const [isLoading, setIsloading] = useState(true);
  const [search, setSearch] = useState(params?.search ? params.search.toString() : '');

  useEffect(() => {
    async function fetchAPI() {
      const res = await getStories(page, perPage, search);

      setStories(res.data);
      setTotalPage(res?.message?.totalPage);
      setPage(res?.message?.page);
      setIsloading(false);
    }
    fetchAPI();
  }, [perPage, page, search]);
  const handleDelete = async (id: string) => {
    setIsloading(true);
    await deleteStory(id)
      .then(async (result) => {
        if (result) {
          push('/story');
          notification.success({
            message: 'Success Delete story !',
          });
          const res = await getStories(page, perPage, search);
          setStories(res.data);
          setTotalPage(res?.message?.totalPage);
          setPage(res?.message?.page);
          setIsloading(false);
        }
      })
      .catch((err) => {
        if (err) {
          push('/story');
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
      pathname: '/story',
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

  return (
    <React.Fragment>
      <Meta title="Story List">
        <Layout>
          <div className={`container-story ${currentTheme === 'dark' ? 'dark' : 'light'}`}>
            <Row align="middle" className="titles">
              <Col span={12} style={{ padding: 24, paddingBottom: 0 }}>
                <h1 style={{ fontSize: 24 }}>
                  <b>Stories</b>
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
                      push('/story/add');
                    }}
                  >
                    Add Story
                  </button>
                </div>
              </Col>
              <Col span={12}>
                <Row justify="end">
                  <Search
                    placeholder="Search story..."
                    allowClear
                    className="search-box"
                    style={{ width: 350, height: 40 }}
                    onSearch={(value) => {
                      setIsloading(true);
                      setSearch(value);
                      setPage(1);
                      setPerPage(10);
                      push({
                        pathname: '/story',
                        search: `?search=${value}`,
                      });
                    }}
                  />
                </Row>
              </Col>
            </Row>
            <StoryTable
              handleDelete={(e) => {
                confirm({
                  title: 'Are you sure delete this Story?',
                  icon: <ExclamationCircleOutlined />,
                  // content: 'Some descriptions',
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
              data={stories}
            />
            <Row className="end-section" justify="end" style={{ padding: 24 }}>
              {stories?.length > 0 && (
                <Pagination
                  handlePage={(e) => {
                    setIsloading(true);
                    setPage(e);
                    push({
                      pathname: '/story',
                      search: `?page=${e}&perPage=${perPage}&search=${search}`,
                    });
                  }}
                  totalPage={totalPage}
                  page={page}
                />
              )}
            </Row>
          </div>
        </Layout>
      </Meta>
    </React.Fragment>
  );
}
