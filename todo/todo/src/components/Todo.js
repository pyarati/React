import { useState } from "react";

const Todo = () => {
  const [data, setData] = useState("");
  const [listData, setListData] = useState([]);

  const addItem = (item) => {
    if (item) {
      setListData([...listData, item]);
      setData("");
    }
  };

  const deleteItem = (item) => {
    const updatedData = listData.filter((value) => {
      return value !== item;
    });
    setListData(updatedData);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={data}
          placeholder="Add item"
          onChange={(e) => setData(e.target.value)}
        ></input>
        <button onClick={() => addItem(data)}> Add Item</button>
      </div>

      {listData.map((item) => (
        <div key={item}>
          {item}
          <button onClick={() => deleteItem(item)}>Delete Item</button>
        </div>
      ))}
    </>
  );
};

export default Todo;
