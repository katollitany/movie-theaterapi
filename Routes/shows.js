// import router and then inovoke it . Routers groups info together essentially e.g. everything show based is in here
const {Router} = require("express")
const showRoutes = Router()

// imoport the model which sets the structure of model input data and bring in sequelize
const {Shows} = require("../Models/shows")

// the invoked router is reading all the model data
showRoutes.get("/", async (req,res) => {
    const allShows = await Shows.findAll()
    res.send(allShows)
})
// getting show via genre and checks the genre after the quesiotn mark in the URL/ places the genre after the question mark in the URL
showRoutes.get("/catergory", async (req,res) => {
    // req query is post quesiton mark
    const {genre} = req.query
    // finding all shows where the genre matches what im looking for
    const genreShows = await Shows.findAll({where:{ genre:genre}})
    // this if stsament makes sure at least one show with the right genre is sent to the server else send 404 and else message
    if (genreShows.length > 0){
        res.send(genreShows)

    }else{
        res.status(404).send("Could not find show")
    }


})



// getting all shows via id 
showRoutes.get("/:id", async (req,res) => {
    // "prams" = paramater, which is the endpoint of the URL
    let {id} = req.params
    id = Number(id)
    const show = await Shows.findByPk(id)

    // checking the full length of the shows array and making sure the id number is there. if the param id is greater than the length of the shows array send 404 and message
    if(show){
        res.send(show)
    }else{
        res.status(404).send("Could not find show")
    }

})

module.exports = showRoutes