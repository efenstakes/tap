// import external libraries
const router = require('express').Router()
const passport = require('passport')

// import internal libraries
const userController = require('../controllers/users')
var validators = require('../validators/users')


/**
 * @api {post} / Create a user Account
 * @apiVersion 1.0.0
 * @apiName Create Account
 * @apiGroup User
 * @apiDescription  Create a User Account
 *  
 * @apiParam (Request body) {String} username The user name
 * @apiParam (Request body) {String} password The user password
 * @apiParam (Request body) {String} confirmationPassword user confirmationPassword
 * @apiParam (Request body) {String} city The Users city
 * @apiParam (Request body) {String} user_type The user type 
 *
 * @apiExample {js} Example usage:
 * const data = {
 *    "name": "kimmy wesley",
 *    "password": "password",
 *    "confirmationPassword": "confirmationPassword",
 *    "email": "email@email.com",
 *    "city": "Cairo",
 *    "type": "REGULAR | ADMIN | SUPER_ADMIN"
 * }
 *
 * $http.post(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 201) {Boolean} saved Boolean to determine if user was saved successfully
 * @apiSuccess (Success 201) {String} id The id of the saved user (id they were saved)
 * @apiSuccess (Success 201) {List} errors list of errors that were found with the data (if any) 
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 201 OK
 *     {
 *      "saved": true|false,
 *      "id": "id",
 *       "errors": []
 *    }
 *
 * @apiUse UnauthorizedError
 */
router.post('/', validators.registr, userController.save)


// make a user to be a service provider
router.post('/to-service-provider', [validators.service_provider, passport.authenticate('users-jwt', { session: false })], userController.user_to_service_provider)

// make a service provider to be a user
router.post('/to-service-provider', passport.authenticate('users-jwt', { session: false }), userController.service_provider_to_user)




/**
 * @api {delete} / Delete a User Account 
 * @apiVersion 1.0.0
 * @apiName Delete Account
 * @apiGroup User
 * @apiPermission authenticated user
 * @apiDescription  Delete a User Account 
 *
 * @apiExample {js} Example usage:
 * const data = {
 * }
 *
 * $http.defaults.headers.common["Authorization"] = token;
 * $http.delete(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 201) {Boolean} Boolean to determine if user was deleted successfully
 * @apiSuccessExample {json} Success response:
 *     HTTPS 201 OK
 *     {
 *      "deleted": true|false
 *    }
 *
 * @apiUse UnauthorizedError
 */
router.delete('/', passport.authenticate('users-jwt', { session: false }), userController.delete)



/**
 * @api {put} / update a user Account
 * @apiVersion 1.0.0
 * @apiName Update Account
 * @apiGroup User
 * @apiDescription  Create a User Account
 *  
 * @apiParam (Request body) {String} username The user name
 * @apiParam (Request body) {String} city The Users city
 * @apiParam (Request body) {String} email The Users email
 * @apiParam (Request body) {String} user_type The user type 
 *
 * @apiExample {js} Example usage:
 * const data = {
 *    "name": "kimmy wesley",
 *    "email": "email@email.com",
 *    "city": "Cairo",
 *    "type": "REGULAR | ADMIN | SUPER_ADMIN"
 * }
 *
 * $http.defaults.headers.common["Authorization"] = token;
 * $http.post(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 201) {Boolean} saved Boolean to determine if user was saved successfully
 * @apiSuccess (Success 201) {String} id The id of the saved user (id they were saved)
 * @apiSuccess (Success 201) {List} errors list of errors that were found with the data (if any) 
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 201 OK
 *     {
 *      "saved": true|false,
 *      "id": "id",
 *       "errors": []
 *    }
 *
 * @apiUse UnauthorizedError
 */
// router.put('/', [
//         passport.authenticate('users-jwt', { session: false }),
//         validators.update
//     ],
//     userController.update)



/**
 * @api {post} /login  login a user 
 * @apiVersion 1.0.0
 * @apiName  login a user 
 * @apiGroup  User
 * @apiDescription  login a user 
 *
 * @apiExample {js} Example usage:
 * const data = {
 *    username: "ken", 
 *    password: "ken123"    
 * }
 *
 * $http.defaults.headers.common["Authorization"] = token;
 * $http.post(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 201) {String} String containing the authentication token
 * @apiSuccess (Success 201) {Object} Object containing the user details
 * @apiSuccessExample {json} Success response:
 *     HTTPS 201 OK
 *     {
 *      "token": "tokenstring",
 *      "user": {} 
 *    }
 *
 */
router.post('/login', passport.authenticate('users', { session: false }), userController.login)


/**
 * @api {get} /:id/ Get a user Details
 * @apiVersion 1.0.0
 * @apiName Get a user Details
 * @apiGroup User
 * @apiDescription Get a user Details
 *
 * @apiParam {Number} id the id of the user
 *
 * @apiExample {js} Example usage:
 * const data = {
 * }
 *
 * $http.get(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 201) {Object} user contain user details
 * @apiSuccessExample {json} Success response:
 *     HTTPS 201 OK
 *     {
 *      "user": {}
 *    }
 *
 */
router.get('/:id', userController.get_details)


router.post('/:id', passport.authenticate('users-jwt', { session: false }), userController.get_details)


/**
 * @api {get} /:id/ Get a user tips
 * @apiVersion 1.0.0
 * @apiName Get a user tips
 * @apiGroup User
 * @apiDescription Get a user tips
 *
 * @apiParam {Number} id the id of the user
 *
 * @apiExample {js} Example usage:
 * const data = {
 * }
 *
 * $http.get(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 201) {Object} tips contain user tip list
 * @apiSuccessExample {json} Success response:
 *     HTTPS 201 OK
 *     {
 *      "tips": []
 *    }
 *
 */
router.get('/:id/service-requests', passport.authenticate('users-jwt', { session: false }), userController.get_service_requests)





// export our routes
module.exports = router