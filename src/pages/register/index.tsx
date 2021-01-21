import React from 'react';
import { Card } from 'antd';
import './register.less';
import { Form, Input, Button, Select, message, notification } from 'antd';
import {
  Link
} from 'react-router-dom';
import Ajax from '@/http/ajax';
import Http from '@/http/http';
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const Login: React.FC = function Login(props: any) {
  const onFinish = (values: any) => {
    let {
      username,
      password,
      root
    } = values;
    const key = `sign${Date.now()}`;
    notification.warning({
      message: '温馨提示',
      description: '正在注册中...',
      key
    });
    Ajax.post(Http.userAction, {
      username,
      password,
      root
    }).then((d: any) => {
      notification.close(key);
      props.history.push('/login');
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="login_wrapper">
      <Card title="注册信息" style={{ width: 400 }}>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户"
            name="username"
            rules={[{ required: true, message: '请输入用户!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="权限"
            name="root"
            rules={[{ required: true, message: '请选择权限!' }]}
          >
            <Select>
              <Option value="0">学生</Option>
              <Option value="1">教师</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="link" size="small">
              <Link to="/login">登录</Link>
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login;