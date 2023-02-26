// require router from express library and then inovoke it . Routers groups info together essentially e.g. everything show based is in here
const {Router} =require ("express")
const userRoutes = Router()

// imoport the model which sets the structure of model input data and bring in sequelize
const {User} = require("../Models/users")
const {Shows} = require("../Models/shows")




// the invoked router is reading all the model data
userRoutes.get("/", async (req,res) => {
    const allUsers = await User.findAll()
    res.send(allUsers)
})


// getting user via id
userRoutes.get("/:id", async (req,res) => {

    let {id} = req.params
    id = Number(id)
    const user = await User.findByPk(id) 

    if (user){
        res.send(user)
    }else {
        res.status(404).send("No user found")
    }
})

// The User Router should GET all the shows watched by a user using an endpoint.
// For example, /users/2/shows should return all the shows for the 2nd user.

userRoutes.get("/:id/shows", async (req,res)=> {

    let id = req.params.id
    id = Number(id)
    const allShows = await Shows.findAll({where:{ 
        UserId:id,
        status: "Watched"
    }})
    res.send(allShows)
})


// The User Router should update and add a show if a user has watched it using an endpoint.
// For example, a PUT request to  /users/2/shows/9 should update the 9th show for the 2nd user.

userRoutes.put("/:id/shows/:showId", async (req,res)=>{
    let {id, showId} = req.params
    id = Number(id)
    showId = Number(showId)
    
    const watchedShow = await Shows.findOne({where:{ 
        id:showId,
        UserId:id,
        status: "on-going"
    }})

    if (watchedShow){

        await watchedShow.update({
            title: "upShaws", 
            genre: "Comedy",
            rating: 8,
            status: "Unseen"
        })
        res.send(watchedShow)
    }else{
        res.status(404).send("No watched show found")
    
    }
})



module.exports = userRoutes