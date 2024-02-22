const Post = require('../models/postModel')
const User = require('../models/userModel')

const creatPost= async(req,res)=>{
    try {
        const { title, content,cover_image,published,categories,summary,draft,authorId } = req.body;
        await Post.create({ title, content,cover_image,published,categories,summary,draft,authorId});
        res.status(201).json({message:'post created successfuly'});
       
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post' });
    }

}

const publishPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.published = true;
        await post.save();
        res.json({ message: 'Post published successfully' });
    } catch (error) {
        console.error('Error publishing post:', error);
        res.status(500).json({ message: 'Error publishing post' });
    }
};

const unpublishPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.published = false;
        await post.save();
        res.json({ message: 'Post unpublished successfully' });
    } catch (error) {
        console.error('Error unpublishing post:', error);
        res.status(500).json({ message: 'Error unpublishing post' });
    }
}

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content } = req.body;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.title = title;
        post.content = content;
        await post.save();
        res.json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Error updating post' });
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await post.destroy();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Error deleting post' });
    }
};
const getAuthorPosts = async (req, res) => {
    try {
        const authorId = req.params.authorId;
        console.log('Author ID:', authorId);
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10; 

        const { count, rows } = await Post.findAndCountAll({
            where: { authorId }, 
            order: [['created_at', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });

        res.json({ count, rows });
    } catch (error) {
        console.error('Error fetching author posts:', error);
        res.status(500).json({ message: 'Error fetching author posts' });
    }
};

module.exports={
creatPost,
publishPost,
unpublishPost,
updatePost ,
deletePost,
getAuthorPosts,

}