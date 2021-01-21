import React, { useEffect, useReducer, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Switch,
  message,
  Upload,
  Image
} from 'antd';
import Ajax from '@/http/ajax';
import Http from '@/http/http';
import SHA1 from 'sha1';
import {
  IData
} from './index';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';

interface IProps{
  visible: boolean,
  onShowModal: any,
  onHideModal: any,
  onReload: any,
  [key: string]: any
}
const ModalForm: React.FC<IProps> = function ModalForm(props: IProps) {
  const [title, setTitle] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [type, setType] = useState('add');
  const [uploadObj, setUploadObj] = useState({});
  const [form] = Form.useForm();

  const now = Date.now();
  const appKey = SHA1("A6156256077136" + "UZ" + "5A1C45FC-7FE9-42F3-FF4C-8B4F62861A3D" + "UZ" + now) + "." + now;
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };
  useEffect(() => {
    // form.resetFields();
    if (Object.keys(props.data).length) {
      setTitle('编辑类型');
      setType('edit');
      let formatD = Object.assign({}, props.data, {
        startTime: moment(props.data.startTime, 'YYYY-MM-DD HH:mm:ss'),
        enable: +props.data.enable ? true : false,
        img: [props.data.img]
      });
      form.setFieldsValue(formatD)
    } else {
      setTitle('添加类型');
      setType('add');
    }
  }, [props.data]);
  useEffect(() => {
    setIsShow(props.visible);
  }, [props.visible]);
  const beforeUpload = (file: any) => {
    let {
      name,
      type
    } = file;
    setUploadObj({
      filename: name,
      type
    });
    return true;
  }
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const handleOk = function handleOk() {
    form.validateFields().then(valid => {
      if (valid.errorFields) return;
      let formatData = Object.assign({}, valid, {
        enable: valid.enable ? '1' : '0',
        startTime: valid.startTime.format('YYYY-MM-DD HH:mm:ss'),
        img: valid.img[0].response.url
      })
      handleData(formatData);
    });
  }
  const handleCancel = function handleCancel() {
    props.onHideModal();
  }
  const handleHideModal = () => {
    props.onHideModal();
    props.onReload();
  }
  const handleData = function handleData(data: IData) {
    let url = type === 'add' ? Http.studyList : `${Http.studyList}/${props.data.id}`;
    if (type === 'add') {
      return Ajax.post(url, data).then(d => {
        message.success('创建成功!');
        handleHideModal();
      });
    } else {
      return Ajax.put(url, data).then(d => {
        message.success('编辑成功!');
        handleHideModal();
      });
    }
  }
  return (<>
    <Modal 
      title={title} 
      visible={isShow} 
      onOk={handleOk} 
      onCancel={handleCancel}>
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{ enable: false }}>
        <Form.Item
          label="类型名称"
          name="type"
          rules={[{ required: true, message: '请输入类型名称!' }]}
        >
          <Input placeholder='请输入类型名称!'/>
        </Form.Item>
        <Form.Item
          label="数量"
          name="num"
        >
          <InputNumber min={0} placeholder='请输入数量!' style={{width: '200px'}}/>
        </Form.Item>
        <Form.Item
          label="开始时间"
          name="startTime"
        >
          <DatePicker showTime/>
        </Form.Item>
        <Form.Item
          label="启用"
          name="enable"
          valuePropName="checked"
        >
          <Switch checkedChildren="启用" unCheckedChildren="关闭"/>
        </Form.Item>
        <Form.Item
          label="教师"
          name="teacher"
        >
          <Input placeholder='请输入教师名称!' />
        </Form.Item>
        <Form.Item
          label="教室"
          name="class"
        >
          <Input placeholder='请输入教室名称!' />
        </Form.Item>
        {
          form.getFieldValue('img') ? 
          <Form.Item label="封面" >
            <Image
              width={100}
              src={form.getFieldValue('img')}
            />
          </Form.Item> : 
          <Form.Item
            label="封面"
            name="img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="file"
              listType="picture-card"
              action='http://d.apicloud.com/mcm/api/file'
              beforeUpload={beforeUpload}
              data={uploadObj}
              headers={{
                'X-APICloud-AppId': "A6156256077136",
                'X-APICloud-AppKey': appKey
              }}>
              <UploadOutlined style={{ fontSize: '20px' }} />
            </Upload>
          </Form.Item>
        }
      </Form>
    </Modal>
  </>)
}

export default ModalForm;