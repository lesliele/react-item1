import React from 'react';
import {
  Card,
  Tabs
} from 'antd';
import ExamList from './list/index';
const {
  TabPane
} = Tabs;

interface IProps{
  history: any,
  location: any,
  [key: string]: any
}
class Exam extends React.Component<IProps> {
  state = {
    currentTab: 'chinese'
  }
  handleTabChange = (key: any) => {
    const {
      history,
      location
    } = this.props;
    history.push(`${location.pathname}#${key}`);
    this.setState({
      currentTab: key
    });
  }
  render() {
    const {
      currentTab
    } = this.state;
    return (<Card>
      <div className="header">
        
      </div>
      <div className="content">
        <Tabs type="card" activeKey={currentTab} onChange={this.handleTabChange}>
          <TabPane tab="语文" key="chinese">
            {currentTab === 'chinese' ? <ExamList /> : null}
          </TabPane>
          <TabPane tab="数学" key="math">
            {currentTab === 'math' ? <ExamList /> : null}
          </TabPane>
        </Tabs>
      </div>
      <div className="action">
      
      </div>
    </Card>)
  }
  componentDidMount() {
    const {
      history,
      location
    } = this.props;
    const hash = location.hash.slice(1) || this.state.currentTab;
    history.push(`${location.pathname}#${hash}`);
    this.setState({
      currentTab: hash
    });
  }
}

export default Exam;