const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('');


// Register
const register = async(req, res) => {
    try {
        const { username, password } = req.body;
    
        //check if user exist
        const findUser = await User.findOne({ username:username})
        if(findUser){
            return res.status(400).json({msg: 'User already exist'})
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send('User  registered');

    } catch (err) {
        throw new Error("something went wrong");
    }
};

// Login
const login = async (req, res) => {
    try {
        
        const { username, password } = req.body;

        //user doesn't exist 
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('User  not found');
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        throw new Error("", error);
    }
    
};


module.exports = { register, login };