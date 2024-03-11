const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
    const email = req.params.email;
    const filtered_users = users.filter(item => item.email === email);

    res.send(filtered_users);
});


// POST request: Create a new user
router.post("/",(req,res)=>{
    const newUser = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        email: req.query.email,
        DOB: req.query.DOB
    }
    users.push(newUser);
    
    res.send(`An user named "${newUser.firstName} ${newUser.lastName}" has been added successfully!`);
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;
    const filtered_users = users.filter(item => item.email === email);

    if(filtered_users.length > 0) {
        let filtered_user = filtered_users[0];
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const DOB = req.body.DOB;
        
        if (DOB) {
            filtered_user.DOB = DOB;
        }
        
        if (firstName) {
            filtered_user.firstName = firstName;
        }
        
        if (lastName) {
            filtered_user.lastName = lastName;
        }

        users = users.filter(user => user.email !== email);
        users.push(filtered_user);
        res.send(`User with the ${email} updated successfully`);
    } else {
        res.send("unable to find the user");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    const email = req.params.email;
    users = users.filter(user => user.email !== email);

    res.send(`User with the email ${email} deleted`);
});

module.exports=router;
