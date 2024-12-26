const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const eventsController = require('./controllers/eventsController');
const commentController = require('./controllers/commentController');
const messageController = require('./controllers/messageController');
const bulletinController = require('./controllers/bulletinController');
const blogController = require('./controllers/blogController');
const imageController = require('./controllers/imageController');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/events', eventsController);
router.use('/comments', commentController);
router.use('/messages', messageController);
router.use('/bulletin', bulletinController);
router.use('/blog', blogController);
router.use('/uploads', imageController);

router.use('*', (req, res) => {
    res.status(404).json({ error: '404 Not Found' });
});

module.exports = router;