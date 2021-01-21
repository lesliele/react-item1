import React, {
  useEffect,
  useState
} from 'react';
import BackHeader from '@/component/back-header/index';
import {
  Card,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Switch,
  message,
  Upload,
  Image,
  Spin
} from 'antd';
import Ajax from '@/http/ajax';
import Http from '@/http/http';
import SHA1 from 'sha1';
import {
  IData
} from './index';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import {
  useParams
} from 'react-router-dom';
import { string } from 'prop-types';

const now = Date.now();
const appKey = SHA1("A6156256077136" + "UZ" + "5A1C45FC-7FE9-42F3-FF4C-8B4F62861A3D" + "UZ" + now) + "." + now;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
interface IProps {
  id: string,
  history: any,
  [key: string]: any
}
const PageForm: React.FC<IProps> = function PageForm(props: IProps) {
  const { id } = useParams<IProps>();
  const [type, setType] = useState('add');
  const [uploadObj, setUploadObj] = useState({});
  const [curUrl, setCurUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      setType('edit');
      loadData();
      return;
    }
    setType('add');
  }, [id])
  const loadData = () => {
    setLoading(true);
    Ajax.get(`${Http.studyList}/${id}`).then((d: any) => {
      let formatD = Object.assign({}, d, {
        startTime: moment(d.startTime, 'YYYY-MM-DD HH:mm:ss'),
        enable: +d.enable ? true : false
      });
      setCurUrl(formatD.img);
      form.setFieldsValue(formatD);
      setLoading(false);
    })
  }
  const handleConfirm = function handleConfirm() {
    form.validateFields().then(valid => {
      if (valid.errorFields) return;
      let formatData = Object.assign({}, valid, {
        enable: valid.enable ? '1' : '0',
        startTime: valid.startTime.format('YYYY-MM-DD HH:mm:ss'),
        img: curUrl
      });
      console.log(formatData)
      let url = type === 'add' ? Http.studyList : `${Http.studyList}/${id}`;
      setLoading(true);
      if (type === 'add') {
        return Ajax.post(url, formatData).then(d => {
          setLoading(false);
          message.success('创建成功!');
          props.history.goBack();
        });
      } else {
        return Ajax.put(url, formatData).then(d => {
          setLoading(false);
          message.success('编辑成功!');
          props.history.goBack();
        });
      }
    });
  }
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
    if (e.fileList[0].response) {
      setCurUrl(e.fileList[0].response.url);
    }
    return e && e.fileList;
  };
  return (<Spin spinning={loading}>
    <Card>
      <BackHeader {...props} leftTitle="语文" mainTitle="创建语文" onConfirm={handleConfirm} />
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
          <Input placeholder='请输入类型名称!' />
        </Form.Item>
        <Form.Item
          label="数量"
          name="num"
        >
          <InputNumber min={0} placeholder='请输入数量!' style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item
          label="开始时间"
          name="startTime"
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          label="启用"
          name="enable"
          valuePropName="checked"
        >
          <Switch checkedChildren="启用" unCheckedChildren="关闭" />
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
        <Form.Item
          label="封面"
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
            {curUrl ? <Image
              width={100}
              src={curUrl}
            /> : <UploadOutlined style={{ fontSize: '20px' }} />}
          </Upload>
        </Form.Item>
      </Form>
    </Card>
  </Spin>)
}

export default PageForm;