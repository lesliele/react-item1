import React from 'react';
import {
  Tabs,
  Card,
  Input,
  Radio,
  Button,
  Spin,
  message
} from 'antd';
import './user-edit.less';
import Ajax from '@/http/ajax';
import Http from '@/http/http';
import {
  connect
} from 'react-redux';
import {
  IStore
} from '@/store/reducers/index'

const { TabPane } = Tabs;
const { TextArea } = Input;

class UserEdit extends React.PureComponent {
  state = {
    currentTab: '1',
    basicData: {
      username: '',
      nickname: '',
      sex: 1,
      address: ''
    },
    invalidName: false,
    invaliAddress: false,
    loading: false
  }
  loadData = async () => {
    this.setState({ loading: true});
    const props: any = this.props;
    let result: any = await Ajax.get(`${Http.userAction}/${props.userId}`, {
      headers: {
        'authorization': props.id
      }
    });
    let {
      username,
      nickname,
      address,
      sex
    } = result;
    this.setState({
      basicData: {
        username,
        nickname,
        address,
        sex
      },
      loading: false
    });
  }
  handleChange = (key: string) => {
    this.setState({ currentTab: key})
  }
  handleFormChange = (key: string, e: any) => {
    if (key === 'nickname' && e.target.value) {
      this.setState({ invalidName: false })
    }
    if (key === 'address' && e.target.value) {
      this.setState({ invaliAddress: false })
    }
    this.setState({
      basicData: {
        ...this.state.basicData,
        [key]: e.target.value
      }
    })
  }
  saveBasicData = () => {
    if (this.state.basicData.nickname === '') {
      this.setState({ invalidName: true})
      return;
    }
    if (this.state.basicData.address === '') {
      this.setState({ invaliAddress: true })
      return;
    }
    this.handleSave();
  }
  handleSave = async () => {
    this.setState({ loading: true });
    const props: any = this.props;
    await Ajax.put(`${Http.userAction}/${props.userId}`, this.state.basicData, {
      headers: {
        'authorization': props.id
      }
    });
    message.success('修改成功!');
    this.setState({ loading: false });
  }
  render () {
    const {
      currentTab,
      basicData,
      invalidName,
      invaliAddress,
      loading
    } = this.state;
    return (<Spin spinning={loading}>
      <Card className="user_edit">
        <Tabs defaultActiveKey="1" activeKey={currentTab} onChange={this.handleChange}>
          <TabPane tab="账号设置" key="1">
            <div className="form_wrapper">
              <div className="form_item">
                <label className="title">账号</label>
                <Input className="basic_input" value={basicData.username} disabled />
              </div>
              <div className="form_item">
                <label className="title">昵称</label>
                <Input className="basic_input" value={basicData.nickname} placeholder="请输入昵称" onChange={this.handleFormChange.bind(this, 'nickname')} />
                {invalidName ? <span className="tips">请填写昵称</span> : null}
              </div>
              <div className="form_item">
                <label className="title">性别</label>
                <Radio.Group name="radiogroup" value={basicData.sex} onChange={this.handleFormChange.bind(this, 'sex')}>
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </Radio.Group>
              </div>
              <div className="form_item">
                <label className="title title_top">地址</label>
                <TextArea rows={4} value={basicData.address} className="basic_textarea" onChange={this.handleFormChange.bind(this, 'address')} />
                {invaliAddress ? <span className="tips tips_top">请填写地址</span> : null}
              </div>
              <div className="form_item">
                <Button className="btn" type="primary" onClick={this.saveBasicData}>保存</Button>
              </div>
            </div>
          </TabPane>
          <TabPane tab="修改密码" key="2">
            修改密码
        </TabPane>
        </Tabs>
      </Card>
    </Spin>)
  }
  componentDidMount () {
    this.loadData();
  }
}

export default connect((state: IStore) => state.user)(UserEdit);