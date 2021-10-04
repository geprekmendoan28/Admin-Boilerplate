import React, { useEffect, useState } from 'react';
import './EditStory.less';
import Meta from '@components/Meta';
import Layout from '@components/Layout';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Row, Col, Form, Input, Select, Button, Spin, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import UploadImages from '@components/UploadImages';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { UploadsImages } from '@service/images';
import draftToHtml from 'draftjs-to-html';
import { getStoryById, updateStory } from '@service/stories';
import { getTags } from '@service/tags';
import htmlToDraft from 'html-to-draftjs';

const { Option } = Select;
interface RouteParams {
  id: string;
}
interface EditStoryProps extends RouteComponentProps<RouteParams> {}

function EditStory(props: EditStoryProps) {
  const { currentTheme } = useThemeSwitcher();
  const [form] = Form.useForm();
  const { push } = useHistory();
  const id = props.match.params.id;
  const [tags, setTags] = useState([]);
  const [currentData, setCurrentData] = useState<any>({});
  const [editorState, setEditor] = useState(EditorState.createEmpty());
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState({
    preview: '',
    raw: '',
  });

  useEffect(() => {
    async function fetchAPI() {
      const tagged = await getTags();
      const myStory = await getStoryById(id);
      if (myStory) {
        setTags(tagged?.data);
        setCurrentData(myStory?.data);
        setIsLoading(false);

        const blocksFromHtml = htmlToDraft(myStory?.data?.content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        setEditor(EditorState.createWithContent(contentState));
      }
    }
    fetchAPI();
  }, [id]);

  const taggedMap = currentData?.tags?.map((itemed: any) => itemed.id);

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
    if (thumbnail?.raw) {
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
            await updateStory(payload, id)
              .then((res) => {
                if (res) {
                  notification.success({ message: 'Success Update Story!' });
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
    } else {
      const payload = {
        title: e?.title,
        tags: e?.tags,
        content: content,
      };
      await updateStory(payload, id)
        .then((res) => {
          if (res) {
            notification.success({ message: 'Success Update Story!' });
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
  };
  return (
    <React.Fragment>
      <Meta title="Edit Story">
        <Layout>
          <div className={`container-add ${currentTheme === 'dark' ? 'dark' : 'light'}`}>
            {isLoading ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 500,
                  width: '100%',
                }}
              >
                <Spin />
              </div>
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
                    <h1 style={{ fontSize: 24, marginLeft: 16 }}>
                      <b>Edit Story</b>
                    </h1>
                  </Row>
                </Col>
                <Col style={{ marginTop: 24 }} span={24}>
                  <Form
                    initialValues={{
                      title: currentData?.title,
                      tags: taggedMap,
                    }}
                    form={form}
                    onFinish={onFinish}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="basic"
                  >
                    <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input title!' }]}>
                      <Input placeholder="Masukkan Title Story" />
                    </Form.Item>
                    <Form.Item label="Tags" name="tags" rules={[{ required: true, message: 'Please select tags!' }]}>
                      <Select mode="tags" placeholder="Pilih Tags">
                        {tags.map((item: any, index: number) => (
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
                      <UploadImages
                        src={thumbnail.preview !== '' ? thumbnail.preview : currentData?.featuredImages?.url}
                        handleChangeImage={handleChangeImage}
                      />
                    </Form.Item>
                    <Row style={{ marginTop: 16 }}>
                      <Col span={8}>
                        <Button type="primary" htmlType="submit">
                          Update Now
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
export default EditStory;
