CREATE TABLE users(
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    username text,
    email text,
    fullname text, 
    created_at timestamptz
);

CREATE TABLE messages(
    id int PRIMARY KEY,
    title text,
    content text,
    user_id uuid,
    created_at timestamptz,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);

CREATE TABLE reactions(
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    content text,
    author uuid,
    message_id int,
    created_at timestamptz,
    CONSTRAINT fk_user
      FOREIGN KEY(author) 
	  REFERENCES users(id),
    CONSTRAINT fk_message
      FOREIGN KEY(message_id) 
	  REFERENCES messages(id)
);


CREATE TABLE comments(
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    comment text,
    author uuid,
    message_id int,
    created_at timestamptz,
    CONSTRAINT fk_user
      FOREIGN KEY(author) 
	  REFERENCES users(id),
    CONSTRAINT fk_message
      FOREIGN KEY(message_id) 
	  REFERENCES messages(id)
);