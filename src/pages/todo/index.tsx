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

  const handleSelect = async (item: DocumentInfo, empty = false) => {
    setCurItemId(item.id);
    if (empty) return setSelectedItem(item);
    const { data } = await getDocumentDetails(item.id);
    setSelectedItem(data);
  };

  const initDocList = () =>
    getDocuments()
      .then((res) => {
        const { data = [] } = res;
        setTodoList(data);
        if (data?.[0]) handleSelect(data[0]);
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
      <DocContent data={selectedItem!} initDocList={initDocList}></DocContent>
    </div>
  );
};
export default Todo;
