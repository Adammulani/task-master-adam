import { Website } from "./pages/Website";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useState } from "react";
import { Layout } from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import {ReactQueryDevtools} from "react-query/devtools"
import "react-toastify/dist/ReactToastify.css"
import UserDetailContext from "./context/userDetailContext";
import { Favourites } from "./pages/Favourites/Favourites";
import { HeroSearch } from "./pages/HeroSearch/HeroSearch";
import { Tasks } from "./pages/Tasks/Tasks";
import { Task } from "./pages/Task/Task";
import { AddNewTask } from "./components/AddNewTask/AddNewTask";
import { EditTask } from "./components/EditTask/EditTask";
function App() {
  const queryClient=new QueryClient();

  const [userDetails,setUserDetails]=useState({
    favourites:[],
    myTasks:[],
    token:null
  })
  return (
    <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Website />} />
             
              <Route path="/add-task" element={<AddNewTask/>}/>
              <Route path="/edit-task/:id" element={<EditTask/>}/>

              <Route path="/favourites" element={<Favourites/>}/>
              <Route path="/herosearch/:searchfilter" element={<HeroSearch/>}/>
              <Route path="/tasks">
                     <Route index element={<Tasks/>}/>
                     <Route path=":taskId" element={<Task/>}/>
              </Route>

            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
