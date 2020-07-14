const express = require('express')
const router = express.Router()
const formidable = require('formidable')
// const sharp = require('sharp')
const permission = require('../middleware/auth')


// Get Stores
router.post('/api/dp/:store', permission, (req, res) => {

    // let file = req.body.name
    let store = req.params.store
    let form = new formidable(
        {
            multiples: true,
            uploadDir: `./stores/${store}/dp`
        }
    )

    // console.log(req.name)

    form.parse(req, (err, fields, files) => {
        if(err){
            next(err)
            return
        }
        // res.json({fields, files})
        console.log(files)
    })

    // let multi = Object.entries(file)

    // multi.map((data, i) => {
    //     console.log(data)
    // })

})

module.exports = router