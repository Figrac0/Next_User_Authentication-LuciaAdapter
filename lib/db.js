import sql from "better-sqlite3";

const db = sql("training.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT
  );
`);

db.exec(`CREATE TABLE IF NOT EXISTS sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

db.exec(`
  CREATE TABLE IF NOT EXISTS trainings (
    id INTEGER PRIMARY KEY,
    title TEXT,
    image TEXT,
    description TEXT,
    category TEXT,
    intensity TEXT,
    duration TEXT,
    group_size TEXT
  );
`);

const hasTrainings =
    db.prepare("SELECT COUNT(*) as count FROM trainings").get().count > 0;

if (!hasTrainings) {
    db.exec(`
    INSERT INTO trainings (title, image, description, category, intensity, duration, group_size)
    VALUES
    ('Mindful Yoga Flow', '/yoga.jpg', 'Experience the perfect harmony of breath and movement in our signature yoga sessions designed to enhance mindfulness while building core strength and flexibility.', 'Mindfulness', 'Gentle', '60 min', 'Small Group (8 max)'),
    ('Elite Boxing Training', '/boxing.jpg', 'Transform your fitness with high-intensity boxing drills that combine technique, speed, and power for a complete body transformation.', 'Combat Sports', 'High', '75 min', 'Private & Group'),
    ('Endurance Running Program', '/running.jpg', 'Master the art of endurance with personalized running plans that adapt to your fitness level and help you achieve new personal records.', 'Cardio', 'Medium-High', '45-90 min', 'Solo & Group'),
    ('Strength & Conditioning', '/weightlifting.jpg', 'Build functional strength with our scientific approach to weight training, focusing on proper form and progressive overload.', 'Strength', 'High', '60 min', 'Personal Training'),
    ('Indoor Cycling Experience', '/cycling.jpg', 'Immersive cycling sessions with virtual terrain that push your limits while protecting your joints in a high-energy environment.', 'Cardio', 'Medium', '45 min', 'Studio Class (20 max)'),
    ('E-Sports Performance Training', '/gaming.jpg', 'Enhance cognitive function, reaction time, and focus through specialized gaming fitness routines designed for digital athletes.', 'Mental Fitness', 'Low-Medium', '50 min', 'Individual'),
    ('Coastal Sailing Adventure', '/sailing.jpg', 'Combine fitness with adventure in our unique sailing sessions that build core stability and balance while enjoying coastal scenery.', 'Outdoor', 'Light', 'Half Day', 'Small Group (6 max)');
  `);
}

export default db;
