import { useForm } from "@mantine/form";
import React, { useContext, useEffect, useState } from "react";
import "./EditTask.css";
import { validateString } from "../../utils/common";
import { getTask, updateTask } from "../../utils/api";

import dayjs from "dayjs";
import {
  Box,
  Button,
  Group,
  NumberInput,
  Select,
  TextInput,
  Textarea,
  Popover,
  Modal,
} from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { DatePicker } from "@mantine/dates";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { DatePickerModal } from "../DatePickerModal/DatePickerModal";
import { useLocation, useNavigate } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import UserDetailContext from "../../context/userDetailContext";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useMyTaskIDs } from "../hooks/useMyTaskIDs";

export const EditTask = () => {
    const { pathname } = useLocation();
    const id = pathname.split("/").slice(-1)[0];
  const{userDetails:{token}}=useContext(UserDetailContext);


    const {
      data: task,
      isLoading:isLoadingTask,
      isError,
    } = useQuery(["task", id], () => getTask(id,token));
  const { user } = useAuth0();
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const [value, setValue] = useState(null);

  const navigate=useNavigate();
  const [taskDetails, setTaskDetails] = useState({
    title:  "",
    description: "",
    deadline:  "",
    status:  "",
  });
 

  useEffect(()=>{
    if(!isLoadingTask){
        form.setValues({
            title: task?.title,
            description:task?.description,
            deadline:task?.deadline,
            status:task?.status,
            
          })
    }

  },[isLoadingTask])

  const form = useForm({
    initialValues: {
        title: task?.title || "",
        description: task?.description || "",
        deadline: task?.deadline || "",
        status: task?.status || "",
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
    },
  });

  const { title, description, status } = form.values;
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setTaskDetails((prev) => ({
        title,
        description,
        status,
      }));
      mutate();
     
      
    }
  };


 
 
  const { refetch: refetchTasks } = useMyTaskIDs();

  //mutation function to add the new task to database
  const { mutate, isLoading } = useMutation({
    mutationFn:async () =>
     await updateTask(id,{
        
            title:title,
        description:description,
        deadline: !value ? task.deadline : dayjs(value).format("DD/MM/YYYY"),
        status:status,
        
        
      },token),
      onError:({response})=>toast.error(response.data.message,{position:"bottom-right"}),
      onSettled:()=>{
        toast.success("Updated Successfully", { position: "bottom-right" });
        setTaskDetails({
          title: "",
          description: "",
          deadline: "",
          status: "",
          userEmail: user?.email,
        });
        setValue(null)
        form.reset();

        refetchTasks();
      }
  });


  return (
    <div className="wrapper">
      <div className=" paddings innerWidth  ">
        
        <div className="paddings  from-container">
        <div className="primaryText task-header">
            <div className="task-header-text">
                Edit Task Details
            </div>
        </div>
          <Box maw="100%" mx="md" my="md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="addTaskForm"
            >
              <TextInput
                withAsterisk
                label="Title"
                
                {...form.getInputProps("title")}
              />
              

              <Textarea
                placeholder="Description"
                label="Task Description"
                withAsterisk
                {...form.getInputProps("description")}
              />
              
              <div className="flexStart" style={{ gap: "1rem" }}>
                <div
                  
                  className="button deadline-button"
                  onClick={() => {
                    validateLogin() && setModalOpened(true);
                  }}
                >
                  Change Deadline
                </div>
                <div className="secondaryText deadline-text">
                  {!value
                    ? task?.deadline
                    : dayjs(value).format("DD/MM/YYYY")}
                </div>
              </div>
              <DatePickerModal
                opened={modalOpened}
                setOpened={setModalOpened}
                value={value}
                setValue={setValue}
              />

              <Select
                withAsterisk
                data={[
                  { value: "Pending", label: "Pending" },
                  { value: "Completed", label: "Completed" },
                ]}
                label="Status"
                {...form.getInputProps("status")}
              />

              <Group position="center" mt="xl">
                <Button variant="default" onClick={()=>navigate(-1)}>Back</Button>
                <Button type="submit"> Update</Button>
              </Group>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};
