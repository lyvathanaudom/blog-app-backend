const supabase = require("../../config/supabase")

// Fetch all posts
exports.getAllPosts = async (req, res) => {
    try {
        console.log('Fetching posts from database...');
        const { data, error } = await supabase
            .from('posts')
            .select('id, created_at, title, slug, date, cover, content, tag')
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
            tag: post.tag || {}
        }));

        console.log(`Successfully fetched ${formattedPosts.length} posts`);
        return res.status(200).json(formattedPosts);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fetch a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Database query error:', error);
            return res.status(400).json({ error: error.message });
        }

        if (!data) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fetch a single post by slug
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

        return res.status(200).json(data);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};