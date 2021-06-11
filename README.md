### 📝 Backend Requirements
* MongoDB 4.4 or higher
* Node.js 14 or higher

### 💻 Tricks for development
* Run npm i 
* Run app in dev mode: `npm run dev`
* Run the linter: `npm run lint`
* Run the tests: `npm run test` 
* Delete all log files: `npm run clean`

#Mutations 
mutation registerUser {
   registerUser(email:"testTest@gmail.com", password:"1231Aas^%d#23"){
    token
  }
}
  
mutation authUser {
   authUser(email:"testTest@gmail.com", password:"1231Aas^%d#23"){
    token
  }
}


    

