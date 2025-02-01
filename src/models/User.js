const supabase = require("../../config/supabase");

class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.email = data.email || "";
    this.createdAt = data.created_at || new Date().toISOString();
  }

  static async findByEmail(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
    if (error) throw error;
    return data;
  }
}

module.exports = User;