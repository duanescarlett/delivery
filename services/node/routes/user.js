const fs = require('fs')
const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(process.env.Secret_API_KEY)
const redis_con = require('../db/redis_con')
const permission = require('../middleware/auth')
const user = require('../middleware/user')
const manager = require('../middleware/manager')
const employee = require('../middleware/employee')
const admin = require('../middleware/admin')

// function shash(word){
//     // Make a hash of the password
//     let hash = crypto
//         .createHash('sha256')
//         .update(word)
//         .digest('hex')
//     return hash
// }

router.get('/', (req, res) => {
    res.json([
        "Welcome to the Delivery API"
    ])
})

// User Login
router.post('/api/login', (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    // Create the token for the session
    let token = jwt.sign({
        user: email
    }, process.env.JWT_KEY, {
        expiresIn: "24h"
    })

    // If user exist create a session ID
    redis_con.get(email)
    .then(data => {
        console.log("The ID => " + data)
        if(data === null) res.json({error: "The username was not found"})

        // Add session token to datastore
        redis_con.client.hmset(data, [
            'token', token
        ], (err, reply) => {
            if(err){
                res.status(401).send({error: 'This username does not exist'})
            }
            else{
                // Now get the hash
                redis_con.hgetall(data)
                .then(data => {
                    // password = shash(password)
                    if(password === data.password){
                        redis_con.client.set('cache', data['type'], 
                        (err, reply) => {
                            if(err){
                                res.status(422).json({error: err})
                            }
                            else{
                                delete data.password
                                res.json({sessionToken: data['token'], userType: data['type']})
                            }
                        })
                    } 
                    else{
                        res.json({error: "The password did not match"})
                    }
                })
                .catch(err => {
                    res.json({error: err})
                })
            }
        })
    })
    .catch(err => {
        res.json({error: err})
    })
})

// Get Users
router.post('/api/users', (req, res, next) => {
    let list = []
    redis_con.lrange('users')
    .then(data => {
        // Iterate the list and find each restaurant obj
        data.forEach(element => {
            list.push(element)
        })
        res.json({users: list}) 
    })
    .catch(err => {
        res.json({error: err})
    })
})

// Add user
router.post('/api/users/add', (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let type = req.body.type
    
    let hash = shash(password)
    let num = Math.floor(Math.random() * 10000000000)
    let timestamp = Date.now()

    let token = jwt.sign({
        email: email
    }, process.env.JWT_KEY, {
        expiresIn: "24h"
    })

    redis_con.get(email)
    .then(data => {
        if(data !== null){
            res.json({
                error: "This email already exist.",
                data: data
            })
        } 
        else {
            // Create the hash
            redis_con.client.hmset(num, [
                'email', email,
                'password', hash,
                'type', type,
                'timestamp', timestamp,
                'verified', false,
                'token', token
            ], (err, reply) => {
                if(err){
                    res.status(422).send('A user already has the email ' + email + '.')
                }
                else{
                    // Create the set
                    redis_con.client.set(email, num)
                    // Create a list
                    redis_con.client.lpush('users', email)
                    console.log("User Added..." + reply)
                    // let cusRes // Store customer create res from stripe
                    stripe.customers.create({
                        description: 'Delapp Customer',
                        email: email,
                        metadata: {
                            email: email,
                            type: type
                        }
                    },
                    (err, customer) => {
                        // asynchronously called
                        // Update user
                        if(err){
                            res.json({
                                Therror: err
                            })
                            res.end(err)
                        }
                        else{
                            redis_con.client.hmset(num, [
                                'stripeID', customer['id']
                            ], (err, reply) => {
                                if(err){
                                    res.status(422).send('This user was not updated')
                                    // console.log(err)
                                }
                            })                                
                        }
                        // if(err){
                        //     res.json({Terror: err})
                        // }
                    })
                    res.json({
                        sessionToken: token,
                        user_type: type
                    })
                }
            })
        }
    })
    .catch(err => {
        res.json({error: err})
    })
})

// Logout
router.post('/api/logout', permission, (req, res) => {
    let username = req.body.username

    redis_con.get(username)
    .then(data => {
        if(data === null) res.json({error: "The username was not found"})
        console.log("logout data => " + data)
        // Create the hash
        redis_con.client.hmset(data, [
            'token', 'null'
        ], (err, reply) => {
            if(err){
                res.status(422).json({
                    "error" : "You are not authorized to log this user out."
                })
                console.log(err)
            }
            else{
                redis_con.client.set('cache', 'none', 
                    (err, reply) => {
                        if(err){
                            res.status(422).json({error: err})
                        }
                        else{
                            res.json({reply: 'signed out'})
                        }
                })
            }
        })
    })
    .catch(err => {
        res.json({error: err})
    })
})

// Get filtered user info
router.post('/api/user/filter', (req, res) => {
    let filter = req.body.filter
    redis_con.get(req.body.username)
    .then(data => {
        console.log(data)
        // Now get the hash
        redis_con.hgetall(data)
        .then(data => {
            res.json(data[filter])
        })
        .catch(err => {
            res.json({error: err})
        })
    })
    .catch(err => {
        res.json({error: err})
    })
})

// Get user info
router.get('/api/username/get/:username', permission, user, (req, res) => {
    redis_con.get(req.params.username)
    .then(data => {
        console.log(data)
        // Now get the hash
        redis_con.hgetall(data)
        .then(data => {
            delete data.password
            res.json(data)
        })
        .catch(err => {
            res.json({error: err})
        })
    })
})

// Get filtered user info
router.post('/api/business/get/:name', (req, res) => {
    redis_con.get(req.params.name)
    .then(data => {
        console.log(data)
        // Now get the hash
        redis_con.hgetall(data)
        .then(data => {
            delete data.password
            res.json(data)
        })
        .catch(err => {
            res.json({error: err})
        })
    })
})

// Get Filtered business Info.
router.post('/api/user/info', permission, (req, res) => {
    let username = req.body.username
    let field = req.body.field

    redis_con.get(username)
    .then(id => {
        if(id){
            redis_con.hgetall(id)
            .then(data => {
                res.json({field: data[field]})
            })
            .catch(error => {
                res.json({error: 'This user does not exist ' + error})         
            })
        }
        else{
            res.json({
                error: "This username does not exist.",
                data: id
            })
        }
    })
})

// Request New Standard User
router.post('/api/requestNewUser/:token', (req, res) => {

    let decoded = jwt.verify(req.params.token, process.env.JWT_KEY)

    // let params = req.params
    console.log(decoded)

    // If user exist create a session ID
    redis_con.get(decoded.user)
    .then(data => {
        if(data === null) res.json({error: "The username was not found"})

        // Verify user
        redis_con.client.hmset(data, [
            'verified', true
        ], (err, reply) => {
            if(err){
                res.status(422).send('This user status is not verified')
                console.log(err)
            }
            else{
                res.json({
                    success: 'User is now verified'
                })
            }
        })
    })
    .catch(err => {
        res.json({error: err})
    })
})

// Update User
router.post('/api/update/user', permission, (req, res) => {

    let username = req.body.username
    let field = req.body.field
    let data = req.body.data

    redis_con.get(username)
    .then(id => {
        if(id === null) res.json({error: 'This username does not exist'})
        
        // Update user
        redis_con.client.hmset(id, [
            field, data
        ], (err, reply) => {
            if(err){
                res.status(422).json({error: 'This user was not updated'})
                console.log(err)
            }
            else{
                res.json({
                    success: 'User has been updated'
                })
            }
       })
    })
    .catch(err => {
        res.json({error: err})
    })
})

// Delete User
router.delete('/api/user/delete/:username', permission, (req, res, next) => {
    let name = req.params.username
    redis_con.get(name)
    .then(data => {
        redis_con.client.del(data)
        redis_con.client.del(req.params.id)        
    })
    .then(data => {
        redis_con.client.lrem('users', -1, name)
        res.json({success: 'This user has been removed'})
    })
    .catch(error => {
        console.log(error)
        res.json({error : 'This user does not exist'})
        .end()
    })
})

// Get business 
router.get('/api/business', (req, res, next) => {
    let list = []
    redis_con.lrange('business')
    .then(data => {
        // Iterate the list and find each restaurant obj
        data.forEach(element => {
            list.push(element)
        })
        res.json({businesses: list})
    })
    .catch(err => {
        res.json({error: err})
    })
})

// Get business based on param
router.post('/api/business/batch', (req, res, next) => {
    let type = req.body.data
    let list = []

    redis_con.lrange(type)
    .then(data => {
        // Iterate the list and find each restaurant obj
        data.forEach(element => {
            list.push(element)
        })
        res.json(Object.values(list))
    })
    .catch(err => {
        res.status(422).json({error3: err})
    })
})

// Get list of stores registered by user *
router.get('/api/business/user', permission, (req, res, next) => {
    let list = []

    let base64 = req.headers.authorization.split(" ")[1]
    let decoded = jwt.verify(base64, process.env.JWT_KEY)
    // console.log(decoded)
    let user = JSON.stringify(decoded.user)
    redis_con.lrange(user)
    .then(data => {
        // Iterate the list and find each restaurant obj
        data.forEach(element => {
            // console.log(element)
            list.push(element)
        })
        console.log(list)
        res.json(Object.values(list))
    })
    .catch(err => {
        res.status(422).json({error3: err})
    })
})

// Get Filtered business Info.
router.post('/api/business/info', permission, (req, res) => {
    let name = req.body.name
    let field = req.body.field

    redis_con.get(name)
    .then(id => {
        if(id){
            redis_con.hgetall(id)
            .then(data => {
                res.json({field: data[field]})
            })
            .catch(err => {
                res.json({error: 'This restaurant does not exist ' + err})
            })
        }
        else{
            res.json({
                error: "This restaurant does not exist."
            })  
        }        
    })
    .catch(err => {
        res.json({error: err})
    })
})

// Get business data
router.get('/api/business/:name', (req, res) => {
    redis_con.get(req.params.name)
    .then(data => {
        // console.log(data)
        // Now get the hash
        redis_con.hgetall(data)
        .then(data => {
            res.json({bus: Object.entries(data)})
        })
        .catch(err => {
            res.json({error: err})
        })
    })
})

// Add business
router.post('/api/business/add', permission, (req, res) => {
    let name = req.body.name
    let manager = req.body.manager
    let type = req.body.type
    let buildingNum = req.body.buildingNum
    let street = req.body.street
    let city = req.body.city
    let state = req.body.state
    let zip = req.body.zip
    let gps = req.body.gps

    let base64 = req.headers.authorization.split(" ")[1]
    let decoded = jwt.verify(base64, process.env.JWT_KEY)

    // console.log(decoded)
    let user = JSON.stringify(decoded.user)
    // console.log(user)

    let num = Math.floor(Math.random() * 1000000000)
    redis_con.get(name)
    .then(data => {
        if(data !== null){
            res.json({
                error: "This business already exist.",
                data: data
            })            
        }
        else {
            redis_con.client.hmset(num, [
                "name", name,
                "manager", manager,
                "buildingNum", buildingNum,
                "street", street,
                "city", city,
                "state", state,
                "zip", zip,
                "gps", gps,
                "type", type,
                "user", user
            ], (err, reply) => {
                if(err){
                    res.status(422).send(err)
                }
                else{
                    // Create the directories
                    var dir = `./stores/${name}/dp`
                    if (!fs.existsSync(dir)){
                        fs.mkdirSync(dir, {recursive: true})
                    }
                    // Create the set
                    redis_con.client.set(name, num)
                    // Create a list for business type
                    redis_con.client.lpush(type, name)
                    // Create a general list of businesses
                    redis_con.client.lpush('business', name)
                    // Create a list of the users businesses
                    redis_con.client.lpush(user, name)
                    // Send response to client
                    res.json({
                        success: name + ' was added to the datastore ' + reply
                    })
                }
            })
        }
    })
    .catch(err => {
        res.json({error: err})
    })
})

// Update business
router.post('/api/business/update', permission, (req, res) => {
    let name = req.body.name
    let field = req.body.field
    let data = req.body.data

    redis_con.get(name)
    .then(id => {
        if(id === null) res.json({error: 'This restaurant does not exist.'})

        // Update restaurant
        redis_con.client.hmset(id, [
            field, data
        ], (err, reply) => {
            if(err){
                res.status(422).send('This restaurant was not updated')
                console.log(err)
            }
            else{
                res.json({
                    success: name + ' has been updated to ' + data
                })
            }
        })
    })
    .catch(err => {
        res.json({error: err})
    })
})

// Delete business
router.delete('/api/business/delete/:name', permission, (req, res) => {
    let name = req.params.name
    redis_con.get(name)
    .then(data => {
        redis_con.client.del(data)
        // redis_con.client.del(name)
        // res.json({success: 'This restaurant has been removed'})
    })   
    .then(data => {
        redis_con.client.lrem('restaurants', -1, name)
        res.json({success: 'This restaurant has been removed'})
    }) 
    .catch(error => {
        res.status(422).send({error: 'This restaurant was not found'})
    })
})

module.exports = router