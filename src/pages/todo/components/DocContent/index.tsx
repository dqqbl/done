import { useEffect, memo, useState, useRef } from "react";
import { message, Modal, Input} from "antd";
import { DocumentInfo, TodoListInfo } from "@/types/todo";
import ListCard from "../ListCard";
import styles from "./index.less";
import { deleteDocument } from "@/api/todo";
import { ENTER_KEY } from "@/constants";

interface DocContentProps {
  data: DocumentInfo;
  initDocList: () => void;
}

const DocContent = (props: DocContentProps) => {
  const { data, initDocList } = props;
  const { id: docId, name: docName, lists = [] } = data || {};

  const [renderList, setRenderList] = useState<TodoListInfo[]>();
  const inputRef = useRef<any>(null)

  const [curSelId, setCurSelId] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  // const [curId, setCurId] = useState('')
  // const [idObj, setIdObj] = useState()

  const handleDeleteDoc = () => {
    Modal.confirm({
      content: "确认删除该文档",
      onOk: () => {
        deleteDocument(docId!)
          .then(() => {
            message.success("删除成功");
            initDocList();
          })
          .catch((err) => {
            console.log(err);
            message.error("删除失败");
          });
      },
    });
  };

  const emptyList = {
    id: "newList",
    title: new Date().toDateString(),
    items: [],
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ENTER_KEY) {
      if (isEditing) {
        inputRef.current.blur();
      }
      setIsEditing(!isEditing);
    }
  };

  const handleBlur = async () => {
    try {
      setIsEditing(false);
      if (curSelId === "newList") {
        // await createDocument({ name: renderList[0].name || "" });
        message.success("文档创建成功");
      } else {
        // const temp = [...renderList];
        // const index = temp.findIndex((i) => i.id === curItemId);
        // await updateDocument({ id: curItemId!, name: renderList[index].name });
        message.success("文档修改成功");
      }
      // await initDocList();
    } catch (error) {
      console.log(error);
      message.error("操作失败");
    }
  };

  useEffect(() => {
    setRenderList(lists);
  }, [lists]);

  useEffect(() => {
    isEditing && inputRef.current.focus();
  }, [isEditing]);

  return (
    <div className={styles.documentWrap}>
      <div className={styles.titleBar}>
        <div className={styles.titleLeftBar}></div>
        <div className={styles.title}>{docName}</div>
        <div className={styles.titleRightBar}>
          <div
            onClick={() => {
              setRenderList([emptyList, ...lists]);
              setCurSelId(emptyList.id)
              // setIdObj
            }}
          >
            ➕
          </div>
          <div onClick={handleDeleteDoc}>删</div>
        </div>
      </div>
      <div className={styles.documentContentWrap}>
        {renderList?.map((i, index) => (
          <ListCard key={i.id} data={i} ref={inputRef} curSelId={curSelId} tabIndex={renderList?.length + index  + 1} onKeyDown={handleKeyDown} isEditing={isEditing} onBlur={handleBlur} />
        ))}
      </div>
    </div>
  );
};

export default memo(DocContent);
