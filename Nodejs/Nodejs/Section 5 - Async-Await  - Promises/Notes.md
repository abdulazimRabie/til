Task we want to accomplish
1- Read the dog type from `dog.txt`.
2- Make an http request using `axios` library and get random picture for this dog type.
3- Create a new file that contains the dog image.

## Naive Solution
This Solution leads to a callback hell (callback inside a callback)
```JS
fs.readFile(`${__dirname}/dog.txt`, (error , DogType) => {
    if (error) return console.log("An Error has happend");
    axios
        .get(`https://dog.ceo/api/breeds/image/random`)
        .then(response => {
            console.log(response.data);
            fs.writeFile(`${DogType}.txt`, `image: ${response.data.message}`, (error) => {
                if (error) return console.log("Canot Write A New File");
                console.log("Randon image of new dog has been written to a new file");
            })
        })
        .catch(error => {
            console.log("An Error Has Happend");
        })
})
```

## Promise Solution
Promise solution comes to make it more clear and readable. The problem was that we have to make this callback hell because each step depends on the previous one.

So, we are gonna ==make each task as a promise==. Then we use the resolve and reject function to decide if we will go through the next task or we exit the process.

```JS
const readFilePro = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/${fileName}.txt`, "utf-8", (error, DogType) => {
            if (error) reject("Cann't read the file");
            resolve(DogType);
        })
    })
}

const writeFilePro = (fileName, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${fileName}.txt`, `Image : ${content}`, (error) => {
            if (error) reject("Cann't write a new file");
            resolve("new file has been cerated");
        })
    })
}

readFilePro("dog")
    .then(dogName => {
        return axios.get(`https://dog.ceo/api/${dogName}/image/random`)
    })
    .then(response => {
        return writeFilePro('new-dog', response.data.message);
    })
    .then(_ => {
        console.log("Process completed successfully");
    })
    .catch(error => {
        console.log(error);
    })
```


## Async/Await Solution
Async/Await comes to handle the promise and makes you read it as sync code but in it perform async as usual.

```JS
const dogProcess = async () => {
    try {
        const dogName = await readFilePro('dog');
        // const response = await axios.get(`https://dog.ceo/api/${dogName}/image/random`);
        const resPro1 = axios.get(`https://dog.ceo/api/${dogName}/image/random`);
        const resPro2 = axios.get(`https://dog.ceo/api/${dogName}/image/random`);
        const resPro3 = axios.get(`https://dog.ceo/api/${dogName}/image/random`);

        const responses = await Promise.all([resPro1, resPro2, resPro3]);
        const imgs = responses.map(res => res.data.message).join("\n");
        
        await writeFilePro('3-new-dog', imgs);
    } catch(error) {
        console.log(error);
        throw error;
    }
    return "Process Completed";
}

dogProcess()
    .then(message => console.log(message))
    .catch(error => console.log(error));

```

- Async function return promise by default.
- `Throw error` : it is used to handle the `catch` function later.
- We wait for the response value. so this means we store the response to the variables
- If any promise had an error, this error will be thrown to the catch and the catch will handle it.