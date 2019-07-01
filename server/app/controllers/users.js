// import external libraries
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/check')


// import internal libraries
const db = require('../config/database')
const AppVars = require('../config/vars')
const validators = require('../validators/users')
const utils = require('./utils')

// `username` varchar(50) not null unique,
// `passcode` varchar(190) not null,
// `email` varchar(90),
// `city` varchar(50),
// `verified` boolean default false,
// `joined_on` datetime default NOW(),
// `user_type` enum('SERVICE_PROVIDER', 'USER', 'ADMIN') not null,
// `is_company` boolean default false,


// create a user account
module.exports.save = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }

    // handle errors
    let errors = validationResult(req).formatWith(validators.errorFormatter)
    if (!errors.isEmpty()) {
        response.errors = errors.array()
        return res.json(response)
    }

    // handle adding data to the database
    let query = 'insert into users ( phone, passcode, email ) values( ?, ?, ? )'

    let { password, phone, email } = req.body
    let passwordHash = bcrypt.hashSync(password, 10)

    let [result] = await db.execute(query, [phone, passwordHash, email])

    if (result.affectedRows == 1) {
        response.saved = true
        response.id = result.insertId
    }

    res.json(response)
}


// update user profile on whether they are a company, service provider 
module.exports.user_to_service_provider = async function(req, res) {
    let response = { updated: false }

    // handle errors
    let errors = validationResult(req).formatWith(validators.errorFormatter)
    if (!errors.isEmpty()) {
        response.errors = errors.array()
        return res.json(response)
    }

    let { id } = req.user
    let { name, city, is_company } = req.body

    let query = 'update users set name = ?, city = ?, is_company = ? where id = ?'
    let [result] = await db.execute(query, [name, city, is_company, id])

    if (result.affectedRows == 1) {
        response.updated = true
    }
    res.json(response)

}


// update user profile from being a service provider to a regular user
module.exports.service_provider_to_user = async function(req, res) {
    let response = { updated: false }

    let { id } = req.user

    if (req.user.user_type !== 'SERVICE_PROVIDER') {
        return response
    }

    let query = 'update users set user_type = ?, is_company = ? where id = ?'
    let [result] = await db.execute(query, ['USER', false, id])

    if (result.affectedRows == 1) {
        response.updated = true
    }
    res.json(response)

}

// to delete a user
module.exports.delete = async function(req, res) {
    let response = { deleted: false }
    let { id } = req.user

    let query = 'delete from users where id = ?'
    let [result] = await db.execute(query, [id])

    if (result.affectedRows == 1) {
        response.deleted = true
    }
    res.json(response)
}



// get user details
module.exports.get_details = async function(req, res) {
    let response = { user: {} }
    let { id } = req.params

    let userQuery = 'select * from users where id = ?'
    let [userResult] = await db.query(userQuery, [id])

    if (userResult && userResult[0]) {
        let { passcode, ...user } = userResult[0]
        response.user = user
    }
    res.json(response)

}


// get a users tips
module.exports.get_service_requests = async function(req, res) {
    let response = { requests: [] }
    let { id } = req.params

    let reqQuery = 'select * from service_requests where made_by = ? or service_provider = ?'
    let userQuery = 'select * from users where id = ?'

    let [reqResult] = await db.execute(reqQuery, [id, id])

    let service_requests = []
    for (const sreqIndex in sreqResult) {
        let srequest = sreqResult[sreqIndex]

        let made_by
        let service_provider

        if (req.user.id == srequest.made_by) {
            made_by = req.user
        } else {
            let [mdResult] = await db.query(userQuery, [srequest.made_by])
            made_by = mdResult[0] || {}
        }

        if (req.user.id == srequest.service_provider) {
            service_provider = req.user
        } else {
            let [mdResult] = await db.query(userQuery, [srequest.service_provider])
            service_provider = mdResult[0] || {}
        }

        let srequestt = { request, made_by, service_provider }
        service_requests.push(srequestt)
    }
    response.requests = requests

    res.json(response)
}


// log a user in
module.exports.login = async function(req, res) {
    let response = { token: null, user: {} }

    if (req.user && req.user.id) {

        let token_data = { id: req.user.id, timestamp: Date.now() }
        let token = jwt.sign({ data: token_data }, AppVars.jwt.secret)
        response.token = token
        response.user = req.user

    }
    res.json(response)
}