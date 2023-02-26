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
        "title": "King of Queens",
        "genre": "Drama",
        "rating": 5,
        "status": "on-going"
        },
        {
        "title": "X-Files",
        "genre": "Sitcom",
        "rating": 0,
        "status": "on-going"
        },
        {
        "title": "The Office",
        "genre": "Comedy",
        "rating": 1,
        "status": "on-going"
        },
        {
        "title": "American Horror Story",
        "genre": "Sitcom",
        "rating": 5,
        "status": "on-going"
        },
        {
        "title": "House",
        "genre": "Comedy",
        "rating": 0,
        "status": "on-going"
        },
        {
        "title": "The Punisher",
        "genre": "Drama",
        "rating": 5,
        "status": "on-going"
        },
        {
        "title": "Squid Games",
        "genre": "Comedy",
        "rating": 0,
        "status": "on-going"
        },
        {
        "title": "Avatar",
        "genre": "Comedy",
        "rating": 1,
        "status": "on-going"
        },
        {
        "title": "Demon Slayer",
        "genre": "Sitcom",
        "rating": 5,
        "status": "cancelled"
        },
        {
        "title": "Jujutsu Kaisen",
        "genre": "Horror",
        "rating": 0,
        "status": "cancelled"
        },
        {
        "title": "Queens Gambit",
        "genre": "Drama",
        "rating": 0,
        "status": "cancelled"
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
    firstUser.addShow(4)
    firstUser.addShow(8)
    secondUser.addShow(1)
    secondUser.addShow(6)
    secondUser.addShow(9)
    thirdUser.addShow(5)
    thirdUser.addShow(7)
    thirdUser.addShow(10)
    fourthUser.addShow(2)
    fourthUser.addShow(11)
    fourthUser.addShow(8)
}

module.exports={dataOutput}