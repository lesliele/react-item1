export interface menuItem {
  key: string,
  title: string,
  isRequired?: boolean,
  children?: Array<menuItem>
}

export const routes: Array<menuItem> = [
  {
    title: '主页',
    key: '/home'
  },
  {
    title: '学习科目',
    key: '/colleage',
    children: [
      {
        title: '语文',
        key: '/colleage/yu'
      },
      {
        title: '数学',
        key: '/colleage/math'
      }
    ]
  },
  {
    title: '学生列表',
    key: '/studentList',
    isRequired: true
  },
  {
    title: '教学计划',
    key: '/teacher-plan'
  },
  {
    title: '账号设置',
    key: '/user-edit'
  },
  {
    title: '考试内容',
    key: '/exam'
  }
]

export interface menuDetail {
  title: string,
  key: string
}

export interface menuMap {
  [key: string]: Array<menuDetail>
}

interface IData {
  [key: string]: Array<menuItem>
}

export function getInitMenuObj(): IData {
  let pageResult: string[] = [];
  let menuObj: IData = {};
  let curIndex = 0;
  const initPath = function initPath(data: Array<menuItem>) {
    data.forEach(item => {
      if (item.children) {
        initPath(item.children);
      } else {
        pageResult.push(item.key);
      }
    });
  }
  initPath(routes);
  const initMenu = function initMenu(data: Array<menuItem>, prev: Array<any>): Array<any> {
    return data.map(item => {
      if (item.children) {
        return initMenu(item.children, prev.concat(item));
      } else {
        menuObj[pageResult[curIndex]] = prev.concat(item);
        curIndex++;
        return prev.concat(item);
      }
    })
  }
  initMenu(routes, []);
  return menuObj;
}