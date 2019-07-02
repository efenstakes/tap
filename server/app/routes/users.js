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
 * @apiParam (Request body) {String} phone The user phone
 * @apiParam (Request body) {String} password The user password
 * @apiParam (Request body) {String} email user email
 *
 * @apiExample {js} Example usage:
 * const data = {
 *    "phone": "+25470978687",
 *    "email": "email@email.com",
 *    "password": "xxx23xx"
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
 */
router.post('/', validators.registr, userController.save)


/**
 * @api {post} /to-service-provider  make a user to be a service provider
 * @apiVersion 1.0.0
 * @apiName Create Service Provider
 * @apiGroup User
 * @apiDescription  Create a Service Provider
 *  
 * @apiParam (Request body) {String} name The user name
 * @apiParam (Request body) {String} city The user city
 * @apiParam (Request body) {String} is_company if the account is for a company
 * @apiParam (Request body) {Integer} min_charge minimum charge by a service provider
 *
 * @apiExample {js} Example usage:
 * const data = {
 *    "name": "naxx",
 *    "city": "Nairobi",
 *    "is_company": true,
 *    "min_charge": 23000
 * }
 *
 * $http.defaults.headers.common["Authorization"] = token;
 * $http.post(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 201) {Boolean} updated Boolean to determine if user was updated successfully
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 201 OK
 *     {
 *      "updated": true
 *    }
 *
 */
router.post('/to-service-provider', [validators.service_provider, passport.authenticate('users-jwt', { session: false })], userController.user_to_service_provider)


/**
 * @api {post} /to-service-provider  make a service provider to be a user
 * @apiVersion 1.0.0
 * @apiName Create User From Service Provider
 * @apiGroup User
 * @apiDescription  Create a User From Service Provider
 *  
 *
 * @apiExample {js} Example usage:
 * const data = {
 * }
 *
 * $http.defaults.headers.common["Authorization"] = token;
 * $http.post(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 201) {Boolean} updated Boolean to determine if user was updated successfully
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 201 OK
 *     {
 *      "updated": true
 *    }
 *
 */
router.post('/to-user', passport.authenticate('users-jwt', { session: false }), userController.service_provider_to_user)




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
 * @api {post} /login  login a user 
 * @apiVersion 1.0.0
 * @apiName  login a user 
 * @apiGroup  User
 * @apiDescription  login a user 
 *
 * @apiExample {js} Example usage:
 * const data = {
 *    "username": "ken", 
 *    "password": "ken123"    
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


/**
 * @api {post} /:id/ Get a user Details
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
router.post('/:id', passport.authenticate('users-jwt', { session: false }), userController.get_details)


/**
 * @api {get} /:id/service-requests Get a user service requests
 * @apiVersion 1.0.0
 * @apiName Get service requests
 * @apiGroup User
 * @apiDescription Get service requests
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
 * @apiSuccess (Success 201) {Object} service_requests list containing user service requests
 * @apiSuccessExample {json} Success response:
 *     HTTPS 201 OK
 *     {
 *      "service_requests": []
 *    }
 *
 */
router.get('/:id/service-requests', passport.authenticate('users-jwt', { session: false }), userController.get_service_requests)





// export our routes
module.exports = router