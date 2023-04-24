import React, { useContext, useEffect, useState } from "react";
import css from "./Todo.module.scss";
import { Delete, Edit, Mark } from "../icons/icons";
import { useDispatch } from "react-redux";
import { ChangeStatusTask, RemoveTask, UpdateTask } from "../../Store/slices/TaskSlice";
import axios from "../../hooks/axios";
import { useParams } from "react-router-dom";
import authContext from "../../Store/Auth-context";
import { boolean } from "yup";
import { toast } from "react-hot-toast";
import { Formik } from "formik";
import Input from "../UI/Input";
import Button from "../UI/Button";
import * as yup from "yup";

const Todo = ({ id, task, comp, fetchTask, hanlderComplete }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const ctx = useContext(authContext);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll(`.${css.items}`);
    const options = document.querySelectorAll(`.${css.items_item_task_options}`);
    items.forEach(item => {
      const button = item.querySelector(`.${css.items_item_task_linec}`);
      const option = item.querySelector(`.${css.items_item_task_options}`);
      button.addEventListener("click", () => {
        if (option.id) {
          console.log("found class");
          setTimeout(() => {
            options.forEach(option => {
              option.id = "";
              option.classList.remove(css.items_item_task_options_active);
              setTimeout(() => {
                option.style.display = "none";
              }, 100);
            });
          }, 100);

        } else {
          options.forEach(option => {
            option.style.display = "none";
            option.id = "";
            option.classList.remove(css.items_item_task_options_active);
          });
          // if (option.classList.value === 'Todo_items_item_task_options__SyoK3 Todo_items_item_task_options_active__DT8Vs') {
          //     option.style.display = 'none';
          //     option.classList.remove(css.items_item_task_options_active)
          //     return;
          // }
          option.style.display = "flex";
          setTimeout(() => {

            console.log("error");
            option.id = "active";
            option.classList.add(css.items_item_task_options_active);
          }, 100);
        }

      });


    });
  }, [setEdit]);


  const handleEndConcert = async (id_task, status) => {
    try {
      const data = new FormData();
      data.append("id_collection", params.id);
      data.append("token", ctx.token);
      data.append("id_task", id_task);
      data.append("status", status);
      const request = await axios.post("/task/status", data);
      const res = await request.data

      if (res.status !== 200) {
        if (res?.error?.token) {
          ctx.logout();
          return;
        }else if (res?.error?.request) {
          res.error.request.forEach(e => {
            toast.error(e);
          })
        }
        return;
      }
    } catch (e) {
      toast.error(e.message());
    }
  };


  const RemoveHandle = async (id_task) => {
    try {
      const data = new FormData();
      data.append("id_collection", params.id);
      data.append("token", ctx.token);
      data.append("id_task", id_task);
      const request = await axios.post("/task/delete", data);
      const res = await request.data
      if (res.status !== 200) {
        if (res?.error?.token) {
          ctx.logout();
          return;
        }else if (res?.error?.request) {
          res.error.request.forEach(e => {
            toast.error(e);
          })
        }
        return;
      }
    } catch (e) {
      toast.error(e.message());
    }
  };

  const editSubmitHanlder = async (values, actions) => {
    if (values.task == task) {
      setEdit(false);
      return;
    }

    dispatch(UpdateTask({id,task: values.task}))
    try {
      const data = new FormData();
      data.append("id_collection", params.id);
      data.append("token", ctx.token);
      data.append("id_task", id);
      data.append('task', values.task);
      const request = await axios.post("/task/update", data);
      const res = await request.data
      if (res.status !== 200) {
        if (res?.error?.token) {
          ctx.logout();
          return;
        }else if (res?.error?.request) {
          res.error.request.forEach(e => {
            toast.error(e);
          })
        }
        return;
      }
    } catch (e) {
      toast.error(e.message());
    }
    setEdit(false);
  };
  return (
    <div className={css.items} key={id}>
      <div
        className={css.items_item_task_linec}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {
        !edit
          ?
          <div className={`${css.items_item_task_ta} ${comp && css.items_item_task_comp}`}>
            <div className={`${css.items_item_task_ta_name} ${comp && css.items_item_task_comp_name}`}
            >
              <label htmlFor={id}><p>{task}</p></label>
            </div>
            <div className={`${css.items_item_task_ta_checkBox} ${comp && css.completed}`}>
              {!comp ?
                <input
                  key={id}
                  type="checkbox"
                  onClick={() => {
                    dispatch(ChangeStatusTask({ id }));
                    handleEndConcert(id, true);
                    console.log("false change");
                  }} id={id}
                /> :
                <input
                  onClick={() => {
                    dispatch(ChangeStatusTask({ id }));
                    handleEndConcert(id, false);
                    console.log("change true");
                  }}
                  defaultChecked
                  key={id}
                  type="checkbox" id={id}
                />}
              <label htmlFor={id}>
                                    <span>
                                       <Mark />
                                    </span>
              </label>
            </div>
          </div>
          :
          <Formik
            initialValues={{ task: task }}
            validationSchema={yup.object({
              task: yup.string().min(3).max(32).required().trim()
            })}
            onSubmit={editSubmitHanlder}>
            {(formik) => (
              <form className={css.items_item_task_edit} action="" onSubmit={formik.handleSubmit}>
                <Input
                  classname={css.items_item_task_edit_input}
                  placeholder={"task"}
                  defaultValue={task}
                  name={'task'}
                  {...formik.getFieldProps('task')}
                  error={formik.touched.task && formik.errors.task ? formik.errors.task : null}
                />
                <Button text={<Edit />} classname={css.items_item_task_edit_btn} />
              </form>
            )}
          </Formik>
      }
      {/*action event*/}
      <div className={css.items_item_task_options}>
        <div onClick={() => {
          const options = document.querySelectorAll(`.${css.items_item_task_options}`);
          options.forEach(option => {
            option.id = "";
            option.classList.remove(css.items_item_task_options_active);
            setTimeout(() => {
              option.style.display = "none";
            }, 100);
          });
          setEdit(!edit);
        }} className={css.items_item_task_options_option}><Edit /></div>


        <div onClick={() => {
          dispatch(RemoveTask({ id }));
          if (RemoveHandle(id)) {
            console.log("finish remove task");
          }

        }} className={css.items_item_task_options_option}><Delete /></div>
      </div>
    </div>
  );
};

export default Todo;