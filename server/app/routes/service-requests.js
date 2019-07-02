// externals
const router = require('express').Router()
const passport = require('passport')

// internal includes
const spController = require('../controllers/service-requests')




// make a new one,
router.post('/', passport.authenticate('service-provider-jwt', { session: false }), spController.save)


// make a service request offer if service provider
router.post('/id:/offer', passport.authenticate('service-provider-jwt', { session: false }), spController.make_offer)


// get a service request offers 
router.post('/id:/offers', passport.authenticate('users-jwt', { session: false }), spController.get_offers)


// delete 
router.delete('/id:', passport.authenticate('users-jwt', { session: false }), spController.delete)

// get details 
router.get('/id:', spController.details)


// chose service provider for a request -- done by the request maker
router.post('/id:/choose-provider', passport.authenticate('users-jwt', { session: false }), spController.choose_provider)


// service provider to reject a request
router.post('/id:/reject', passport.authenticate('service-provider-jwt', { session: false }), spController.reject)


// service provider to accept a request
router.post('/id:/accept', passport.authenticate('service-provider-jwt', { session: false }), spController.accept)


// add request rating after its done
router.post('/id:/rate', passport.authenticate('users-jwt', { session: false }), spController.rate)



// export our routes
module.exports = router