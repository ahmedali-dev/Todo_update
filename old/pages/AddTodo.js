import React, { useRef } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

const AddTodo = () => {
  const todo = useRef(null);
  return (
    <div>
      <form>
        <Input ref={todo} label="todo" error="hello error" placeholder="todo" />
        <Button text="add todo" />
      </form>
    </div>
  );
};

export default AddTodo;
