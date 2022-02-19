import { useEffect, useState } from "react";
import { getDocumentDetails, getDocuments } from "@/api/todo";
import { DocumentInfo } from "@/types/todo";
import { message } from "antd";
import SideBar from "./components/SideBar";
import DocContent from "./components/DocContent";
import styles from "./index.less";

const Todo = () => {
  const [todoList, setTodoList] = useState<DocumentInfo[]>([]);
  const [curItemId, setCurItemId] = useState("");
  const [selectedItem, setSelectedItem] = useState<DocumentInfo>();

  /** 初始化单个文档详情数据 */
  const initTodoList = async (id = curItemId) => {
    const { data } = await getDocumentDetails(id);
    setSelectedItem(data);
  };

  const handleSelect = async (item: DocumentInfo, empty = false) => {
    setCurItemId(item.id);
    if (empty) return setSelectedItem(item);
    await initTodoList(item.id);
    // const { data } = await getDocumentDetails(item.id);
    // setSelectedItem(data);
  };

  /** 初始化sideBar数据 */
  const initDocList = (restSel = true) =>
    getDocuments()
      .then((res) => {
        const { data = [] } = res;
        setTodoList(data);
        if (restSel && data?.length) handleSelect(data[0]);
      })
      .catch(() => {
        message.error("获取todolist失败");
      });

  useEffect(() => {
    initDocList();
  }, []);

  return (
    <div className={styles.todoRoot}>
      <SideBar data={todoList} handleSelect={handleSelect} curItemId={curItemId} initDocList={initDocList} />
      <DocContent initialTodoList={selectedItem!} initDocList={initDocList} initTodoList={initTodoList}></DocContent>
    </div>
  );
};
export default Todo;
