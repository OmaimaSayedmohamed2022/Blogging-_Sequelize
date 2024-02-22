const postController = require('../controllers/postController')

const express=require('express')
const router= express.Router()

router.post('/creatPost',postController.creatPost)
router.patch('/publishPost/:id',postController.publishPost)
router.patch('/unpublishPost/:id',postController.unpublishPost)
router.patch('/updatePost/:id',postController.updatePost)
router.delete('/deletePost/:id',postController.deletePost)

router.get('/author/:authorId', postController.getAuthorPosts);



module.exports = router