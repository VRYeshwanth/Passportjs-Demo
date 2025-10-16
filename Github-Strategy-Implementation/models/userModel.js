import pool from "../db.js";

export async function findUserByGithubId(githubId) {
    const result = await pool.query("SELECT * FROM authusers WHERE github_id = $1", [githubId]);
    return result.rows[0];
}

export async function createUser(githubId, username) {
    const result = await pool.query("INSERT INTO authusers (github_id, username) VALUES ($1, $2) RETURNING *", [githubId, username]);
    return result.rows[0];
}