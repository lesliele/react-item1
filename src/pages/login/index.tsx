import React from 'react';
import './login.less';
import { Form, Input, Button, Select, Card, message, notification } from 'antd';
import Ajax from '@/http/ajax';
import Http from '@/http/http';
import {
  Link
} from 'react-router-dom';
import {
  connect
} from 'react-redux';
import action from '@/store/actions/index';

const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const Login: React.FC = function Login (props: any) {
  const onFinish = (values: any) => {
    let {
      username,
      password
    } = values;
    const key = `sign${Date.now()}`;
    notification.warning({
      message: '温馨提示',
      description: '正在登录中...',
      key
    });
    Ajax.post(Http.userLogin, {
      username,
      password
    }).then((d: any) => {
      if (d) {
        Ajax.get(`${Http.userAction}/${d.userId}`, {
          headers: {
            'authorization': d.id
          }
        }).then((res: any) => {
          let {
            username,
            address,
            mobile
          } = res;
          notification.close(key);
          props.saveUser({
            userId: d.userId,
            id: d.id,
            username,
            address,
            mobile
          });
          props.history.push('/home');
        })
      }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="login_wrapper">
      <Card title="登录信息" style={{ width: 400 }}>
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

          {/* <Form.Item
            label="权限"
            name="root"
            rules={[{ required: true, message: '请选择权限!' }]}
          >
            <Select>
              <Option value="0">学生</Option>
              <Option value="1">教师</Option>
            </Select>
          </Form.Item> */}

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="link" size="small">
              <Link to="/register">注册</Link>
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default connect(null, action.user)(Login);
// 登录成功、失败 + 成功 => redux写入信息 => 跳转页面
// 1.登录: 用户 + 密码 (自动跳转页面)
// 2.注册:  用户 + 密码 (自动跳转页面)

// 3. 头部信息展示用户名称，下拉菜单（账号设置 + 修改密码 + 退出登录）
// 4. 没有登录，进入某个页面，跳转到登录页
// 5. 已经登录，进入用户管理列表，权限不足，直接跳转到权限不够页
// 6. 用户中心只有权限满足才能显示在菜单上 (添加用户)
// 7.已经登录，无法再次进入登录、注册页面