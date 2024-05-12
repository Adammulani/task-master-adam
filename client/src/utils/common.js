export const sliderSettings={
    slidesPerView:1,
    spaceBetween:50,
    breakpoints:{
        480:{
            slidesPerView:1
        },
        600:{
            slidesPerView:2
        },
        750:{
            slidesPerView:3
        },
        1100:{
             slidesPerView:4
        }
    }
}

//add or remove to or from favourites
export const updateFavourites=(id,favourites)=>{
    if(favourites?.includes(id)){
        return favourites.filter((resId)=>resId!==id)
    }
    else{
        return [...favourites,id]
    }
}

export const checkFavourites=(id,favourites)=>{
    return (favourites?.includes(id))? "#fa3e5f" : "#6c757d";
}

export const validateString=(value)=>{
    return value?.length<3 || value===null ? "must have atleast 3 characters" : null;
}

export const updateMyTasks=(id,myTasks)=>{
    
    if(myTasks?.includes(id)){
        return myTasks.filter((resId)=>resId!==id)
    }
    
}