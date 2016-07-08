DROP TABLE IF EXISTS "modx_users";
DROP TABLE IF EXISTS "modx_member_groups";
DROP TABLE IF EXISTS "modx_membergroup_names";
DROP TABLE IF EXISTS "modx_user_attributes";

CREATE TABLE "modx_users"(
  id SERIAL PRIMARY KEY,
  username varchar(100) NOT NULL DEFAULT '',
  password varchar(100) NOT NULL DEFAULT '',
  cachepwd varchar(100) NOT NULL DEFAULT '',
  class_key varchar(100) NOT NULL DEFAULT 'modUser',
  active smallint NOT NULL DEFAULT '1',
  remote_key varchar(255) DEFAULT NULL,
  remote_data text,
  hash_class varchar(100) NOT NULL DEFAULT 'hashing.modPBKDF2',
  salt varchar(100) NOT NULL DEFAULT '',
  primary_group integer NOT NULL DEFAULT '0',
  session_stale text,
  sudo smallint NOT NULL DEFAULT '0',
  UNIQUE(username)
);

CREATE TABLE "modx_member_groups" (
  id SERIAL PRIMARY KEY,
  user_group integer NOT NULL DEFAULT '0',
  member integer NOT NULL DEFAULT '0',
  role integer NOT NULL DEFAULT '1',
  rank integer NOT NULL DEFAULT '0'
);

CREATE TABLE "modx_membergroup_names" (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL DEFAULT '',
  description text,
  parent integer NOT NULL DEFAULT '0',
  rank integer NOT NULL DEFAULT '0',
  dashboard integer NOT NULL DEFAULT '1'
);

CREATE TABLE modx_user_attributes (
  id SERIAL PRIMARY KEY,
  internalKey integer NOT NULL,
  fullname varchar(100) NOT NULL DEFAULT '',
  email varchar(100) NOT NULL DEFAULT '',
  phone varchar(100) NULL DEFAULT '',
  mobilephone varchar(100) NULL DEFAULT '',
  blocked smallint NULL DEFAULT '0',
  blockeduntil integer NULL DEFAULT '0',
  blockedafter integer NULL DEFAULT '0',
  logincount integer NULL DEFAULT '0',
  lastlogin integer NULL DEFAULT '0',
  thislogin integer NULL DEFAULT '0',
  failedlogincount integer NULL DEFAULT '0',
  sessionid varchar(100) NULL DEFAULT '',
  dob integer NULL DEFAULT '0',
  gender integer NULL DEFAULT '0',
  address text NULL,
  country varchar(255) NULL DEFAULT '',
  city varchar(255) NULL DEFAULT '',
  state varchar(25) NULL DEFAULT '',
  zip varchar(25) NULL DEFAULT '',
  fax varchar(100) NULL DEFAULT '',
  photo varchar(255) NULL DEFAULT '',
  comment text NULL,
  title varchar(255) NULL DEFAULT '',
  website varchar(255) NULL DEFAULT '',
  extended text
);




INSERT INTO "modx_users" (id, username, password, cachepwd, class_key, active, remote_key, remote_data, hash_class, salt, primary_group, session_stale, sudo)
VALUES (1, 'jpdevries', 'password', '', 'modUser', 1, NULL, NULL, 'hashing.modPBKDF2', '02db646a0b2b5d062b0e113f821358e6', 1, 'a:2:{i:0;s:3:"mgr";i:1;s:3:"web";}', 1);

INSERT INTO "modx_user_attributes" (id, internalKey, fullname, email, phone,title)
VALUES (1,1,'John-Paul de Vries','mail@devries.jp','','Redactor Lead Developer');


INSERT INTO "modx_users" (id, username, password, cachepwd, class_key, active, remote_key, remote_data, hash_class, salt, primary_group, session_stale, sudo)
VALUES (2, 'markh', 'password', '', 'modUser', 1, NULL, NULL, 'hashing.modPBKDF2', '02db646a0b2b5d062b0e113f821358e6', 1, 'a:2:{i:0;s:3:"mgr";i:1;s:3:"web";}', 1);

INSERT INTO "modx_user_attributes" (id, internalKey, fullname, email, phone,title)
VALUES (2,2,'Mark Hamstra','mark@modmore.com','','modmore Founder');


INSERT INTO "modx_users" (id, username, password, cachepwd, class_key, active, remote_key, remote_data, hash_class, salt, primary_group, session_stale, sudo)
VALUES (3, 'christianseel', 'password', '', 'modUser', 1, NULL, NULL, 'hashing.modPBKDF2', '02db646a0b2b5d062b0e113f821358e6', 1, 'a:2:{i:0;s:3:"mgr";i:1;s:3:"web";}', 1);

INSERT INTO "modx_user_attributes" (id, internalKey, fullname, email, phone, title)
VALUES (3,3,'Christian Seel','chris@modmore.com','','MGAB Vice-Chairman');


INSERT INTO "modx_users" (id, username, password, cachepwd, class_key, active, remote_key, remote_data, hash_class, salt, primary_group, session_stale, sudo)
VALUES (4, 'rthrash', 'password', '', 'modUser', 1, NULL, NULL, 'hashing.modPBKDF2', '02db646a0b2b5d062b0e113f821358e6', 1, 'a:2:{i:0;s:3:"mgr";i:1;s:3:"web";}', 1);

INSERT INTO "modx_user_attributes" (id, internalKey, fullname, email, phone, title)
VALUES (4,4,'Ryan Thrash','ryan@modx.com','', 'MODX Co-Founder');


INSERT INTO "modx_users" (id, username, password, cachepwd, class_key, active, remote_key, remote_data, hash_class, salt, primary_group, session_stale, sudo)
VALUES (5, 'opengeek', 'password', '', 'modUser', 1, NULL, NULL, 'hashing.modPBKDF2', '02db646a0b2b5d062b0e113f821358e6', 1, 'a:2:{i:0;s:3:"mgr";i:1;s:3:"web";}', 1);

INSERT INTO "modx_user_attributes" (id, internalKey, fullname, email, phone, title)
VALUES (5,5,'Jason Coward','jason@modx.com','', 'Lead Architect');


INSERT INTO "modx_users" (id, username, password, cachepwd, class_key, active, remote_key, remote_data, hash_class, salt, primary_group, session_stale, sudo)
VALUES (6, 'marcjenkins', 'password', '', 'modUser', 1, NULL, NULL, 'hashing.modPBKDF2', '02db646a0b2b5d062b0e113f821358e6', 1, 'a:2:{i:0;s:3:"mgr";i:1;s:3:"web";}', 0);

INSERT INTO "modx_user_attributes" (id, internalKey, fullname, email, phone, title)
VALUES (6,6,'Marc Jenkins','marc@modmore.com','','modmore Chief Editor');


INSERT INTO "modx_users" (id, username, password, cachepwd, class_key, active, remote_key, remote_data, hash_class, salt, primary_group, session_stale, sudo)
VALUES (7, 'isaacniebeling', 'password', '', 'modUser', 1, NULL, NULL, 'hashing.modPBKDF2', '02db646a0b2b5d062b0e113f821358e6', 1, 'a:2:{i:0;s:3:"mgr";i:1;s:3:"web";}', 1);

INSERT INTO "modx_user_attributes" (id, internalKey, fullname, email, phone, title)
VALUES (7,7,'Isaac Niebeling','isaac@modmore.com','','modmore Developer');

INSERT INTO "modx_users" (id, username, password, cachepwd, class_key, active, remote_key, remote_data, hash_class, salt, primary_group, session_stale, sudo)
VALUES (8, 'gpsietzema', 'password', '', 'modUser', 1, NULL, NULL, 'hashing.modPBKDF2', '02db646a0b2b5d062b0e113f821358e6', 1, 'a:2:{i:0;s:3:"mgr";i:1;s:3:"web";}', 1);

INSERT INTO "modx_user_attributes" (id, internalKey, fullname, email, phone, title)
VALUES (8,8,'Gauke Pieter Sietzema','gauke@sterc.com','','Sterc Co-Founder');

INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (1, 1, 2, 0);
INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (2, 1, 2, 0);
INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (3, 1, 2, 0);

INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (1, 2, 2, 0);
INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (2, 2, 2, 0);
INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (3, 2, 2, 0);

INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (1, 3, 2, 0);
INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (2, 3, 2, 0);
INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (3, 3, 2, 0);

INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (1, 4, 2, 0);
INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (3, 4, 2, 0);

INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (1, 5, 2, 0);
INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (3, 5, 2, 0);

INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (2, 6, 2, 0);

INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (2, 7, 2, 0);

INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (1, 8, 2, 0);
INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (3, 8, 2, 0);
INSERT INTO "modx_member_groups" (user_group, member, role, rank) VALUES (4, 8, 2, 0);

INSERT INTO "modx_membergroup_names" (id, name, description, parent, rank, dashboard) VALUES (1, 'Administrator', NULL, 0, 0, 1);
INSERT INTO "modx_membergroup_names" (id, name, description, parent, rank, dashboard) VALUES (2, 'modmore', NULL, 0, 0, 1);
INSERT INTO "modx_membergroup_names" (id, name, description, parent, rank, dashboard) VALUES (3, 'MGAB', NULL, 0, 0, 1);
INSERT INTO "modx_membergroup_names" (id, name, description, parent, rank, dashboard) VALUES (4, 'Sterc', NULL, 0, 0, 1);


SELECT
  modx_users.username, user_group, role, name, fullname, email, title, active, sudo
FROM
  modx_users
 INNER JOIN
   modx_member_groups ON modx_member_groups.member = modx_users.id
INNER JOIN modx_membergroup_names ON modx_member_groups.user_group = modx_membergroup_names.id
INNER JOIN modx_user_attributes ON modx_user_attributes.id = modx_users.id;
