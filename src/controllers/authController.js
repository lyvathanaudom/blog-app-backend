const supabase = require("../../config/supabase");

const login = async (req, res) => {
  try {
    // Get data from either query parameters or request body
    const email = req.query.email || req.body.email;
    const password = req.query.password || req.body.password;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json({ 
      token: user.session.access_token,
      user: user.user 
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { login };