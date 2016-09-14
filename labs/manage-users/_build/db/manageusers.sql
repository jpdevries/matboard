DROP TABLE IF EXISTS "modx_membergroup_names";
DROP TABLE IF EXISTS "modx_member_groups";
DROP TABLE IF EXISTS "modx_user_attributes";
DROP TABLE IF EXISTS "modx_users";
DROP TABLE IF EXISTS "modx_user_group_roles";

DROP SEQUENCE IF EXISTS user_id_sequence;

CREATE SEQUENCE user_id_sequence
  start 1
  minvalue 1
  increment 1;

CREATE TABLE "modx_users"(
  user_id SERIAL PRIMARY KEY,
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
  member integer NOT NULL DEFAULT '0' references modx_users(user_id) ON DELETE CASCADE,
  role integer NOT NULL DEFAULT '1',
  rank integer NOT NULL DEFAULT '0'
);

CREATE TABLE "modx_membergroup_names" (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL DEFAULT '',
  slackchannel varchar(100) NOT NULL DEFAULT 'modxcommunity',
  description text,
  parent integer NOT NULL DEFAULT '0',
  rank integer NOT NULL DEFAULT '0',
  dashboard integer NOT NULL DEFAULT '1'
);

CREATE TABLE "modx_user_attributes" (
  id SERIAL PRIMARY KEY,
  internalkey integer NOT NULL references modx_users(user_id) ON DELETE CASCADE,
  slack varchar(100) NULL DEFAULT '',
  givenname varchar(100) NOT NULL DEFAULT '',
  familyname varchar(100) NOT NULL DEFAULT '',
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

CREATE TABLE "modx_user_group_roles" (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  description text NULL,
  authority integer NOT NULL DEFAULT '9999',
  UNIQUE(name)
);

INSERT INTO "modx_user_group_roles" (name)
  VALUES('Administrator');

INSERT INTO "modx_user_group_roles" (name)
  VALUES('Editor');

INSERT INTO "modx_user_group_roles" (name)
  VALUES('Site Builder');

  INSERT INTO "modx_user_group_roles" (name)
  VALUES('Thinkful Student');

INSERT INTO "modx_user_group_roles" (name)
  VALUES('Ambassador');


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'jpdevries', 1,1,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'John-Paul','de Vries','mail@devries.jp','','Redactor Lead Developer', 'jpdevries' FROM new_user
  RETURNING *
), "modx_member_group" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 2, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 2, new_user.user_id, 2, 0 FROM new_user
  UNION
  SELECT 2, new_user.user_id, 3, 0 FROM new_user
  UNION
  SELECT 3, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 3, 0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'markh', 1,1,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Mark','Hamstra','mark@modmore.com','','modmore Founder', 'markh' FROM new_user
  RETURNING *
), "modx_member_group" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 2, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 3, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'christianseel', 1,1,1) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Christian','Seel','chris@modmore.com','','MGAB Vice-Chairman', 'christianseel' FROM new_user
  RETURNING *
), "modx_member_group" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 1, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 2, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 3, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'rthrash', 1,1,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Ryan','Thrash','ryan@modx.com','','MODX Co-Founder', 'ryan' FROM new_user
  RETURNING *
), "modx_member_group" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 1, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 3, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";

WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'sepiariver', 1,1,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'YJ','Tso','yj@modx.com','','MODX Systems', 'yj' FROM new_user
  RETURNING *
), "modx_member_group" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 1, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 3, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";

WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'opengeek', 1,1,1) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Jason','Coward','jason@modx.com','','Lead Architect', 'opengeek' FROM new_user
  RETURNING *
), "modx_member_group" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 1, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";

WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'marcjenkins', 1,2,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Marc','Jenkins','marc@modmore.com','','modmore Chief Editor', 'jenko' FROM new_user
  RETURNING *
), "modx_member_group" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 2, new_user.user_id, 2, 0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";

WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'isaacniebeling', 1,2,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Isaac','Niebeling','isaac@modmore.com','','modmore Developer', 'isaacniebeling' FROM new_user
  RETURNING *
), "modx_member_group" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 2, new_user.user_id, 2, 0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 2, 0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";

WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'gpsietzema', 1,4,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Gauke','Pieter Sietzema','gauke@sterc.com','','Sterc Co-Founder', 'gpsietzema' FROM new_user
  RETURNING *
), "modx_member_group" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 1, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 3, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 4, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'mpietersen', 1,5,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Menno','Pieterson','info@anyscreensize.com','','Any Screen Size Co-Founder','mpietersen' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 5,new_user.user_id,2,0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";

WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'matdave', 1,3,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Mat','Jones','matthew@ideabankmarketing.com','+1 308 379-6986','IdeaBank Marketing', 'matdavejones' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 3,new_user.user_id,2,0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";

WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'phillipharvey', 1,3,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Phillip','Harvey','philip@activeingredients.com','+1 415 226 1514','Active Ingredients', 'pmh1' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 3,new_user.user_id,2,0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'romain', 1,3,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Romain','Tripault','romain@melting-media.com',' +33 632 684 877','MODX Integrator', 'rtripault' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 3,new_user.user_id,2,0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";

WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'bezumkin', 1,3,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Vasily','Naumkin','bezumkin@ya.ru',' +33 632 684 877','MODX Vendor', 'bezumkin' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 3,new_user.user_id,2,0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'theboxer', 1,3,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'John','Peca','john@modx.com','','MODX Chief Manager','theboxer' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 3,new_user.user_id,2,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";



WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'sierrag', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Sierra','Gregg','sierrag@thinkful-students.com','','Career Path Student', 'sierrag' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 6,new_user.user_id,4,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";



WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'dengeist', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Elias','Mason','dengeist@thinkful-students.com','','Career Path Student', 'dengeist' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 6,new_user.user_id,4,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'dcaponi', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Dominick','Caponi','dcaponi@thinkful-students.com','','Career Path Student', 'dcaponi' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 6,new_user.user_id,4,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";



WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'meng', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Meng','Wang','meng@thinkful-students.com','','Career Path Student', 'meng' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 6,new_user.user_id,4,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";



WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'paulkabotie', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title)
  SELECT new_user.user_id,new_user.user_id,'Paul','Kabotie','paulkabotie@modxambassador.com','','MODX Ambassador' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";



WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'bendavis', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Benjamin','Davis','benjamindavis@modxambassador.com','','MODX Ambassador', 'bendavis' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'mindeffects', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Oliver','Haase-Lobinger','oliver@modxambassador.com','','MODX Ambassador', 'mindeffects' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'sottwell', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Susan','Ottwell','susanottwell@modxambassador.com','','MODX Ambassador', 'sottwell' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'patrickrice', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Patrick','Rice','patrickrice@modxambassador.com','','MODX Ambassador', 'amdbuilder' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'shawnwilkerson', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title)
  SELECT new_user.user_id,new_user.user_id,'Shawn','Wilerson','shawnwilkerson@modxambassador.com','','MODX Ambassador' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";

WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'salbaldovinos', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Sal','Baldovinos','sal@modxambassador.com','','MODX Ambassador', 'salscode' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'ivanklimchuk', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Ivan','Klimchuk','ivanklimchuk@modxambassador.com','','MODX Ambassador', 'alroniks' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'chrischerrett', 1,6,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Chris','Cherrett','chrischerrett@modxambassador.com','','MODX Ambassador', 'chrischerrett' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 5, new_user.user_id, 1, 0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";

WITH "new_user" AS (
  INSERT INTO "modx_users" (user_id,username, active, primary_group, sudo)
  VALUES (nextval('user_id_sequence'),'thomasjakobi', 1,7,0) RETURNING *
), "new_user_attributes" AS (
  INSERT INTO "modx_user_attributes" (id, internalkey, givenname, familyname, email, phone, title, slack)
  SELECT new_user.user_id,new_user.user_id,'Thomas','Jakobi','thomas.jakobi@partout.info','','MODX Ambassador', 'jako' FROM new_user
  RETURNING *
), "modx_member_groups" AS (
  INSERT INTO "modx_member_groups" (user_group, member, role, rank)
  SELECT 3, new_user.user_id, 5, 0 FROM new_user
  UNION
  SELECT 5, new_user.user_id, 5, 0 FROM new_user
  UNION
  SELECT 7,new_user.user_id,5,0 FROM new_user
  RETURNING *
)
SELECT user_id FROM "new_user";


INSERT INTO "modx_membergroup_names" (id, name, description, parent, rank, dashboard, slackchannel) VALUES
(1, 'Administrators', NULL, 0, 0, 1, 'modxcommunity'),
(2, 'modmore', NULL, 0, 0, 1, 'modmore'),
(3, 'MGAB', NULL, 0, 0, 1, 'modx'),
(4, 'Sterc', NULL, 0, 0, 1, 'modxcommunity'),
(5, 'Site Builders', NULL, 0, 0, 1, 'modxcommunity'),
(6, 'Thinkful Students', NULL, 0, 0, 1, 'thinkful-students'),
(7, 'MODX Ambassadors', NULL, 0, 0, 1, 'modxcommunity');


SELECT
  modx_users.username, user_id, user_group, role, name, givenname, familyname, email, title, active, sudo, slack
FROM
  modx_users
 INNER JOIN
   modx_member_groups ON modx_member_groups.member = modx_users.user_id
INNER JOIN modx_membergroup_names ON modx_member_groups.user_group = modx_membergroup_names.id
INNER JOIN modx_user_attributes ON modx_user_attributes.id = modx_users.user_id;
