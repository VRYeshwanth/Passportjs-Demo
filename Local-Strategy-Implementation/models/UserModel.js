import pool from "../db.js";

export async function findUserByUsername(username) {
    const response = await pool.query("SELECT * from users WHERE username = $1", [username]);
    return response.rows[0];
}

export async function findUserById(id) {
    const response = await pool.query("SELECT * from users WHERE id = $1", [id]);
    return response.rows[0];
}

export async function createUser(username, hashedPwd) {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, hashedPwd]);
}