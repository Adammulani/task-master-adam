import express from 'express'
import jwtCheck from '../config/auth0Config.js';
import { createUser,getAllTasks,deleteTask, toFavTask,getAllFavouriteTasks} from '../controllers/usertController.js';


const router=express.Router()

router.post("/register",jwtCheck,createUser);
router.post("/all-tasks",jwtCheck,getAllTasks);

router.post("/toFavTask/:tid",jwtCheck,toFavTask);
router.post("/allFav",jwtCheck,getAllFavouriteTasks);
export {router as usertRoute};