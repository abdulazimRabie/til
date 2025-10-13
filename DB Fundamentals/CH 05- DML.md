## TRUNCATE - DELETE
- Delete : 
	- can be rolled back because it saves changes when I commit changes. So, whenever I need to rollback I can otherwise I made a commit.
	- keeps physical memory assigned to data until a commit or rollback is issued
- Truncate : 
	- deletes all data in the table and keeps the structure.
	- cannot be rolled back, because it's auto committed.
	- it apply changes to the physical memory simultaneously
	- 