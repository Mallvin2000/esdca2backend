const userManager = require('../services/userService');
const fileDataManager = require('../services/fileService');
const config = require('../config/config');
const validator = require('validator');

  
// 
exports.processDesignSubmission = (req, res, next) => {
    let designTitle = req.body.designTitle;
    let designDescription = req.body.designDescription;
    let userId = req.body.userId;
    let file = req.body.file;

    if (validator.isAlphanumeric(designTitle) && validator.isAlphanumeric(designDescription)) {
        fileDataManager.uploadFile(file, async function (error, result) {
            console.log('check result variable in fileDataManager.upload code block\n', result);
            console.log('check error variable in fileDataManager.upload code block\n', error);
            let uploadResult = result;
            if (error) {
                let message = 'Unable to complete file submission.';
                res.status(500).json({ "error": message, "code":500 });
                res.end();
            } else {
                //Update the file table inside the MySQL when the file image
                //has been saved at the cloud storage (Cloudinary)
                let imageURL = uploadResult.imageURL;
                let publicId = uploadResult.publicId;
                console.log('check uploadResult before calling createFileData in try block', uploadResult);
                try {
                    let result = await fileDataManager.createFileData(imageURL, publicId, userId, designTitle, designDescription);
                    console.log('Inspert result variable inside fileDataManager.uploadFile code');
                    console.log(result);
                    if (result) {
                        let message = 'File submission completed.';
                        res.status(200).json({ message: message, imageURL: imageURL });
                    }
                } catch (error) {
                    let message = 'File submission failed.';
                    res.status(500).json({
                        "error": message,
                        "code": 500
                    });
                }
            }
        })
    }//end of vallidation if statement 
    else {
        let message = 'Input format incorrect';
        res.status(500).json({
            "error": message,
            'code': 500
        });
    }

}; //End of processDesignSubmission
exports.processGetSubmissionData = async (req, res, next) => {
    let pageNumber = req.params.pagenumber;
    let search = req.params.search;
    let userId = req.body.userId;
    try {
        let results = await fileDataManager.getFileData(userId, pageNumber, search);
        console.log('Inspect result variable inside processGetSubmissionData code\n', results);
        if (results) {
            for (let i = 0; i < results[0].length; i++) {
                results[0][i].design_title = validator.escape(results[0][i].design_title);
                results[0][i].design_description = validator.escape(results[0][i].design_description);
                
            }
            //console.log(results[0][0].file_id);
            var jsonResult = {
                'number_of_records': results[0].length,
                'page_number': pageNumber,
                'filedata': results[0],
                'total_number_of_records': results[2][0].total_records
            }
            return res.status(200).json(jsonResult);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        return res.status(500).json({
            "error": message,
            "code": 500
        });
    }

}; //End of processGetSubmissionData
exports.processGetUserData = async (req, res, next) => {
    let pageNumber = req.params.pagenumber;
    let search = req.params.search;

    try {
        let results = await userManager.getUserData(pageNumber, search);
        console.log('Inspect result variable inside processGetUserData code\n', results);
        if (results) {
            var jsonResult = {
                'number_of_records': results[0].length,
                'page_number': pageNumber,
                'userdata': results[0],
                'total_number_of_records': results[2][0].total_records
            }
            return res.status(200).json(jsonResult);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        return res.status(500).json({
            "error": message,
            "code": 500
        });
    }

}; //End of processGetUserData

exports.processGetOneUserData = async (req, res, next) => {
    let recordId = req.params.recordId;

    try {
        let results = await userManager.getOneUserData(recordId);
        console.log('Inspect result variable inside processGetOneUserData code\n', results);
        if (results) {
            //escape so that no dirty scripts appear in profile page if user tries it on register page
            
            //console.log(results);
            //console.log(results[0].user_id);
            //results[0].user_id = validator.escape(results[0].user_id);
            results[0].fullname = validator.escape(results[0].fullname);
            results[0].email = validator.escape(results[0].email);
            //results[0].role_id = validator.escape(results[0].role_id);
            results[0].role_name =  validator.escape(results[0].role_name);
            var jsonResult = {
                'userdata': results[0],
            }
            return res.status(200).json(jsonResult);
        }
    } catch (error) {
         let message = 'Server is unable to process your request.';
         /*
        return res.status(500).json({
            message: error
        }); */

        return res.status(500).json({
            "error": message,
            "code": 500
        })
    }

}; //End of processGetOneUserData


exports.processUpdateOneUser = async (req, res, next) => {
    console.log('processUpdateOneUser running');
    //Collect data from the request body 
    let recordId = req.body.recordId;
    let newRoleId = req.body.roleId;
    try {
        results = await userManager.updateUser(recordId, newRoleId);
        console.log(results);
        return res.status(200).json({ message: 'Completed update' });
    } catch (error) {
        console.log('processUpdateOneUser method : catch block section code is running');
        console.log(error, '=======================================================================');
        return res.status(500).json({ "error": 'Unable to complete update operation', "code": 500 });
    }


}; //End of processUpdateOneUser

exports.processGetOneDesignData = async (req, res, next) => {
    let recordId = req.params.fileId;

    try {
        let results = await userManager.getOneDesignData(recordId);
        console.log('Inspect result variable inside processGetOneFileData code\n', results);
        if (results) {
            var jsonResult = {
                'filedata': results[0],
            }
            return res.status(200).json(jsonResult);
        }
    } catch (error) {
        let message = 'Server is unable to process the request.';
        return res.status(500).json({
            "error": message,
            "code": 500
        });
    }

}; //End of processGetOneDesignData

exports.processUpdateOneDesign = async (req, res, next) => {
    console.log('processUpdateOneFile running');
    //Collect data from the request body 
    let fileId = req.body.fileId;
    let designTitle = req.body.designTitle;
    let designDescription = req.body.designDescription;
    try {
        results = await userManager.updateDesign(fileId, designTitle, designDescription);
        console.log(results);
        return res.status(200).json({ message: 'Completed update' });
    } catch (error) {
        console.log('processUpdateOneUser method : catch block section code is running');
        console.log(error, '=======================================================================');
        return res.status(500).json({ "error": 'Unable to complete update operation', "code":500 });
    }


}; //End of processUpdateOneDesign