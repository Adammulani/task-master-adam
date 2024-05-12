import { useForm } from "@mantine/form";
import React, { useContext, useState } from "react";
import "./AddNewTask.css";
import { validateString } from "../../utils/common";
import { createTask } from "../../utils/api";

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
import { useAuthCheck } from "../hooks/useAuthCheck";
import { DatePickerModal } from "../DatePickerModal/DatePickerModal";
import { useNavigate } from "react-router-dom";
import UserDetailContext from "../../context/userDetailContext";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useMyTaskIDs } from "../hooks/useMyTaskIDs";

export const AddNewTask = () => {
  const { user } = useAuth0();
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const [value, setValue] = useState(null);


  const navigate=useNavigate();
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "",
    userEmail: user?.email,
  });
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);

  const form = useForm({
    initialValues: {
      title: taskDetails.title,
      description: taskDetails.description,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
    },
  });

  const { title, description, status } = form.values;
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors  && validateLogin()) {
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
     await createTask({
        title:title,
        description:description,
        deadline: dayjs(value).format("DD/MM/YYYY"),
        status:status,
        userEmail:user?.email,
      },token),
      onError:({response})=>toast.error(response.data.message,{position:"bottom-right"}),
      onSettled:()=>{
        toast.success("Task Added Successfully",{position:"top-right"});
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
                Add New Task
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
                placeholder="Enter title"
                value={taskDetails?.title}
                {...form.getInputProps("title")}
              />

              <Textarea
                placeholder="Description"
                label="Task Description"
                value={taskDetails?.description}
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
                  Task Deadline
                </div>
                <div className="secondaryText deadline-text">
                  {!value
                    ? "Choose a Deadline"
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
                value={taskDetails?.status}
                {...form.getInputProps("status")}
              />

              <Group position="center" mt="xl">
                <Button variant="default" onClick={()=>navigate(-1)}>Back</Button>
                <Button type="submit">Add New Task</Button>
              </Group>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};
