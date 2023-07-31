-- SET timezone TO 'GMT';

-- CREATE USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(200) PRIMARY KEY,
  username VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  avatar VARCHAR(200) DEFAULT "https://res.cloudinary.com/dxlsmrixd/image/upload/v1555133028/images/users/placeholder.png",
  bio VARCHAR(200),
  quote VARCHAR(200),
  location VARCHAR(200),
  isAdmin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (username),
  UNIQUE (email)
);

-- CREATE POSTS TABLE
CREATE TABLE IF NOT EXISTS posts (
  id VARCHAR(200) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  author VARCHAR(200) NOT NULL,
  viewer INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_posts_users FOREIGN KEY (author) REFERENCES users(id)
);

-- CREATE COMMENTS TABLE
CREATE TABLE IF NOT EXISTS comments (
  id VARCHAR(200) PRIMARY KEY,
  content VARCHAR(200) NOT NULL,
  post VARCHAR(200) NOT NULL,
  author VARCHAR(200) NOT NULL,
  comment_parent VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_comments_posts FOREIGN KEY (post) REFERENCES posts(id),
  CONSTRAINT fk_comments_users FOREIGN KEY (author) REFERENCES users(id),
  CONSTRAINT fk_comments_comment_parent FOREIGN KEY (comment_parent) REFERENCES comments(id)
);

-- CREATE BOOKMARK TABLE
CREATE TABLE IF NOT EXISTS bookmarks (
  id VARCHAR(200) PRIMARY KEY,
  post VARCHAR(200) NOT NULL,
  me VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookmarks_posts FOREIGN KEY (post) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_bookmarks_users FOREIGN KEY (me) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);