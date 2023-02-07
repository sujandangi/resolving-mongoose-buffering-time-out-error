I have made this repo to explain how I resolved the following error using mongoose. You can follow the following
steps to try to resolve this error.

'MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms'

Steps that I took:
1: Uninstalled mongoDB version 6.x.x and installed version 4.x.x
    [try this only after trying other steps given below]

2: modified my code as given in test.js file
    > added 'app.use(express.json())' middleware. It parses the incoming request.
    > changed the mongoURI/Connection string to 'mongodb://127.0.0.1:27017' from 'mongodb://localhost:27017'.
     [this helped in connecting to mongoDB with ease. Trying to use 'user.save()' without connecting to mongoDB MIGHT have caused some issue. I might be wrong here.]
    > refactored the code in order to catch errors better.
    > used async/await (user.save() is an async operation)
