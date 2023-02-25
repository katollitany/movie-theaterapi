// importing sequelize from connectin folder
const {sequelize} = require("./connection")

// importing models so I can add the data to it
const {Shows} = require("../Models/shows")
const {User} = require("../Models/users")


// // making a link (assosciation) between shows and users model table. inserts an extra coloumn called userid 
User.hasMany(Shows)
Shows.belongsTo(User)

// have to do ths so when updating the table it gets dropped then readded with the new info 
const dataOutput = async () => {
    await sequelize.sync({
        force: true
    })
    
    await User.bulkCreate([
        {
            username:"Litany",
            password:"test123"
        },
        {
            username: "Teddy",
            password: "test678"
        },
        {
            username: "Brian",
            password: "123people"
        },
        {
            username: "Ben",
            password: "098qwerty"
        }
    ]);

    await Shows.bulkCreate([
        {
            title: "Office",
            genre: "Comedy",
            rating: 5,
            status: "Watched"
        },
        {
            title: "Queen's Gambit",
            genre: "Strategy",
            rating: 6,
            status: "On going"  
        },
        {
            title: "NCIS",
            genre: "Crime",
            rating: 5,
            status: "Unseen"
        },
        {
            title: "Abbott Elemetary",
            genre: "Comedy",
            rating: 10,
            status: "Watched"
        }
    ])


    const firstUser = await User.findByPk(1)
    const secondUser = await User.findByPk(2)
    const thirdUser = await User.findByPk(3)
    const fourthUser = await User.findByPk(4)

    // // console.log( JSON.stringify(firstUser,null,2))
    // // console.log( JSON.stringify(secondUser,null,2))
    // // console.log( JSON.stringify(thirdUser,null,2))
    // // console.log( JSON.stringify(fourthUser,null,2))

    firstUser.addShow(3)
    firstUser.addShow(2)
    secondUser.addShow(1)
    // thirdUser.addShow(2)
    fourthUser.addShow(4)
}

module.exports={dataOutput}