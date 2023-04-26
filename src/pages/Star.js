import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollectionData } from "../Store/slices/CollectionsSlice";
import authContext from "../Store/Auth-context";

const Star = () => {
  const ctx = useContext(authContext);
  const { fetch } = useSelector((state) => state.collections);
  const dispatch = useDispatch();
  useEffect(() => {
    if (fetch.data.length === 0) {
      dispatch(fetchCollectionData(ctx.token));
    }
  }, [dispatch]);
  // console.log(collections);
  return (
    <div>
      {/*{fetch.data &&*/}
      {/*  fetch.data.map((data) => {*/}
      {/*    return data?.tasks.map((task) => {*/}
      {/*      if (task.star) {*/}
      {/*        return <Todo task={task.name} id={task.id} comp={task.status} />;*/}
      {/*      }*/}
      {/*    });*/}
      {/*  })}*/}
      <h1
        style={{
          textAlign: "center",
          margin: "7rem 1rem",
        }}
      >
        this page not finished yet
      </h1>
    </div>
  );
};
export default Star;
