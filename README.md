# Incident Management Application

## Tech Stack

- Tech Stack: React, Node, Express, MongoDB
- Main Dependencies:express, dotenv, mongoose, jsonwebtoken, bcrypt, axios, styled-components
- Other dependencies: http-status-codes
- Images: https://undraw.co/illustrations
- Design: Figma https://www.figma.com/file/aOmg1JxetWpgWhHFeOFPpK/Incidentally?node-id=0%3A1

## Some Considerations Before Starting

### 1. ESModule instead of Commonjs (which is shipped by default in Nodejs)

Read that ES module was created to standardize the JavaScript module system. It is also more in sync with the front end codes that uses import/export syntax instead of require(). There are 3 ways to 'activate' es module for nodejs, i prefer to the following:

```
// add this to server-side package.json
"type": "module"
```

### 2. Concurrently

To allow me to start the express server and react frontend concurrently in 1 terminal instead of opening 2 terminals

```
// add this in package.json
  "start": "concurrently --kill-others-on-fail \"npm run server\" \" npm run client\"",
```

### 3. Mongoose

A object modelling tool for MongoDB. Using mongoose, I can define the schema for the MongoDB Document.
Has built-in type casting, validation, query etc out of the box. It also has the pre middleware functions that can be called before we call the mogoose.model().
Allows me to hash the user password beforehand.

```JavaScript
//Reference: https://mongoosejs.com/docs/middleware.html#pre
// this func will be called before doc is saved to db
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // next();
});

```

### 4. Use Styled Components (CSS-in-JS)

Reduce the need to have alot of classnames as it automatically generate unique classname for our CSS styles.
Can also pass in props to styled-components.

### 5. Use Postman to pre-plan API

### 6. Use Mongo Atlas GUI for easier management of data

### 7. Quick Design Sketch on Figma

https://www.figma.com/file/aOmg1JxetWpgWhHFeOFPpK/Incidentally?node-id=0%3A1

### 8. Import all components into index.js file to export together

### 9. useContext

```javaScript
// create context in appContext.js for global states to be used in any components
const AppContext = React.createContext();

// define initialState
const initialState = {showAlert: false, user: user ? JSON.parse(user) : null,}

const AppProvider = ({ children }) => {
  // define children functions
  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
}

//define & export a useAppContext function to be used in any components
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };

// accessing children component via useAppContext()
const { user, showAlert } = useAppContext();

```

### 10. Reducer & Action

### 11. Add a 404 Page for User Friendliness

### 12. Use http-status-codes pacakage

```JavaScript
import { StatusCodes } from "http-status-codes";
StatusCodes.BAD_REQUEST //400
StatusCodes.UNAUTHORIZED //401
StatusCodes.NOT_FOUND //404
StatusCodes.INTERNAL_SERVER_ERROR //500
```

### 13. Save User to Local Storage to persist login

```JavaScript
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
```

### 14. Use Axios Interceptors to check JWT tokens to avoid writing repeated codes

We can think of axios interceptors like a middleware: https://axios-http.com/docs/interceptors

```JavaScript
// typically written like this
const updateUser = async(currentUser) =>{
  try{
    const {data} = await axios.patch('api/auth/updateUser', currentUser, {
      // avoid repeating this header auth portion in every function
      headers:{
        Authorization: `Bearer ${state.token}`
      }
    })
  } catch(error){
    console.log(error.response)
  }
}

  // Using axios interceptors
  // Add a request interceptor
  const authFetch = axios.create({
    baseURL: "/api",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  // allow us to isolate and check for 401 errors
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser(); //force logout if 401
      }
      return Promise.reject(error);
    }
  );

//rewrite using authFetch
 const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/users/update", currentUser);
      const { user, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };
```

## Start Up the Application

### Start Docker Container

```
docker-compose build
docker-compose up
```

### Access Client - ReactJS

```
http://localhost:3000
```

### Access Server - Express

```
http://localhost:5000

```

For Docker, to change proxy in client's package.json to this:

```
  "proxy": "http://<container_name>:5000",
  "proxy": "http://express-server-incidentally:5000",
```

![Image1](/client/public/images/img01.jpg)
![Image2](/client/public/images/img02.jpg)
![Image3](/client/public/images/img03.jpg)
![Image4](/client/public/images/img04.jpg)

### ToDoList

- Design a simple Wireframe
  - Login Page
  - Dashboard Page
- Consists of User and Admin user
- Admin - Create, Read, Update, Delete
  - Raise incident as Admin
    - Set incident type & priority
    - Once raised, incident is open
  - Assign incident to a User
  - Receive user acknowledgement of raised incident
- User - Read, Update
  - Cannot raise incident (only Admin)
  - Acknowledge incident assgined by Admin
  - Resolve incident
  - Once resolved, incident is closed
  - Cannot Delete incident
- Dashboard Design
  - Split-pane Table
  - Indexing of incidents
  - Filter/Sort by Date created/updated
  - Filter/Sort by Incident Type
  - Filter/Sort by Priority
  - Filter/Sort by Open or Close Cases
  - Pagination (react-split-pane)

### Bonus

- Search function
- Nice alerts messages (react-toastify)

### express-async-errors

Does try/catch and next(err) for you

```
const userRegister = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};
```
