This Repo is the backend for the application.

Follow below steps to start the server:

1. clone the repo
 
2. open terminal/cmd line and change directory

3. run the command "npm install"
   
4. create a ".env" file and add below content inside doc string
 
'''
   PORT=8000

   MONGO_URI=mongodb+srv://<username>:<password>@cluster1.3yhlt3j.mongodb.net/msme-db?retryWrites=true&w=majority

'''

Note: Do change the mongo db uri as per your DB server
 
Note:  Dont change the port number otherwise it needs to be changed in the frontend apps in "api.js" file

6. run the command "npm run dev"
   
7. Server will be started.
