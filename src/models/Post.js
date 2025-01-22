const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

class Post {
    constructor(data = {}) {
        this.id = data.id || null;
        this.created_at = data.created_at || new Date().toISOString();
        this.title = data.title || '';
        this.date = data.date || new Date().toISOString().split('T')[0];
        this.cover = data.cover || null;
        this.content = data.content || '';
        this.tag = data.tag || {};
        this.updated_at = data.updated_at || new Date().toISOString();
        this.published = data.published || false;
        this.slug = data.slug || this.generateSlug(data.title);
    }

    generateSlug(title) {
        if (!title) return '';
        return title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    validate() {
        const errors = [];
        
        if (!this.title) errors.push('Title is required');
        if (!this.content) errors.push('Content is required');
        if (!this.date) errors.push('Date is required');
        
        return {
            valid: errors.length === 0,
            errors
        };
    }

    toJSON() {
        return {
            id: this.id,
            created_at: this.created_at,
            title: this.title,
            date: this.date,
            cover: this.cover,
            content: this.content,
            tag: this.tag,
            updated_at: this.updated_at,
            published: this.published,
            slug: this.slug
        };
    }
}

module.exports = Post;