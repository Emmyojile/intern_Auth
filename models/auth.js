import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Define the user schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userImage: { 
        type: String 
    }
}, {
    timestamps: true,
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with the hashed password in the database
userSchema.methods.comparePasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create a JSON Web Token (JWT) for authentication
userSchema.methods.createJWT = function () {
    return jwt.sign({
        id: this._id,
        username: this.username
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' });
};

// Create the User model based on the userSchema
const User = mongoose.model('User', userSchema);

export default User;
