// externals


// internals
const db = require('../config/database')




// make a new one,
module.exports.save = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }

    // handle errors
    // let errors = validationResult(req).formatWith(validators.errorFormatter)
    // if (!errors.isEmpty()) {
    //     response.errors = errors.array()
    //     return res.json(response)
    // }

    // handle adding data to the database
    let query = 'insert into service_requests ( made_by, service, description ) values( ?, ?, ? )'

    let made_by = req.user.id
    let { service, description } = req.body

    let [result] = await db.execute(query, [made_by, service, description])

    if (result.affectedRows == 1) {
        response.saved = true
        response.id = result.insertId
    }

    res.json(response)
}


// make a service request offer if service provider
module.exports.make_offer = async function(req, res) {
    let response = { updated: false, errors: [] }
    let { id } = req.params


    // handle adding data to the database
    let query = 'insert into request_offers (service_provider, description, service_request) values(?, ?, ?)'

    let service_provider = req.user.id
    let { description } = req.body

    let [result] = await db.execute(query, [service_provider, description, id])

    if (result.affectedRows == 1) {
        response.updated = true
    }

    res.json(response)
}



// get a service request offers 
module.exports.get_offers = async function(req, res) {
    let response = { offers: [] }

    // handle adding data to the database
    let query = 'select * from request_offers where service_request = ?'
    let providerQuery = 'select * from users where id = ?'

    let [result] = await db.execute(query, [id])

    if (result && result.length) {
        response.offers = result

        let offers = []
        for (let counter = 0; counter < result.length; counter++) {
            let offerr = result[0]
            let provider = {}

            let [service_provider_result] = db.execute(providerQuery, [offerr.service_provider])

            if (service_provider_result && service_provider_result[0]) {
                let { passcode, ...providr } = service_provider_result[0]
                let provider = providr
            }

            let offer = { offer: offerr, service_provider: provider }
            offers.push(offer)
        }
        response.offers = offers

    }

    res.json(response)
}


// delete 
module.exports.delete = async function(req, res) {
    let response = { deleted: false }
    let { id } = req.params

    // handle adding data to the database
    let query = 'delete from service_requests where id = ? and made_by = ?'

    let made_by = req.user.id

    let [result] = await db.execute(query, [id, made_by])

    if (result.affectedRows == 1) {
        response.deleted = true
    }

    res.json(response)
}



// chose service provider for a request -- done by the request maker
module.exports.choose_provider = async function(req, res) {
    let response = { updated: false, errors: [] }
    let { id } = req.params


    // handle adding data to the database
    let query = 'update service_requests set service_provider = ? where id = ? and made_by = ?'

    let made_by = req.user.id
    let { service_provider } = req.body

    let [result] = await db.execute(query, [service_provider, id, made_by])

    if (result.affectedRows == 1) {
        response.updated = true
    }

    res.json(response)
}



// service provider to reject a request
module.exports.reject = async function(req, res) {
    let response = { updated: false, errors: [] }
    let { id } = req.params


    // handle adding data to the database
    let query = 'update service_requests set is_accepted = ? where id = ? and service_provider = ?'

    let service_provider = req.user.id

    let [result] = await db.execute(query, [false, id, service_provider])

    if (result.affectedRows == 1) {
        response.updated = true
    }

    res.json(response)
}


// service provider to accept a request
module.exports.accept = async function(req, res) {
    let response = { updated: false, errors: [] }
    let { id } = req.params


    // handle adding data to the database
    let query = 'update service_requests set is_accepted = ? where id = ? and service_provider = ?'

    let service_provider = req.user.id

    let [result] = await db.execute(query, [false, id, service_provider])

    if (result.affectedRows == 1) {
        response.updated = true
    }

    res.json(response)
}



// add request rating after its done
module.exports.rate = async function(req, res) {
    let response = { updated: false, errors: [] }
    let { id } = req.params


    // handle adding data to the database
    let query = 'update service_requests set rating = ? where id = ? and made_by = ?'

    let made_by = req.user.id

    let [result] = await db.execute(query, [false, id, made_by])

    if (result.affectedRows == 1) {
        response.updated = true
    }

    res.json(response)
}