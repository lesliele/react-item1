import React from 'react';
import { Form, Input, Button, Card, Cascader, Checkbox, Select, Switch, InputNumber, Space } from 'antd';
import './plan.less';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const {
  Option
} = Select;

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};
const TeacherPlan: React.FC = function TeacherPlan() {
  const [form] = Form.useForm();
  const options = [
    {
      value: 'gao',
      label: '高一',
      children: [
        {
          value: 'first',
          label: '1班'
        },
        {
          value: 'second',
          label: '2班'
        },
        {
          value: 'third',
          label: '3班'
        }
      ],
    },
    {
      value: 'gao2',
      label: '高二',
      children: [
        {
          value: 'first',
          label: '1班'
        },
        {
          value: 'second',
          label: '2班'
        }
      ],
    }
  ]
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  return (<Card>
    <Form {...formLayout} name="teacherPlan" onFinish={onFinish} autoComplete="off" className="teacher_plan" form={form}>
      <Form.Item 
        label="教师名称" 
        name="teacherName"
        rules={[{
        required: true,
        message: '请输入教师名称!'
      }]}>
        <Input placeholder="请输入教师名称" className="basic_input" allowClear={true} maxLength={6}/>
      </Form.Item>
      <Form.Item
        label="教师编号"
        name="teacherCode"
        rules={[{
          required: true,
          message: '请输入教师编号!'
        }]}>
        <Input placeholder="请输入教师编号" className="basic_input" allowClear={true} maxLength={10} />
      </Form.Item>
      <Form.Item
        label="联系电话"
        name="mobile"
        rules={[{
          required: true,
          message: '请输入联系电话!'
        }, {
          pattern: /^1[3|6|8][4|5|6]\d{8}$/,
          message: '联系电话有误!'
        }]}>
        <Input type="phone" placeholder="请输入联系电话" className="basic_input" allowClear={true} />
      </Form.Item>
      <Form.Item
        label="班级管理"
        name="classManager"
        rules={[{
          required: true,
          message: '请选择对应的班级!'
        }]}>
        <Cascader options={options} placeholder="请选择对应的班级" className="basic_cascader"/>
      </Form.Item>
      <Form.Item
        label="科目管理"
        name="studyType">
        <Checkbox.Group>
          <Checkbox value="yu">语文</Checkbox>
          <Checkbox value="math">数学</Checkbox>
          <Checkbox value="eng">英语</Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        label="教学期望"
        name="hope">
        <Select mode="multiple" className="basic_select" allowClear={true} placeholder="请输入教学期望">
          <Option value="house">奖励一套房子</Option>
          <Option value="dog">奖励一只柯基</Option>
          <Option value="money">奖励500美元</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="薪资填写"
        name="enable"
        valuePropName="checked">
        <Switch checkedChildren="开启" unCheckedChildren="关闭"/>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate>
        {({ getFieldValue }) => {
          return getFieldValue('enable') ? (
            <Form.Item
              label="薪资"
              name="payMoney"
            >
              <InputNumber placeholder="期望薪资" />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
      <Form.Item label="预计时间" validateFirst={true}>
        <Form.Item
          className="day"
          name="startDay"
          rules={[{
              required: true,
              message: '请输入最小时间!'
            }, {
              validator: (rule, value) => {
                // 手动触发下一个
                if (+form.getFieldValue('endDay')) form.validateFields(['endDay']);
                return Promise.resolve();
              }
            }]}
          validateFirst={true}
        >
          <Input placeholder="最小时间" />
        </Form.Item>
        <label className="sign">~</label>
        <Form.Item
          className="day"
          name="endDay"
          rules={[{
            required: true,
            message: '请输入最大时间!'
            },{
            validator: (rule, value) => {
              if (value && +value > +form.getFieldValue('startDay')) {
                return Promise.resolve();
              } else {
                return Promise.reject('时间段值有误!');
              }
            }
          }]}
          validateFirst={true}
        >
          <Input placeholder="最大时间" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="计划表">
        <Form.List name="allPlan" initialValue={[
          {
            planName: '文言文教学',
            planDays: 10
          }
        ]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => {
                return (index < 7 ? <Space key={field.key} wrap={true}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'planName']}
                    fieldKey={[field.fieldKey, 'planName']}
                    rules={[{ required: true, message: '请输入计划名称' }]}
                  >
                    <Input placeholder="计划名称" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'planDays']}
                    fieldKey={[field.fieldKey, 'planDays']}
                    rules={[{ required: true, message: '请输入计划所需时间' }]}
                  >
                    <Input placeholder="计划所需时间" />
                  </Form.Item>
                  <MinusCircleOutlined style={{
                    display: 'inline-block',
                    fontSize: 20,
                    verticalAlign: 'top',
                    marginTop: -10
                  }} onClick={() => remove(field.name)} />
                </Space> : null)
              } )}
              <Form.Item>
                <Button style={{width: 200}} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>添加计划</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">保存</Button>
      </Form.Item>
    </Form>
  </Card>)
}

export default TeacherPlan;