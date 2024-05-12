import React, { useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { PuffLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import useTasks from "../../components/hooks/useTasks";
import { TaskCard } from "../../components/TaskCard/TaskCard";

export const HeroSearch = () => {
  const { data, isError, isLoading } = useTasks();
  const {searchfilter}=useParams()
  const [filter, setFilter] = useState(searchfilter);
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

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
            data.filter((task) =>
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
