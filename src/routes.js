// Import controlers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');
const verifyAdmin = require('./middlewares/verifyAdmin');

// Match URL's with controllers
exports.appRoute = router => {
    //user routes
    router.post('/api/user/login', authController.processLogin);
    router.post('/api/user/register', authController.processRegister);
    router.post('/api/user/process-submission', checkUserFn.getClientUserId, userController.processDesignSubmission);
    router.put('/api/user/design/', userController.processUpdateOneDesign);
    router.get('/api/user/process-search-design/:pagenumber/:search?', checkUserFn.getClientUserId, userController.processGetSubmissionData);
    router.get('/api/user/:recordId', userController.processGetOneUserData);
    router.get('/api/user/design/:fileId', userController.processGetOneDesignData);

    //admin routes
    router.put('/api/user/', verifyAdmin.verifyAdmin, userController.processUpdateOneUser);
    router.get('/api/user/process-search-user/:pagenumber/:search?', checkUserFn.getClientUserId, verifyAdmin.verifyAdmin, userController.processGetUserData);
   
   /*  router.put('/api/admin/', verifyAdmin.verifyAdmin, userController.processUpdateOneUser);
    router.get('/api/admin/process-search-user/:pagenumber/:search?', checkUserFn.getClientUserId, verifyAdmin.verifyAdmin, userController.processGetUserData); */
   

};