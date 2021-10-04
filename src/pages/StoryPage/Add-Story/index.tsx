import React, { useEffect, useState } from 'react';
import './Add-Story.less';
import Meta from '@components/Meta';
import Layout from '@components/Layout';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Row, Col, Form, Input, Select, Button, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import UploadImages from '@components/UploadImages';
import { useHistory } from 'react-router-dom';
import { UploadsImages } from '@service/images';
import draftToHtml from 'draftjs-to-html';
import { createStory } from '@service/stories';
import { getTags } from '@service/tags';
import LoadingAdd from '@components/Loading/LoadingAdd';

const { Option } = Select;
function AddStory() {
  const { currentTheme } = useThemeSwitcher();
  const [form] = Form.useForm();
  const { push } = useHistory();
  const [tags, setTags] = useState([]);
  const [editorState, setEditor] = useState(EditorState.createEmpty());
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState({
    preview: '',
    raw: '',
  });

  useEffect(() => {
    getTags()
      .then((res) => {
        setTags(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err) {
          notification.error({
            message: 'Error while get tags!',
          });
          setIsLoading(false);
        }
      });
  }, []);

  const onEditorStateChange = (editorState: any) => {
    setEditor(editorState);
    let data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setContent(data);
  };
  const handleChangeImage = (e: any) => {
    if (e.target.files.length) {
      setThumbnail({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  const onFinish = async (e: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', thumbnail?.raw);
    await UploadsImages(formData)
      .then(async (res) => {
        if (res?.data?.id) {
          const payload = {
            title: e?.title,
            tags: e?.tags,
            featuredImages: res?.data?.id,
            content: content,
          };
          await createStory(payload)
            .then((res) => {
              if (res) {
                notification.success({ message: 'Success Create Story!' });
                push('/story');
              }
            })
            .catch((err) => {
              if (err) {
                setIsLoading(false);
                notification.error({
                  message: 'Error create Image!',
                  description: 'Please Check story form, fill the correct!!!',
                });
              }
            });
        }
      })
      .catch((err) => {
        if (err) {
          setIsLoading(false);
          notification.error({
            message: 'Error create Image!',
            description: 'Please Check story form, fill the correct!!!',
          });
        }
      });
  };
  return (
    <React.Fragment>
      <Meta title="Add Story">
        <Layout>
          <div className={`container-add ${currentTheme === 'dark' ? 'dark' : 'light'}`}>
            {isLoading ? (
              <LoadingAdd />
            ) : (
              <Row>
                <Col span={24}>
                  <Row align="middle">
                    <div
                      onClick={() => {
                        push('/story');
                      }}
                    >
                      <ArrowLeftOutlined style={{ cursor: 'pointer' }} />
                    </div>
                    <h1 className="title-add">
                      <b>Add Story</b>
                    </h1>
                  </Row>
                </Col>
                <Col style={{ marginTop: 24 }} span={24}>
                  <Form form={form} onFinish={onFinish} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="basic">
                    <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input title!' }]}>
                      <Input placeholder="Masukkan Title Story" />
                    </Form.Item>
                    <Form.Item label="Tags" name="tags" rules={[{ required: true, message: 'Please select tags!' }]}>
                      <Select mode="tags" placeholder="Pilih Tags">
                        {tags?.map((item: any, index: number) => (
                          <Option key={index} value={item?.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Content">
                      <div className="editors">
                        <Editor
                          editorState={editorState}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={onEditorStateChange}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item label="Thumbnail">
                      <UploadImages src={thumbnail.preview} handleChangeImage={handleChangeImage} />
                    </Form.Item>
                    <Row style={{ marginTop: 16 }}>
                      <Col span={8}>
                        <Button type="primary" htmlType="submit">
                          Publish Now
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            )}
          </div>
        </Layout>
      </Meta>
    </React.Fragment>
  );
}
export default AddStory;
