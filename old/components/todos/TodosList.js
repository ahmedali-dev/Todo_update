import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import css from "./TodosList.module.scss";
import { openHeader } from "../../store/Style";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteTodoList,
	fetchData,
	updateTodoList,
} from "../../store/TodoList";
import Input from "./../UI/Input";
import Button from "./../UI/Button";

const TodosList = ({ list }) => {
	const { isLoading } = useSelector((state) => state.list);
	const dispatch = useDispatch();
	const [edite, setedite] = useState(false);
	const [editeid, setediteid] = useState(null);
	const listUpdate = useRef(null);
	const deleteTodoListHandler = (id) => {
		console.log("remove todolist", id);
		dispatch(deleteTodoList({ id }));
		if (isLoading == false) {
			dispatch(fetchData());
		}
		//		dispatch(fetchData());
	};
	const editeTodoList = (id) => {
		setedite(true);
		setediteid(id);
	};

	const editehandler = (id) => {
		dispatch(
			updateTodoList({
				id,
				actionup: "todos",
				listup: listUpdate.current.value,
			})
		);
		setTimeout(() => {
			if (isLoading == false) {
				setediteid(null);
				dispatch(fetchData());
			}
		}, 2000);
	};

	console.log(edite, editeid);

	return (
		<>
			{list.map((item) => (
				<div
					className={css.item}
					key={item.id}
					id={item.id}
				>
					{editeid == item.id ? (
						<div>
							<form
								onSubmit={(
									e
								) => {
									e.preventDefault();
									editehandler(
										item.id
									);
								}}
							>
								<Input
									ref={
										listUpdate
									}
									type="text"
									placeholder="edite"
									defaultValue={
										item.todos
									}
								/>
							</form>
						</div>
					) : (
						<NavLink
							onClick={() =>
								dispatch(
									openHeader()
								)
							}
							to={`/todos/${item.id}`}
						>
							<div
								className={
									css.item_content
								}
							>
								<div
									className={
										css.item_content_todoname
									}
								>
									{
										item.todos
									}
								</div>
								<div
									className={
										css.item_content__todotime
									}
								>
									{
										item.time
									}
								</div>
							</div>
						</NavLink>
					)}
					<div className={css.item_option}>
						<Button
							onClick={() =>
								editeTodoList(
									item.id
								)
							}
							className={css.btnEdite}
							text={
								<i className="lar la-edit">
									{" "}
								</i>
							}
						></Button>
						<button
							onClick={() =>
								deleteTodoListHandler(
									item.id
								)
							}
							data-id={item.id}
						>
							<i className="lar la-trash-alt"></i>
						</button>
					</div>
				</div>
			))}
		</>
	);
};

export default TodosList;
