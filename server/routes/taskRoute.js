import express from 'express'
import jwtCheck from '../config/auth0Config.js';
import { createTask,getAllTasks,getTask,updateTask,deleteTask,getTaskIDs } from '../controllers/taskController.js';
const router=express.Router()

router.post("/create",jwtCheck,createTask)
router.post("/alltask",jwtCheck, getAllTasks)
router.post("/task-ids",jwtCheck,getTaskIDs)
router.get("/:id",jwtCheck,getTask)
router.put("/:id",jwtCheck,updateTask)
router.delete("/:id",jwtCheck,deleteTask)

export {router as taskRoute};