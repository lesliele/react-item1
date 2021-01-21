import React, {
  useEffect
} from 'react';
import { LeftOutlined } from '@ant-design/icons';
import {
  useSelector
} from 'react-redux'
import {
  Button,
  Divider
} from 'antd';
import './back-header.less';
import {
  IStore
} from '@/store/reducers/index'

interface IProps {
  leftTitle?: string,
  mainTitle?: string,
  mainSlot?: JSX.Element,
  onConfirm: () => void,
  [key: string]: any
}
// 提供中间部分插槽
const BackHeader: React.FC<IProps> = function BackHeader(props: IProps) {
  const main = function main() {
    if (props.mainSlot) {
      return props.mainSlot;
    }
    if (props.mainTitle) {
      return <span>{props.mainTitle}</span>
    }
    return null;
  }
  const handleConfirm = function handleConfirm() {
    props.onConfirm();
  }
  const routeData = (state: IStore) => state.route.routeData;
  const data = useSelector(routeData);
  const goBack = () => {
    // 如果当前的历史栈只有2层(应该直接跳转至某个页面)，只有大于2层才能直接返回，否则下次进行新页时会导致返回有问题
    if (props.history.length > 2) {
      props.history.goBack();
    } else {
      props.history.push(data.pop());
    }
  }
  return (<div className="back_header_wrapper">
      <div className="back_header_inner">
        <div className="left">
          <LeftOutlined style={{fontSize: 20, cursor: 'pointer'}} onClick={goBack}/>
          {props.leftTitle ? <span className="left_title">{props.leftTitle}</span> : null}
        </div>
        <div className="main">
          {main()}
        </div>
        <div className="right">
          <Button type="primary" onClick={handleConfirm}>保存</Button>
        </div>
      </div>
      <Divider className="divider"/>
  </div>)
}

export default BackHeader;