const supabase = require("../../config/supabase");

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        console.log('Fetching posts from database...');
        const { data, error } = await supabase
            .from('posts')
            .select('id, created_at, title, slug, date, cover, content, tag, author')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Database query error:', error);
            return res.status(400).json({ error: error.message });
        }

        const formattedPosts = data.map(post => ({
            id: post.id,
            created_at: post.created_at,
            title: post.title || 'Untitled',
            slug: post.slug || 'slug',
            date: post.date,
            cover: post.cover || null,
            content: post.content,
            tag: post.tag || {},
            author: post.author || 'Anonymous'
        }));

        console.log(`Successfully fetched ${formattedPosts.length} posts`);
        return res.status(200).json(formattedPosts);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get single post by slug
exports.getPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        console.log(`Fetching post with slug: ${slug}`);

        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error('Database query error:', error);
            return res.status(400).json({ error: error.message });
        }

        if (!data) {
            return res.status(404).json({ error: 'Post not found' });
        }

        console.log('Successfully fetched post');
        return res.status(200).json(data);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create new post
exports.createPost = async (req, res) => {
    try {
        const { title, content, slug, date, cover, tag, author } = req.body; 
        console.log('Creating new post...');

        const { data, error } = await supabase
            .from('posts')
            .insert([
                {
                    title,
                    content,
                    slug,
                    date,
                    cover,
                    tag,
                    author
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Database insert error:', error);
            return res.status(400).json({ error: error.message });
        }

        console.log('Successfully created new post');
        return res.status(201).json(data);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update post
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, slug, date, cover, tag, author } = req.body;
        console.log(`Updating post with ID: ${id}`);

        const { data, error } = await supabase
            .from('posts')
            .update({
                title,
                content,
                slug,
                date,
                cover,
                tag,
                author
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Database update error:', error);
            return res.status(400).json({ error: error.message });
        }

        if (!data) {
            return res.status(404).json({ error: 'Post not found' });
        }

        console.log('Successfully updated post');
        return res.status(200).json(data);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete post
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Deleting post with ID: ${id}`);

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Database delete error:', error);
            return res.status(400).json({ error: error.message });
        }

        console.log('Successfully deleted post');
        return res.status(200).json({ message: 'Post deleted successfully' });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};