## Connecting database to our application

Steps to connect database : 
- 1 => string connection needed
- 2 => store string connection in the `config.env` file
- 3 => store database password in the `config.env` file (best practice)
- 4 => install mongoose library `npm i mongoose`
- 5 => start connecting

`config.env`

- DATABASE => remote database
- DATABASE_LOCAL => local database (you can connect local or remote)
- DATABASE_PASSWORD => password that will be used later

```env
DATABASE=mongodb+srv://abdorabie14:<db_password>@hera.2uo1e.mongodb.net/?retryWrites=true&w=majority&appName=hera
DATABASE_LOCAL=mongodb://localhost:27017/natours-test
DATABASE_PASSWORD=MY_PASSWORD_I_WONT_WRITE_IT_HERE_OF_COURSE 
```

```js
const mongoose = require("mongoose");
const dotenv = require("dotev");
const app = require("./app.js")

dotenv.config({path: "./config.env"})

const DB = process.env.DATABASE.replace("<db_password>", process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(connectionObj => {
	console.log(connectionObj.connections);
	console.log("database has been connected successfuly!!");
})

app.listen(300, "localhost", () => {
	console.log("server is running")
})
```

- `connect()` function of mongoose returns a promise, so we handle it with `then`


## What is mongoose
- Mongoose is a object data modeling (ODM) for MongoDB and nodejs, a higher level of abstraction.
- Mongoose allows for rapid and simple development of mongodb  database interactions.
- Features : schema to model data and relationships,  easy data validation , simple query API, middleware, etc....
- **Mongoose schema** : where we model our data by describing the structure of the data, default values , and validations.
- **Mongoose model** : a wrapper of schema, providing an interface to the database for CRUD operation
## Creating a simple schema

```js
const tourSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, "A tour name is a must"],
        unique: true
    },
    price: {
        type: Number,
        required: [true, "A tour price is a must"]
    },
    rating: {
        type: Number,
        default: 0
    }
})
```

- you can use only data type instead of specifying the schema data option object
```js
const tourSchema = mongoose.Schema({
	name: String,
	price: Number,
	rating: Number
})
```

- after you define the schema, you create a model
- model name always start with uppercase (it's a naming convention for models)
```js
const Tour = mongoose.model("Tour", tourSchema)
```

### **Parameters of `mongoose.model()`**

1. **`modelName`**:
    
    - This is the **name of the model**.
    - It is a **string** and serves as an identifier for the collection in MongoDB.
    - **Naming Convention**:
        - Use **singular**, **PascalCase** (e.g., `User`, `Product`, `Tour`).
        - Mongoose will automatically **pluralize** this name to determine the collection name in the database.
            - Example: `mongoose.model("Tour", tourSchema)` maps to the `tours` collection in MongoDB.
    - If you don't want Mongoose to pluralize the name automatically, you can specify a custom collection name in the schema options (discussed below).
2. **`schema`**:
    
    - This is a **Mongoose schema object** that defines the structure of the documents in the model's collection.
    - It acts as a blueprint for the data, defining fields, their data types, default values, validation rules, and more.
        - Example:
```js
const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

```


## Creating a document and testing model
Now, you will use the model to create a document.
- `save()` function is used to save the document to the database
- `save()` function returns a promise that respond with either the saved document or the error

```js
const Tour = mongoose.model("Tour", tourSchema);

const toursTest = new Tour({
    name: "The Forest Hiker",
    price: 234,
    rating: 3.4
})

toursTest
    .save()
    .then(doc => {
        console.log(doc);
    })
    .catch(error => {
        console.log("Error : ", error);
    })
```


## MVC Architecture , types of logic 

MVC stands for (Model - View - Controller)
- Model -> business logic
- Controller -> application logic
- View -> presentation logic

![](./assets/mvc.png)

- Difference between application logic
![](./assets/application_business_logic.png)

In real world application we can't separate application logic and business logic, because they may overlap usually.
## Creating model folder

`Models/tour.js`
```js
const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, "A tour name is a must"],
        unique: true
    },
    price: {
        type: Number,
        required: [true, "A tour price is a must"]
    },
    rating: {
        type: Number,
        default: 0
    }
})

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
```

## Creating Document 

There is tow ways for creating a document.
- using constructor `new Tour({})`
- using `create` method `Tour.create({})`
```js
exports.createTour = (req, res) => {
    const newTour = new Tour({
        ...req.body
    })

    newTour.save()
    .then(savedTour => {
        res.status(201).json({
            status: "success",
            data : {
                tours: savedTour
            }
        })
    })
    .catch(error => {
        res.status.json({
            status: "failed",
            error: error.message
        })
    })
};
```

We can refactor the above code by using `tray/catch` instead of `then/catch`

```js
export.createTour = async(req, res) => {
	try {
		const newTour = await Tour.create(req.body); // this creates and save document 

		res.status(201).json({
			status: "success",
			data: newTour
		})
	} catch(error) {
		res.status(400).json({
			message: "fail",
			message: "Can't create a new tour"
		})
	}
}
```

### 1. **`new Tour({}).save()`**

#### How it works:

- You create an instance of the Mongoose model using the `new` keyword and pass the data as an object.
- You then call the `.save()` method on the instance, which validates the data and saves it to the database.

#### Example:

```js
const newTour = new Tour({   name: "Grand Canyon Adventure",   price: 499, }); await newTour.save();
```

#### Use cases:

- **Custom Pre-save Logic**: You can manipulate or modify the document instance (e.g., setting default values or running custom logic) before saving it.
- **Partial Saves**: You can create a document, modify it later, and then save it to persist changes.
- Useful when you need access to the document instance before it’s saved.

#### Features:

- Explicit creation of the document instance allows fine-grained control before saving.
- **Trigger Middleware**: Mongoose `pre` and `post` middleware for `save` are triggered.
- You can save the document at a later point, not immediately.

---

### 2. **`Tour.create()`**

#### How it works:

- `Tour.create()` is a shorthand method that combines the creation and saving steps into one operation.
- You pass the data directly to `create()` as an object, and Mongoose handles both creating the document instance and saving it.

#### Example:

```js
await Tour.create({   name: "Grand Canyon Adventure",   price: 499, });
```

#### Use cases:

- When you don’t need to modify the document or perform operations before saving.
- Ideal for quick and straightforward document creation.

#### Features:

- Combines the creation and save steps in a single call.
- **Trigger Middleware**: Mongoose `pre` and `post` middleware for `save` are **not triggered**, but `pre` and `post` middleware for `insertMany` are triggered.
- Automatically saves the document after creation.

## Reading documents
- `mongoose.model("Tour").find()`
- `mongoose.model("Tour").findById()`

Find all documents
```js
exports.getAllTours = async (req, res) => {
	try {
		const tours_db = await mongoose.model("Tour").find({});
		res
	    .status(200)
	    .send({
	        status: "success",
	        data : {
	            tours: tours_db
	        }
	    });
	} catch(error) {
		res
	    .status(400)
	    .send({
	        status: "fail",
	        message: "Cann't get all tours"
	    });
	}
};
```

get a specific tour <br>
**NOTE** : it is better to create a middleware that checks if the tour is already in database and this middleware assign it as property in the request object `req.tour`
<br>
let's implement the logic inside the handler function
```js
exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id);
		res.stauts(200).json({
			status: "success",
			data: {
				tour
			}
		})
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: "Cann't get this tour ... something happend"
		})
	}
}
```

what if we did this verification in the middleware

```js
router.param("id", toursMiddleware.verifyTour)
```

```js
exports.verifyTour = async (req, res, next, id) {
	try {
		const tour = await mongoose.model("Tour").find({"_id": id});
		req.tour = tour;
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: "Failed getting the tour"
		})
	}
	
	next();
}
```

## Updating documents
To update a document you can use
- `updateOne()` : return a query
- `findByIdAndUpdate()` : you can add option to return the updated object or the original - also , you can add option to run validators again
- `findOneAndUpdate()`

let's use `findByIdAndUpdate` , it is more powerful 
- first parameter : to find the document
- second parameter : to set updates
- third parameter : to set options
	- `new` option means to return the new (updated) object
	- `runValidators` to validate object before updating (runs schema validations again)

```js
exports.updateTour = async (req, res) => {

    try {
        const updatedTour = await Tour.findByIdAndUpdate({"_id": req.params.id}, {$set : req.body}, {new: true, runValidators: true});

        res.status(202).json({
            status: "success",
            data: {
                updatedTour
            }
        })
    } catch(error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
};
```

## Deleting documents
- It is really common in REST API to **not send** any data after `delete` operation

### 1. **`deleteOne()`**

- Deletes **a single document** that matches the filter criteria.
- Returns an object indicating the number of documents deleted.

#### Example:

```js
await Tour.deleteOne({ _id: "someDocumentId" });
```
#### Response:

`{   "acknowledged": true,   "deletedCount": 1 }`

---

### 2. **`deleteMany()`**

- Deletes **all documents** that match the filter criteria.
- Returns an object indicating the number of documents deleted.

#### Example:

```js
await Tour.deleteMany({ destination: "Paris" });
```

#### Response:

`{   "acknowledged": true,   "deletedCount": 3 }`

---

### 3. **`findByIdAndDelete()`**

- Finds a document by its `_id` and deletes it.
- Returns the **deleted document** if found and deleted, or `null` if not found.

#### Example:

```js
const deletedTour = await Tour.findByIdAndDelete("someDocumentId"); console.log(deletedTour); // Logs the deleted document or null
```
---

### 4. **`findOneAndDelete()`**

- Finds a document matching the filter criteria and deletes it.
- Returns the **deleted document** if found and deleted, or `null` if not found.

#### Example:

```js
const deletedTour = await Tour.findOneAndDelete({ destination: "Paris" }); console.log(deletedTour); // Logs the deleted document or null
```

---

### When to Use Each Method

| Method                | Use Case                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------ |
| `deleteOne()`         | When you want to delete **a specific document** and don't need to return the deleted data. |
| `deleteMany()`        | When you want to delete **multiple documents**.                                            |
| `findByIdAndDelete()` | When you know the `_id` of the document and want to delete it and get its details.         |
| `findOneAndDelete()`  | When you want to delete a document by a filter and also retrieve its details.              |

```js
exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null
        })
    } catch(error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
};
```

## Modeling tours
Some properties has been added to the model.

```js
const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, "A tour name is a must"],
        unique: [true, "Tour name is unique and immutable"]
    },
    duration: {
        type: Number,
        required: [true, "A duration is a must"]
    },
    maxGroupSize : {
        type: Number,
        required: [true, "A max group size is a must"]
    },
    difficulty: {
        type: String,
        required: [true, "Difficulty is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "A tour price is a must"]
    },
    ratingAverage: {
        type: Number,
        default: 0
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    priceDiscount: {
        type: Number
    },
    summary: {
        type: String,
        required: [true, "Summary is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have a cover image"]
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startsAt: [String]

})

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
```

## Importing development data
Write a script to import/delete all documents to/from the collection.
```js
const fs = require("fs");
const mongoose = require("mongoose");
const Tour = require("./../../Models/tour");
const dotenv = require("dotenv");

dotenv.config({path: "./../../config.env"});

const DB = process.env.DATABASE.replace("<db_password>", process.env.DATABASE_PASSWORD);

const tours = JSON.parse(fs.readFileSync(`${__dirname}/cleaned-tour-data.json`));

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(_ => {
    console.log("Database Connected Successfuly");
    importData();
    // deleteData();

})

const importData = async () => {
    try {
        await Tour.insertMany(tours);
        console.log("Tours data imported Successfuly");
    } catch (error) {
        console.log("Cann't import all tours coming from tours");
        console.log(error.message);
    }
}

const deleteData = async () => {
    try {
        await Tour.deleteMany()
        console.log("All data deleted");
    } catch(error) {
        console.log("ERROR : Deleting");
        console.log(error.message);
    }
}
```

## Making API better - filtering
- Express provides `req.query` which return an object of query params
- You can use `find` method from mongodb
- Tou can use `find().where().equal()` chaining from mongoose 

```js
const {duration, difficulty} = req.query;
const tours_db = await mongoose.model("Tour").find({"duration": duration, "difficulty": difficulty})
```

```js
const {duration, difficulty} = req.query;
const tours_db = await mongoose.model("Tour").find().where("duration").equals(duration).where("difficulty").equals(difficulty);
```

Some times `req.query` will contain properties that doesn't belong to the Tour model. Such as `sorting` which is used for sorting , and `page` which is use for pagnation.

```js
const getAllTours = async () => {
    const excludedFields = ["page", "sort", "limit", "field"];
    const query = {...req.query};
    
    excludedFields.forEach(field => delete query[field]);
    const {duration , difficulty} = req.query;
    
    const tours = await Tour.find(query);
    
    res
    .status(200)
    .send({
        status: "success",
        results: tours_db.length,
        requestedAt: req.requestTime,
        data : {
            tours: tours_db
        }
    });
}
```

**NOTE** : `find` method returns a query which enables use to chain other methods like `where` , `equal`, `method` and much more. After creating a query we can await executing this query to return the object that fits with query.

```js
// Create a query
const reservedFields = ["page", "sort", "limit"];
const queryObj = {...req.query};

reservedFields.forEach(field => delete queryObj[field]);

const query = Tour.find(queryObj);;

// Execute a query
const tours_db = await query;

// Return response
res.status(200).json({
	message: "success",
	data : {
		tours : tours_db
	}
})
```
## Making API better - advanced filtering
Handling `gte`, `gt`, `lte`, `lt`
- To send this operator in the URL
```
127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy&page=1&sort=dec
```
`duration[gte]=5` : tours with duration greater than or equal 5

- Then, the query param will be return like this
```
{ duration: { gte: '5' }, difficulty: 'easy' }
```

- We are used to filter using operator by prefixing the `gte` by `$` => `$gte`
```js
Tour.find({duration : {$gte: 5}})
```

- You will need to convert `gte` to `$gte`
	- convert the query object to string
	- use regular expression to replace `gte` or `lte` with `$gte` or `$lte`
```js
let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, matched => `$${matched}`);

queryObj = JSON.parse(queryStr);

const query = Tour.find(queryObj);
const tours = await query;
```

- To write clean code, you can split it to functions. A one for `convertQueryOperator` and use it inside the handle function of getting all tours.
## Making API better - sorting

- Use `sort` method to apply sort based on properties in the documents
```js
query.sort("price");
```
- To sort descending (from larger -> smaller), prefix `-` before the property name
```js
query.sort("-price");
```
- To sort base on two properties, separate between them with space. e.g. "price duration"
```js
query.sort("price duration")
```

But how to write query parameters in the URL.
```
127.0.0.1:3000/api/v1/tours?sort=price,duration
```
So we need to convert the `,` into space to pass these properties names to the query.

```js
if (req.query.sort) {
	// if the sort has more than a property, conver "," to space
	let sortingParams = req.query.sort.split(",").join(" ");
	console.log(sortingParams);
	
	// apply sorting by passing properties to sort base on them
	query = query.sort(sortingParams);
}

let tours = await Tour.find(query);
```

You can also sort the documents to ascending order based on the recently created.

```js
if (req.query.sort) {

} else {
	query = query.sort("-createdAt");
}

const tours = await Tour.find(query);
```
