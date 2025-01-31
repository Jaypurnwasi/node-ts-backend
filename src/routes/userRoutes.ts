import { createUser,getUsers,getUserById,updateUser ,deleteUser,signUp,login} from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import express,{Router} from 'express'

const router:Router = express.Router()

router.post('/createUser',createUser)
router.get('/getUsers', authMiddleware,getUsers)
router.get('/getuserById/:id',authMiddleware,getUserById)
router.patch('/updateUserById/:id',authMiddleware,updateUser)
router.delete('/deleteUserById/:id',authMiddleware,deleteUser)
router.post('/signUp',signUp)
router.post('/login',login)

export default router;