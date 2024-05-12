import React, { useContext, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { PuffLoader } from "react-spinners";
import "../Tasks/Tasks.css"
import UserDetailContext from "../../context/userDetailContext";
import useTasks from "../../components/hooks/useTasks";
import { TaskCard } from "../../components/TaskCard/TaskCard";
import { useNavigate } from "react-router-dom";

export const Favourites = () => {
  const { data, isError, isLoading } = useTasks();
  const {userDetails:{favourites}}=useContext(UserDetailContext)
  const [filter, setFilter] = useState("");
  const navigate=useNavigate();
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {   //show puffloader until favourites tasks are fetched
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
            
            //if there are tasks marked as favourites then only shoe tasks
           data && data.length > 0 ?( data
              ?.filter((task) =>
                favourites?.includes(task.id)  //if data from database include task marked as favourites
              )
              .filter(
                (task) =>
                  task.title.toLowerCase().includes(filter.toLowerCase()) ||  //filter based on title and description
                  task.description.toLowerCase().includes(filter.toLowerCase())
                  
              )
              .map((task, i) => (
                <TaskCard task={task} key={i} />   //display card with specific id
              )))
              :(
                  //if don't have any favourite ask
                  <div className="primaryText flexColCenter">
                    <div>Either You don't have any Favourite Task or there some problem with refresh, go to home page and try again </div>
                    <button className="button no-favourites" onClick={()=>navigate("/tasks")}> See All Tasks</button>
                  </div>
                
              )
          }
        </div>
      </div>
    </div>
  );
};
