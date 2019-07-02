// externals
const router = require('express').Router()
const passport = require('passport')

// internal includes
const spController = require('../controllers/service-requests')




// make a new one,
router.post('/', passport.authenticate('service-provider-jwt', { session: false }), spController.save)


// make a service request offer if service provider
router.post('/offer', passport.authenticate('service-provider-jwt', { session: false }), spController.make_offer)


// get a service request offers 
router.post('/offer', passport.authenticate('users-jwt', { session: false }), spController.get_offers)


// delete 
router.delete('/', passport.authenticate('users-jwt', { session: false }), spController.delete)


// chose service provider for a request -- done by the request maker
router.post('/choose-provider', passport.authenticate('users-jwt', { session: false }), spController.choose_provider)


// service provider to reject a request
router.post('/reject', passport.authenticate('service-provider-jwt', { session: false }), spController.reject)


// add request rating after its done
router.post('/rate', passport.authenticate('users-jwt', { session: false }), spController.rate)



// export our routes
module.exports = router