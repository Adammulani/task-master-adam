import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//function to create task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, deadline, userEmail } = req.body.data;


  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        deadline,
        status,
        owner: { connect: { email: userEmail } }, //the userEmail we are receiving from payload, we are going to connect with our owner field, and owner field in return is connected with our user field, in the user collection
        //so the owner field will be connected with user collectionand will use email part as our sent email
      },
    });

    res.send({ message: " Task created successfully", task });
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to get all the taska
export const getAllTasks = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const tasks = await prisma.task.findMany({
      where: { userEmail: email },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.send(tasks);
  } catch (error) {
    console.log(error);
  }
});

//function to get a specific task by id
export const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id }, //or we can also write where:{id:id}
    });
    res.send(task);
  } catch (error) {
    throw new Error(error.message);
  }
});

//update a task by id

export const updateTask = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const { title, description,deadline, status} = req.body.data;
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        deadline,
      },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


//delete task by id
export const deleteTask=asyncHandler(async(req,res)=>{
    const taskId = req.params.id;
    try {
      await prisma.task.delete({
        where: { id: taskId },
      });
      res.send("Task deleted successfully")
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
})

//get only task ID's
export const getTaskIDs=asyncHandler(async(req,res)=>{

  const {email}=req.params;

  try{

    const tasks = await prisma.task.findMany({ where: { email }, select: { id: true } });
    const taskIds = tasks.map(task => task.id);
    res.json(taskIds);

  } catch (error) {
    console.error('Error fetching task IDs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
