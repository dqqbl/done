import React, { memo, useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { DInput } from "@/components";
import { createDocument, updateDocument } from "@/api/todo";
import { DocumentInfo } from "@/types/todo";
import { ENTER_KEY } from "@/constants";
import styles from "./index.less";
import { message } from "antd";

// type DocumentInfo = DocumentInfo;

interface SideBarProps {
  data: DocumentInfo[];
  curItemId?: string;
  handleSelect: (item: DocumentInfo, empty?: boolean) => void;
  initDocList: () => void;
}

const SideBar = (props: SideBarProps) => {
  const { data = [], curItemId, initDocList, handleSelect } = props;

  const newDocRef = useRef<any>(null);

  const [renderList, setRenderList] = useState(data);

  // const [newDoc, setNewDoc] = useState<DocumentInfo>();
  const [isEditing, setIsEditing] = useState(false);
  // const [newDocName, setNewDocName] = useState("");

  const emptyDoc = {
    id: "newDoc",
    name: "未命名",
    lists: [],
  };

  const handleItemClick = (item: DocumentInfo) => {
    if (item.id === curItemId) return;
    handleSelect(item);
  };

  const handleAddClick = () => {
    setRenderList([emptyDoc, ...data]);
    // setNewDoc(emptyDoc);
    handleSelect(emptyDoc, true);
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ENTER_KEY) {
      if (isEditing) {
        newDocRef.current.blur();
      }
      setIsEditing(!isEditing);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = [...renderList];
    const index = temp.findIndex((i) => i.id === curItemId);
    temp[index].name = e.target.value;
    setRenderList([...temp]);
  };

  const handleBlur = async () => {
    try {
      setIsEditing(false);
      if (curItemId === "newDoc") {
        await createDocument({ name: renderList[0].name || "" });
        message.success("文档创建成功");
      } else {
        const temp = [...renderList];
        const index = temp.findIndex((i) => i.id === curItemId);
        await updateDocument({ id: curItemId!, name: renderList[index].name });
        message.success("文档修改成功");
      }
      await initDocList();
    } catch (error) {
      console.log(error);
      message.error("操作失败");
    }
  };

  useEffect(() => {
    isEditing && newDocRef.current.focus();
  }, [isEditing]);

  useEffect(() => {
    setRenderList(data);
  }, [data]);

  // const renderList = newDoc ? [newDoc, ...data] : data;

  return (
    <div className={styles.sideBarWrap}>
      <div className={styles.sideBarHeader}>Directory</div>
      <div className={styles.sideBarContentWrap}>
        {/* <div className={styles.sideBarContent}> */}
        {renderList.map((i, index) => (
          <li
            tabIndex={index + 1}
            className={classNames(styles.directoryItem, { [styles.selected]: curItemId === i.id })}
            key={i.id}
            onClick={() => handleItemClick(i)}
            onKeyDown={handleKeyDown}
          >
            <DInput
              defaultValue={i.name}
              isDesc={!(curItemId === i.id && isEditing)}
              ref={newDocRef}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </li>
        ))}
        {/* </div> */}
      </div>
      <div className={styles.sideBarFooter} onClick={handleAddClick}>
        <div className={styles.addDocIcon}>+</div>
      </div>
    </div>
  );
};
export default memo(SideBar);
