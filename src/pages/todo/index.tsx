import { useEffect, useState } from 'react'
import { getDocuments } from '@/api/todo'
import SideBar from "./components/SideBar";
import styles from "./index.less";
import { DocumentInfo } from '@/types/todo';
import { message } from 'antd';

const Todo = () => {
  const [todoList, setTodoList] = useState<DocumentInfo[]>([])
  const [selectedItem, setSelectedItem] = useState<DocumentInfo>()

  // const handleSelect = (item:DocumentInfo) => {
  //   setSelectedItem(item)
  // }

  useEffect(() => {
    getDocuments().then(res => {
      const { data } = res
      setTodoList(data)
    }).catch(() => {
      message.error('获取todolist失败')
    })
  }, [])

  return (
    <div className={styles.todoRoot}>
      <SideBar data={todoList} handleSelect={setSelectedItem} curItem={selectedItem} />
      <div className={styles.documentWrap}>
        <div className={styles.titleBar}>
          <div className={styles.titleLeftBar}></div>
          <div className={styles.title}>工作记录</div>
          <div className={styles.titleRightBar}></div>
        </div>
        <div className={styles.documentContentWrap}>content</div>
      </div>
    </div>
  );
};
export default Todo;
