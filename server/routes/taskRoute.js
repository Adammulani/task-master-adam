import express from 'express'
import jwtCheck from '../config/auth0Config.js';
import { createTask,getAllTasks,getTask,updateTask,deleteTask,getTaskIDs } from '../controllers/taskController.js';
const router=express.Router()

router.post("/create",jwtCheck,createTask)
router.post("/alltask",getAllTasks)
router.post("/task-ids",jwtCheck,getTaskIDs)
router.get("/:id",getTask)
router.put("/:id",updateTask)
router.delete("/:id",deleteTask)

export {router as taskRoute};