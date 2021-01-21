import React, {
  useEffect,
  useState,
  useRef
} from 'react';
import {
  Table,
  Image,
  Switch,
  message,
  Row,
  Col,
  Button,
  Modal
} from 'antd';
import Ajax from '@/http/ajax';
import Http from '@/http/http';
import './index.less';
import Conf from '@/global/config';
import Search from './search';
import ModalForm from './modal-form';

export interface IData {
  id: string,
  type: string,
  num: number,
  teacher: string,
  class: string,
  enable: string,
  startTime: any,
  img: string,
  [key: string]: any
}
interface IProps {
  history: any,
  location: any,
  match: any,
  [key: string]: any
}

const YuCom: React.FC<IProps> = function YuCom(props: IProps) {
  const columns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: any, row: any) => {
        return (
          <div className="wrapper">
            <Image
              width={100}
              src={row.img ? row.img : require('@/static/images/default.png').default}
            />
            <span>{row.type}</span>
          </div>
        )
      }
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num'
    },
    {
      title: '教师',
      dataIndex: 'teacher',
      key: 'teacher'
    },
    {
      title: '教室',
      dataIndex: 'class',
      key: 'class'
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime'
    },
    {
      title: '启用',
      dataIndex: 'enable',
      key: 'enable',
      render(text: string, row: IData, index: number) {
        const handleChange = function handleChange(checked: boolean) {
          const newData = data.filter((item, i) => {
            if (i === index) {
              item.enable = checked ? '1' : '0';
            }
            return true;
          });
          // 更新数据
          updateData(row.id, {
            enable: checked ? '1' : '0'
          }).then(() => {
            setData(newData);
          });
        }
        const isChecked = +row.enable === 1;
        return (<>
          <Switch checkedChildren="启用" unCheckedChildren="关闭" checked={isChecked} onChange={handleChange}/>
        </>)
      }
    },
    {
      title: '操作',
      dataIndex: 'handle',
      key: 'handle',
      render(text: any, row: IData) {
        const handleDel = function handleDel() {
          Modal.confirm({
            title: '提示',
            content: '确认删除吗?',
            onOk () {
              handleDelData(row.id);
            },
            onCancel() {

            }
          })
        }
        const handleEdit = () => {
          // 弹窗的类型
          // setRowData(row);
          // showModal();
          // 新开页面
          let {
            history
          } = props;
          history.push(`/colleage/yu/yu-edit/${row.id}`);
        }
        return (
          <div>
            <p><a onClick={handleEdit}>编辑</a></p>
            <p><a onClick={handleDel}>删除</a></p>
          </div>
        )
      }
    },
  ];
  interface IUpdateData {
    [key: string]: any
  }
  const [data, setData] = useState<IData[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(Conf.PAGE);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useState({});
  const [isShow, setIsShow] = useState(false);
  const [rowData, setRowData] = useState({});
  // 加载数据
  const loadData = function loadData() {
    setLoading(true);
    Ajax.get(Http.studyList, {
      params: {
        filter: {
          limit: Conf.PAGESIZE,
          skip: (currentPage - 1) * Conf.PAGESIZE,
          where: { ...searchParams }
        }
      }
    }).then((d: any) => {
      d.forEach((item: any, index: number) => {
        item.key = index;
      })
      setData(d);
      setLoading(false);
      getAllTotal();
    })
  };
  // 获取数量
  const getAllTotal = function getAllTotal() {
    Ajax.get(`${Http.studyList}/count`, {
      params: {
        filter: {
          where: { ...searchParams }
        }
      }
    }).then((t: any) => {
      setTotal(t.count);
    })
  }
  // 更新数据
  const updateData = function updateData(id: string, info: IUpdateData) {
    setLoading(true);
    return Ajax.put(`${Http.studyList}/${id}`, info).then(d => {
      setLoading(false);
      message.success('更新成功!');
    });
  }
  // 分页
  const handlePageChange = function handlePageChange(page: number) {
    setCurrentPage(page);
  }
  // 搜索
  const handleSearch = function handleSearch(params: any) {
    setSearchParams(params);
  }
  // 删除
  const handleDelData = function handleDelData(id: string) {
    setLoading(true);
    return Ajax.delete(`${Http.studyList}/${id}`).then(d => {
      setLoading(false);
      message.success('删除成功!');
    });
  }
  // 创建
  const createType = function createType() {
    // 弹窗形式
    // showModal(); 
    // 新开页面
    let {
      history
    } = props;
    history.push('/colleage/yu/yu-add');
  } 
  const showModal = () => {
    setIsShow(true);
  }
  const hideModal = () => {
    setIsShow(false);
  }

  useEffect(() => {
    loadData();
  }, [currentPage, searchParams]);
  return (<>
    <Row>
      <Col className="gutter-row" span={16}>
        <Search onHandleSearch={handleSearch} />
      </Col>
      <Col className="gutter-row add" span={8}>
        <Button type="primary" onClick={createType}>添加类型</Button>
      </Col>
    </Row>
    <Table 
      columns={columns} 
      dataSource={data} 
      loading={loading}
      pagination={{
        current: currentPage,
        pageSize: Conf.PAGESIZE,
        pageSizeOptions: Conf.PAGEOPTIONS,
        total: total,
        onChange: handlePageChange
      }}/>
    <ModalForm 
      data={rowData}
      visible={isShow} 
      onShowModal={showModal} 
      onHideModal={hideModal} 
      onReload={() => { loadData();}}/>
  </>)
}

export default YuCom;