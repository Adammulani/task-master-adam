import React, { useContext, useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import "./Tasks.css";
import useTasks from "../../components/hooks/useTasks";
import { PuffLoader } from "react-spinners";
import { TaskCard } from "../../components/TaskCard/TaskCard";
import UserDetailContext from "../../context/userDetailContext";

export const Tasks = () => {
  const { data, isError, isLoading } = useTasks();
  const [filter, setFilter] = useState("");
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  const{userDetails:{myTasks}}=useContext(UserDetailContext);

  useEffect(()=>{

  },[myTasks])


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
          {
            //data.map((card,i)=>(<PropertyCard card={card} key={i}/>))
            data?.filter((task) =>
              myTasks?.includes(task.id)
            ).filter((task) =>
                task.title.toLowerCase().includes(filter.toLowerCase()) ||
                task.description.toLowerCase().includes(filter.toLowerCase()) 
              ).map((task, i) => (
                <TaskCard task={task} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
};
