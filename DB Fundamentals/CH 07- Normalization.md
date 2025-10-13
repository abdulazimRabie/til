- Normalization solves : 
	- data redundancy
	- insert/update/delete anomalies
- Functional dependency : value of A uniquely determine value of B
	- constraints between two **attributes** (columns) or two sets of columns
	- Full dependency : E_name -- (dependent) --->  E_ID{PK}
	- Partial dependency :  Dept_name -- (dependent) --> E_ID,**D_ID** {composite PK}
	- Transitive dependency :  phone -- (dependent) --> instructor_ID --- (dependent) --> course_ID

## 1st Normal Form
- no multivalued attribute
- no repeating group
- no composite attribute

| StudentID | StudentName  | PhoneNumbers             | Address                           | Subjects                    | Grade      |
| --------- | ------------ | ------------------------ | --------------------------------- | --------------------------- | ---------- |
| 1         | Ahmed Ali    | 01011112222, 01233334444 | (City: Cairo, Street: Tahrir St.) | {Math, English}             | {A, B}     |
| 2         | Sara Mostafa | 01555556666              | (City: Giza, Street: Nile St.)    | {Science, History, English} | {A, A-, C} |
- student_phones (**s_id, phone**)
- student_subjects(**s_id, subject**, grade)
- student_address(**s_id**, city, street)

## 2nd Normal Form
- obey 1st normal form
- **each non-key attribute must depend on all key attribute (even if the key attribute is composite)**
e.g: 
- `enrollment(course_id, student_id, grade, instructor)` 
- grade <--- (dependent)--- course_id, student_id {pk} : full dependency (OK)
- instructor <--(dependent)-- course_id : partial dependency (NOT OK)
- apply 2nd normal form : 
	- `enrollment(course_id, student_id, grade)` 
	- `course(course_id, instructor_id)`
![](../assets/2nd_normal_form.png)
## 3rd Normal Form
- obey 2nd normal form
- **no transitive dependency**
e.g:
- `course(course_id, instructor, phone)`
- phone <--- (dependent) -- instructor <--(dependent)-- course_id
- solution : apply 3rd normal form
- `course(course_id, instructor_id)`
- `instructor(instructor_id, phone)`
![](../assets/3rd_normal_form.png)
