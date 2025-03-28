const express = require('express');
const router = express.Router();
const {validatorPersonalData, validatorCompanyData} = require('../validators/user');
const {putUserRegister, patchUserCompany, updateUserLogo, getUser, deleteUser, requestPasswordReset,verifyResetCode, resetPassword } = require('../controllers/user');
//LOGO
const { uploadMiddlewareMemory} = require('../utils/handleStorage');

//MIDDLEWARES
const {checkRole} = require('../middleware/role');
const {authMiddleware} = require('../middleware/session');
const {verifyResetToken} = require('../middleware/verifyResetToken');

router.get('/', authMiddleware, getUser); 
router.delete('/', authMiddleware, deleteUser); 
router.patch('/register', authMiddleware, validatorPersonalData, putUserRegister);
router.patch('/company', authMiddleware, validatorCompanyData, patchUserCompany );
router.patch('/logo', authMiddleware, uploadMiddlewareMemory.single('image'), updateUserLogo);

//enviamos codigo
router.post('/recover', requestPasswordReset);
//vaslidamos código
router.put('/validation', verifyResetCode);
//cambiar contra
router.patch('/password', authMiddleware, resetPassword);

//invitar a un usuario
router.post('/invite', checkAuth, checkRole(['user']), inviteUser);

module.exports = router;