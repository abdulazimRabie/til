- Database Schema : group of related objects of database.
- Data Type : type of data stored in columns
	- Alphanumeric
	- numeric
	- characters
	- variable of characters
	- date and time
	- integers
	- float 
- Database Constraints : restriction on database column to help maintain integrity of data
	- primary key : not null + unique
	- unique
	- not null
	- refrential  integrity (FK)
		- works with : insert and delete
		- foreign key : child record
		- primary key : parent record
	- check
## DDL
- Data Definition language Functions : 
	- `Create`
	- `Edit`
	- `Delete`
- Commands :
	-  `create`
	- `alter`
	- `drop`
	- `truncate`
	
```sql
CREATE STUDENTS(
	ID SERIAL PRIMARY KEY,
	NAME VARCHAR(20) NOT NULL,
	ADDRESS VARCHAR(20) NOT NULL,
	BIRTH_DATE DATE,
	POINTS INTEGER CHECK(POINTS > 0)
)
```

```sql
ALTER TABLE STUDENTS
ADD COLUMN joined_at DATE
```

```sql
ALTER TABLE STUDENT
ADD CONSTRAINTS CHECK (joined_at > birth_date)
```

```sql
ALTER TABLE STUDENT
DROP COLUMN joined_at
```

## DCL
- Data Control Language : gives privilege access to users
- `GRANT` : allow privilege to user/s
- `REVOKE` : removes specific privilege on database object from a role

```sql
GRANT privilege_type [, ...] ON object_type object_name [,.] TO role_name [,..] [WITH GRANT OPTION];
```

- `privilege_type`: Specifies the type of privilege being granted (e.g., SELECT, INSERT, UPDATE, DELETE, ALL PRIVILEGES).
- `object_type`: Specifies the type of database object (e.g., TABLE, SEQUENCE, FUNCTION, SCHEMA).
- `object_name`: Specifies the name of the database object.
- `role_name`: Specifies the role (user or group) to whom the privileges are granted. PUBLIC can be used to grant privileges to all roles.
- `WITH GRANT OPTION`: Allows the recipient role to grant the same privileges to other roles.
```sql
GRANT SELECT,UPDATE ON TABLE STUDENT TO SCHOLL_MANAGER
```

```sql
REVOKE [GRANT OPTION FOR] privilege_type [,..] ON object_type object_name [,..] FROM role_name [, ...] [CASCADE | RESTRICT];
```
- `privilege_type`: Specifies the type of privilege being revoked.
- `object_type`: Specifies the type of database object.
- `object_name`: Specifies the name of the database object.
- `role_name`: Specifies the role from whom the privileges are revoked. `PUBLIC` can be used to revoke privileges from all roles.
- `GRANT OPTION FOR`: Revokes only the ability to grant the privilege, not the privilege itself.
- `CASCADE`: Revokes the privilege and all privileges that were granted based on this privilege by the recipient.
- `RESTRICT`: (Default) Prevents revocation if other roles have been granted privileges based on the privilege being revoked.
```sql
REVOKE INSERT ON TABLE STUDENTS FROM SHCOOL_MANAGER
```