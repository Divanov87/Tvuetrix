const router = require('express').Router();
const multer = require('multer');

const { isAuth } = require('../middlewares/authMiddleware');
const Blog = require('../models/Blog');
const blogService = require('../services/blogService');


router.get('/', async (req, res) => {
    try {
        let query = {};

        // If user is not logged in or not an admin, they can only see non-hidden blogs
        if (!req.user || req.user.role !== 'admin') {
            query.isHidden = false;  // Only show non-hidden blogs
        }
        const blogs = await Blog.find(query)
            .populate('author', 'username')
            .populate('image')
            .sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error listing all blog post', error });
    }
});


const upload = multer({
    dest: 'public/assets/image-uploads/', // Directory where uploaded files will be stored
    limits: { fileSize: 10000000 } // Max file size in bytes (10 MB here)
});

router.post('/add', upload.single('image'), async (req, res) => {
    try {

        const { title, description, metaTitle, metaDescription, image, content, isHidden } = req.body;

        console.log('Received imageId:', image); // Log to verify imageId

        // if (!title || !content) {
        //     return res.status(400).json({ message: 'Title and content are required' });
        // }

        const blog = new Blog({
            title,
            description,
            metaTitle,
            metaDescription,
            image,
            content,
            isHidden,
            author: req.user._id,
            saves: [{ content, date: new Date()}]
        });

        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        console.error('Error creating blog:', error); // Log the error
        res.status(500).json({ message: 'Error creating blog', error }); // Send detailed error response
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, metaTitle, metaDescription, image, content, isHidden, saves, isManualSave } = req.body;
  
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
  
    try {
      const blog = await Blog.findById(id);
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      blog.title = title || blog.title;
      blog.description = description || blog.description;
      blog.metaTitle = metaTitle || blog.metaTitle;
      blog.metaDescription = metaDescription || blog.metaDescription;
      blog.image = image || blog.image;
      blog.content = content || blog.content;
      blog.isHidden = isHidden !== undefined ? isHidden : blog.isHidden;
      blog.author = req.user._id;
  
    //   if (isManualSave) {
    //     if (!content) {
    //       return res.status(400).json({ message: 'Content is required for manual save.' });
    //     }

        if (isManualSave) {
        blog.saves.push({
          content,
          date: new Date(),
        });
      }
  
      await blog.save();
  
      return res.json({
        message: 'Blog post updated successfully',
        blog,
      });
    } catch (error) {
      console.error('Error updating blog post:', error);
      return res.status(500).json({
        message: 'Error updating blog post',
        error: error.message,
      });
    }
  });
  

  const mongoose = require('mongoose');
  
  router.delete('/:id/saves/:index', async (req, res) => {
    const { id, index } = req.params;
    console.log('Received ID:', id); // Log the ID
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog ID format' });
    }
  
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      const saves = blog.saves || [];
      if (index < 0 || index >= saves.length) {
        return res.status(400).json({ message: 'Invalid save index' });
      }

      blog.saves.splice(index, 1);
  
      await blog.save();
  
      return res.json({ message: 'Revision deleted successfully', saves: blog.saves });
    } catch (error) {
      console.error('Error deleting revision:', error);
      return res.status(500).json({ message: 'Error deleting revision', error: error.message });
    }
  });
  

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id).populate('author', 'username').populate('image');

        if (!blog) return res.status(404).json({ message: 'Blog post not found' });
        if (blog.isHidden) res.set('X-Robots-Tag', 'noindex');
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blog post', error });
    }
});



// router.put('/:id', async (req, res) => {
    
//     const { id } = req.params;
//     const { title, metaTitle, metaDescription, image, content, isHidden } = req.body;

//     if (!req.user || !req.user._id) {
//         return res.status(401).json({ message: 'User not authenticated' });
//     }

//     try {

//         const blog = await Blog.findByIdAndUpdate(
//             id,
//             {
//                 title,
//                 metaTitle,
//                 metaDescription,
//                 image,
//                 content,
//                 isHidden,
//                 author: req.user._id,
//             },
//             { new: true }
//         );

//         if (!blog) {
//             return res.status(404).json({ message: 'Blog post not found' });
//         }

//         return res.json({
//             message: 'Blog post updated successfully',
//             blog,
//         });
//     } catch (error) {
//         console.error('Error updating blog post:', error);

//         return res.status(500).json({
//             message: 'Error updating blog post',
//             error: error.message,
//         });
//     }
// });


// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { title, metaTitle, metaDescription, image, content, isHidden } = req.body;
//     try {
//         const blog = await Blog.findByIdAndUpdate(id, {
//             title,
//             metaTitle,
//             metaDescription,
//             image,
//             content,
//             isHidden,
//             author: req.user._id }, { new: true });
//         if (!blog) return res.status(404).json({ message: 'Blog post not found' });
//         res.json({ message: 'Blog post updated successfully', blog });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating blog post', error });
//     }
// });



// router.delete('/:id', isAuth, async (req, res) => {
//     try {
//       const user = await User.findById(req.user._id);
//       if (user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });

//       const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
//       if (!deletedBlog) return res.status(404).json({ message: 'Message not found' });

//       res.status(200).json(deletedBlog);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });


router.delete('/:id', isAuth, async (req, res) => {
    try {

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Error deleting blog' });
    }
});


router.post('/:id/pin', async (req, res) => {
    try {
        const pin = await blogService.pin(req.body.blogId, req.body.userId);
        // const pin = await blogService.pin(req.params.id, req.user._id);
        //res.status(200).json({ message: 'Event pinned successfully' });
        res.status(200).json({ pin });
    } catch (err) {
        res.status(400).json({ error: getErr(err) });
    }
});

router.post('/:id/unpin', async (req, res) => {
    try {
        const unpin = await blogService.unpin(req.body.blogId, req.body.userId);
        res.status(200).json({ unpin });
    } catch (err) {
        res.status(400).json({ error: getErr(err) });
    }
});

module.exports = router;