import { Pool } from "pg";

const pool = new Pool({
  user: "yourusername",
  host: "localhost",
  database: "yourdbname",
  password: "yourpassword",
  port: 5432,
});

async function createUser(username, password) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO users (username, password) VALUES ($/username/, $/password/) RETURNING *",
      [username, password]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}

async function getUserById(userId) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE id = $/userId/",
      [userId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

async function getUserByUsername(username) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE username = $/username/",
      [username]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export default {
  createUser,
  getUserById,
  getUserByUsername,
};
