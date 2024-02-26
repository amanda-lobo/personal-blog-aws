const Posts = require('../models/posts');
const Theme = require('../models/theme');
const User = require('../models/user');

exports.createNewPost = async (req, res) => {
    try {
        const { title, text, userId, themeId } = req.body;
        if (!themeId) {
            return res.status(400).send({ message: 'The theme ID is mandatory!' });
        }
        const themeExists = await Theme.findByPk(themeId);
        if (!themeExists) {
            return res.status(404).send({ message: 'Theme not found' });
        }

        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return res.status(404).send({message: 'User not found'});
        }
        const newPost = await Posts.create({
            title,
            text,
            userId,
            themeId
        });
        res.status(201).send(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error creating post', error: error.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.findAll({});
        res.status(200).send(posts);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error when searching for posts', error: error.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const { postsId } = req.params;
        const post = await Posts.findByPk(postsId, {});
        console.log(post)
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        res.status(200).send(post);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error when searching for posts', error: error.message });
    }
};

exports.updatePostById = async (req, res) => {
    try {
        const { postsId } = req.params;
        const { title, text, themeId } = req.body;

        const [updated] = await Posts.update({
            title,
            text,
            themeId
        }, {
            where: { postsId: postsId }
        });

        if (updated) {
            const updatedPost = await Posts.findByPk(postsId);
            return res.status(200).send(updatedPost);
        } else {
            return res.status(404).send({ message: 'Post not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error updating post', error: error.message });
    }
};

exports.deletePostById = async (req, res) => {
    try {
        const { postsId } = req.params;
        const deleted = await Posts.destroy({
            where: { postsId: postsId }
        });
        if (deleted) {
            res.status(200).send({ message: 'Post successfully deleted!' });
        } else {
            res.status(404).send({ message: 'Post not found.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error deleting post', error: error.message });
    }
};