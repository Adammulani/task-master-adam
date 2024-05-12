import React, { useContext, useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import "./Tasks.css";
import useTasks from "../../components/hooks/useTasks";
import { PuffLoader } from "react-spinners";
import { TaskCard } from "../../components/TaskCard/TaskCard";
import UserDetailContext from "../../context/userDetailContext";
import { useNavigate } from "react-router-dom";
import { replace } from "lodash";

export const Tasks = () => {
  const { data, isError, isLoading } = useTasks();
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  const {
    userDetails: { myTasks },
  } = useContext(UserDetailContext);

  useEffect(() => {}, [myTasks]); //whenever my task array changes, rerender the ui

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {data && data.length > 0 ? (
            data
              ?.filter((task) => myTasks?.includes(task?.id)) //display only those tasks created by current user
              .filter(
                (task) =>
                  task?.title.toLowerCase().includes(filter.toLowerCase()) ||
                  task?.description.toLowerCase().includes(filter.toLowerCase())
              )
              .map((task, i) => <TaskCard task={task} key={task.id} />)
          ) : (
            <>
              <div className="secondaryText flexColCenter no-data">
                <div>
                  Eihter you don't have any Task added or there might be some
                  issue while refreshing, please go to home and come again
                </div>
                <div className="flexCenter">
                  <button
                    className="button"
                    onClick={() => navigate("/add-task")}
                  >
                    {" "}
                    Add Task
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
