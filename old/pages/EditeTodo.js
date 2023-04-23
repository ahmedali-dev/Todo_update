import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

const EditeTodo = () => {
  const params = useParams();
  const todo = useRef(null);
  return (
    <div>
      <form>
        <Input ref={todo} label="todo" defaultValue={params.id} error="hello error" placeholder="todo" />
        <Button text="add todo" />
      </form>
    </div>
  );
};

export default EditeTodo;
