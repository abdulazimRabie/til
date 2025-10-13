## Views
- logical table constructs of one or more of existed tables
- runs `select` query behind the scene
- allows you to set restrictions, for example if you want to not give privilege of `select` on `employee` table to the HR team.
	- you will create view with the only employees in HR department and give the privilege of `select` on this view not the whole employee table
	- you can use `WITH CHECK OPTION` to specify that any insert/manipulate will obey the check constraints of the view
- Views 
	- **Simple : one table - no aggregation - easy to insert/update in views**
	- **Complex : more than one table - aggregation ,function - hard to insert** 

```sql
CRATE VIEW vw_work_hrs 
AS
SELECT first_name, last_name, prject_name, works_on
FROM employee, department, works_on
WHERE ssn=essn AND pno=pnumber 
```

- `CREATE OR REPLACE` : if view exist , replace otherwise create view with that name.

```sql
CREATE VIEW Supliers
AS
SELECT *
FROM supliers
WHERE status > 15
WITH CHECK OPTION
```

## Index
- Indexing solves the problems of 
	- data not sorted
	- scattered (data allocated in separated areas in physical memory)
- Indexing creates new table that sort data based on index and contains pointers to records of the index in the table itself. (index + pointer)
- Why ?
	- speed up the retrieval time 
	- define index on multiple columns
	- can be created by user or DBMS (by default create index on primary key column)
	- are maintained by DBMS (you just create and DBMS manages other things)
- Pros :
	- enhance response time of `select` and `where`
	- no full table scan again
- Cons
	-  slow down all DML operations `insert, update delete`; because the index table must be updated again and sorted
![](../assets/index.png)
- Using index is a trade offs 
- Use it : 
	- table is large and used for searching more than updating
	- table contains lots of nulls
- Don't use :
	- table is updated frequently
```sql
CREATE INDEX salary_idx ON Suppliers(salary)
```

```sql
DROP INDEX salary_idx
```