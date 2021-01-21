import React from 'react';
import {
  Table,
  Tag
} from 'antd';
import {
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import Ajax from '@/http/ajax';
import Http from '@/http/http';
import Conf from '@/global/config';

class ExamList extends React.Component<RouteComponentProps>{
  state = {
    columns: [
      {
        title: '难度',
        dataIndex: 'difficulty',
        render (text: string) {
          switch (text) {
            case 'easy':
              text = '简单';
              break;
            case 'middle':
              text = '中等';
              break;
            default:
              text = '困难';
              break;
          }
          return <span>{text}</span>
        }
      },
      {
        title: '选择题',
        dataIndex: 'choice',
      },
      {
        title: '填空题',
        dataIndex: 'blank',
      },
      {
        title: '阅读题',
        dataIndex: 'reading',
      },
      {
        title: '应用题',
        dataIndex: 'application',
      },
      {
        title: '听力题',
        dataIndex: 'listening',
      },
      {
        title: '满分',
        dataIndex: 'fullMarks',
      },
      {
        title: '总时间',
        dataIndex: 'times',
      },
      {
        title: '是否启用',
        dataIndex: 'enable',
        render (bool: boolean) {
          return <Tag color={bool ? '#87d068' : '#f50'}>{bool ? '开启' : '关闭'}</Tag>
        }
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
      }
    ],
    data: [],
    currentPage: 1,
    total: 0,
    loading: false
  }
  loadData = async () => {
    this.setState({ loading: true});
    const d = await Ajax.get(Http.subjectList, {
      params: {
        filter: {
          limit: Conf.PAGESIZE,
          skip: (this.state.currentPage - 1) * Conf.PAGESIZE,
          where: {
            name: this.props.location.hash.slice(1)
          }
        }
      }
    });
    this.setState({
      loading: false,
      data: d
     });
    this.getTotal();
  }
  getTotal = async () => {
    await Ajax.get(`${Http.subjectList}/count`, {
      params: {
        filter: {
          where: {
            name: this.props.location.hash.slice(1)
          }
        }
      }
    }).then((t: any) => {
      this.setState({ total: t.count})
    })
  }
  handlePageChange = (page: number) => {
    this.setState({ currentPage: page});
  }
  render () {
    const {
      columns,
      data,
      loading,
      currentPage,
      total
    } = this.state;
    return (<>
      <Table 
        columns={columns} 
        dataSource={data} 
        loading={loading}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: Conf.PAGESIZE,
          pageSizeOptions: Conf.PAGEOPTIONS,
          total: total,
          onChange: this.handlePageChange
        }}/>
    </>)
  }
  componentWillMount() {
    this.loadData();
  }
  componentDidUpdate(prevProp: any, prevState: any) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.loadData();
    }
  }
}

export default withRouter(ExamList);