import React, { useRef, useState } from "react";
import css from "./TodosItem.module.scss";
import { Link } from "react-router-dom";
import Input from "../UI/Input";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import {
	addchild,
	fetchData,
	updateTodoItem,
	deleteTodoItem,
} from "../../store/TodoList";

const TodoItems = (props) => {
	const [edite, setedite] = useState(null);
	const dispatch = useDispatch();
	const todoItemtext = useRef(null);
	const itemupdate = useRef(null);
	const { data, isLoading } = useSelector((state) => state.list);
	let getTodo = data.find((todo) => todo.id == props.id);

	console.log(getTodo);
	if (!getTodo) {
		return <div className={"center"}>not found todo</div>;
	}
	getTodo = getTodo.child ? JSON.parse(getTodo.child) : "";

	const additemhandler = (e) => {
		e.preventDefault();

		if (todoItemtext.current.value.length === 0) return;

		let newchild;
		if (getTodo) {
			//	const counter =
			//		getTodo.child !== null ||
			//? getTodo[getTodo.length - 1].id
			//: 0;
			const counter = props.id;
			const time = new Date().getTime();
			newchild = [
				...getTodo,
				{
					id: Math.floor(
						Math.random() * 10000 + time
					),
					item: todoItemtext.current.value,
				},
			];
		} else {
			newchild = [
				{
					id: Math.floor(1),
					item: todoItemtext.current.value,
				},
			];
		}

		// console.log(newchild)
		const todo = { id: props.id, child: newchild };
		dispatch(addchild({ addData: todo }));
		if (isLoading) return;
		dispatch(fetchData());
		todoItemtext.current.value = "";
	};

	const editehandler = (id) => {
		console.log(id);
		const getitem = data.find((i) => i.id == props.id);
		//		console.log(getitem);
		if (!getitem) return;
		if (!getitem.child) return;
		const childs = JSON.parse(getitem.child);
		//const getchildupdate = child.find((f) => f.id == id);
		//console.log(getchildupdate);
		//if (!getchildupdate) return;
		childs.map((child) => {
			if (child.id == id) {
				child.item = itemupdate.current.value;
			}
		});

		//console.log(childs);
		dispatch(
			updateTodoItem({
				id: props.id,
				actionup: "",
				child: childs,
			})
		);
		setedite(null);
		if (isLoading == false) {
			dispatch(fetchData());
		}
	};

	const deleteitem = (id) => {
		const getitem = data.find((i) => i.id == props.id);
		//		console.log(getitem);
		if (!getitem) return;
		if (!getitem.child) return;
		const childs = JSON.parse(getitem.child);

		const childfilter = childs.filter((f) => f.id !== id);

		dispatch(
			deleteTodoItem({
				id: props.id,
				actionup: "",
				child: childfilter,
			})
		);

		if (isLoading == false) {
			dispatch(fetchData());
		}
	};
	const ToDosItem = (data) => (
		<div className={css.item} key={data.id}>
			{edite !== data.id ? (
				<div className={css.item_content}>
					<div
						className={
							css.item_content_todoname
						}
					>
						{data.item}
					</div>
					{/*<div className={css.item_content__todotime}>{}</div>*/}
				</div>
			) : (
				<div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							editehandler(data.id);
						}}
					>
						<Input
							ref={itemupdate}
							type="text"
							placeholder="edite"
							defaultValue={data.item}
						/>
					</form>
				</div>
			)}

			<div className={css.item_option}>
				<Button
					onClick={() => setedite(data.id)}
					className={css.editbtn}
					text={<i className="lar la-edit"></i>}
				></Button>
				<button onClick={() => deleteitem(data.id)}>
					<i className="lar la-trash-alt"></i>
				</button>
			</div>
		</div>
	);

	if (isLoading) {
		return <div>isloading</div>;
	}
	return (
		<>
			<div className={css.form}>
				<form action="" onSubmit={additemhandler}>
					<Input
						ref={todoItemtext}
						placeholder={"add new item"}
					/>
					<Button text={"item"}></Button>
				</form>
			</div>
			{!getTodo ? (
				<div className={"center"}>
					ToDo list is empty
				</div>
			) : (
				getTodo.map((singletodo) =>
					ToDosItem(singletodo)
				)
			)}
		</>
	);
};

export default TodoItems;
