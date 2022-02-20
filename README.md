# Incident Management Application

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
  "proxy": "http://express-server:5000",
```

## ToDoList

### MVP

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
