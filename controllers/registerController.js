const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

// The quick way to stimulate a database
const fsPromises = require('fs').promises;
const path = require('path');
// Before we hash the password, we need to install a package called bcrypt
// type: npm i bcrypt
const bcrypt = require('bcrypt');

// define the user handler object
const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res.status(400).json({ 'message': 'Username and password are required.' });
    // Check if the user dublicated or not in the database
    const duplicated = usersDB.users.find(u => u.username === user);
    if (duplicated)
        return res.sendStatus(409); // Conflict
    try {
        // encrypt the password before storing it to the database
        // and hash the password with 10 rounds of salt
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store the new user to the database
        const newUser = { username: user, password: hashedPwd };
        usersDB.setUsers([...usersDB.users, newUser]);
        // write the new user to the users.json file
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        return res.status(201).json({
            'message': `New user ${user} is created successfully.`
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            'message': `${err.message}`
        });
    } 
}

module.exports = { handleNewUser };
