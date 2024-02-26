const Theme = require('../models/theme')

exports.createTheme = async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) {
            return res.status(400).send({ message: 'The description is mandatory!' });
        }
        const newTheme = await Theme.create({
            description
        });
        res.status(201).send(newTheme);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error when searching for themes', error: error.message });
    }
};

exports.getAllThemes = async (req, res) => {
    try {
        const themes = await Theme.findAll();
        res.status(200).send(themes);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error when searching for themes', error: error.message });
    }
};

exports.getThemeById = async (req, res) => {
    try {
        const { themeId } = req.params;
        const theme = await Theme.findByPk(themeId);

        if (!theme) {
            return res.status(404).send({ message: 'Topic not found' });
        }

        res.status(200).send(theme);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error when searching for themes', error: error.message });
    }
};

exports.updateThemeById = async (req, res) => {
    try {
        const { themeId } = req.params;
        const { description } = req.body;

        const [updated] = await Theme.update({ description }, {
            where: { themeId }
        });

        if (updated) {
            const updatedTheme = await Theme.findByPk(themeId);
            return res.status(200).send(updatedTheme);
        } else {
            return res.status(404).send({ message: 'Topic not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error updating the theme', error: error.message });
    }
};

exports.deleteThemeById = async (req, res) => {
    try {
        const { themeId } = req.params;

        const deleted = await Theme.destroy({
            where: { themeId }
        });

        if (deleted) {
            res.status(200).send({ message: 'Topic successfully deleted!' });
        } else {
            res.status(404).send({ message: 'Topic not found.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error deleting theme', error: error.message });
    }
};