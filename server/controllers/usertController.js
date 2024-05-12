import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";


//create user/register user
export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");


  const { email } = req.body;

  try{
    const userExists = await prisma.usert.findUnique({ where: { email: email } }); // In usr collection it is finding a unique document where email matches

    if (!userExists) {
      //if user does not exist need to register
  
      const user = await prisma.usert.create({ data: req.body }); //created user document inside the user collection
      res.status(201).json({
        message: "User registered successfully",
        user: user,
      });
    } else {
     // res.status(400).json({ message: "User already registered" });
    }
  }
  catch(error){
    console.log(error);
    res.status(400).json({
        message:error.message,
    })
  }
 
});

//function to get all the tasks created by user
export const getAllTasks=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    try{
       const tasks=await prisma.usert.findUnique({
        where:{email},
        select:{taskCreated:true}    //only select taskCreated filed, not the whole document
       })
       res.status(200).send(tasks);
  
    }
    catch(error){
      throw new Error(error.message);
  
    }
  })


  //delete task

  export const deleteTask=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const {id}=req.params;
  
    try{
      //following line will return the taskCreated array
      const user=await prisma.usert.findUnique({
        where:{email},
        select:{taskCreated:true}
      })
 // console.log(user.taskCreated)
      //now get the index of id in the bookVisits array
      const index=user.taskCreated.findIndex((task)=>task.id===id)
  
      if(index===-1){
        res.status(404).json({message:"Task not found"})
      }
      else{
        user.taskCreated.splice(index,1)    //in user.taskCreated array whose index matches with that we have found delete that element, still no change in user collection
        await prisma.usert.update({
          where:{email},
          data:{
            taskCreated:user.taskCreated    //update it's bookVisits array with the updated instance of the bookVisits array
          }  
        })

        await prisma.task.delete({
            where: { id },
          });
        res.send("Task deleted successfully")
      }
      
  
    }
    catch(error){
      throw new Error(error.messag )
    }
  })
  

  //function to add a residency in a favourite list of a user
export const toFavTask=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const {tid}=req.params;
  
    try{
         const user=await prisma.usert.findUnique({
          where:{email}
         })
  
         if(user.favTasks.includes(tid)){
          const updateUser=await prisma.usert.update({
            where:{email},
            data:{
              favTasks:{
                set:user.favTasks.filter((id)=>id!==tid)
              }
            }
  
          })
          res.send({message:"Removed from favourites",user:updateUser})
         }
         else{
          const updateUser=await prisma.usert.update({
             where:{email},
             data:{
               favTasks:{
                push:tid
               }
             }
          })
          res.send({message:"updated favourites",user:updateUser})
         }
    }catch(error){
      throw new Error(error.message);
    }
  })
  

  //function to get  of all fav tasks
export const getAllFavouriteTasks=asyncHandler(async(req,res)=>{

    const {email}=req.body
  
    try{
      const allFavTasks=await prisma.usert.findUnique({
        where:{email:email},
        select:{favTasks:true}
      })
    
      res.status(200).send(allFavTasks)
    }
    catch(err){
      throw new Error(err.message)
    }
  })