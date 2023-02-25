const express = require("express")
const app = express()
const {dataOutput} = require("../db/data")
dataOutput()
const PORT = 3000
const showRoutes = require("../Routes/shows")
const userRouter = require("../Routes/users")

app.use("/shows", showRoutes)
app.use("/users",userRouter)

app.listen(PORT, ()=> console.log(`Server listening to port ${PORT}`))