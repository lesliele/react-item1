import React from 'react';
import {
  Form,
  Input,
  Select
} from 'antd';
import './search.less';
const { Search } = Input;
const { Option } = Select;

interface IProps {
  onHandleSearch: any
}

function SearchCom(props: IProps) {
  const [form] = Form.useForm();
  const confirm = function handleSearch(e: any) {
    let search = {}
    if (e.trim() === '') {
      search = {
        enable: form.getFieldValue('enable')
      }
    } else {
      search = {
        type: e,
        enable: form.getFieldValue('enable')
      }
    }
    props.onHandleSearch(search);
  }
  return (<div>
    <Form
      name="basic"
      form={form}
      initialValues={{
        enable: '0'
      }}
      layout="inline"
      className="form"
    >
      <Form.Item
        label="是否启用"
        name="enable"
        className="basic_select"
      >
        <Select>
          <Option value="1">开启</Option>
          <Option value="0">关闭</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="类型名称"
        name="type"
      >
        <Search 
          placeholder="请输入类型名称" 
          className="basic_input" 
          allowClear
          enterButton
          onSearch={confirm}/>
      </Form.Item>
    </Form>
  </div>)
}

export default SearchCom;