const User = require('../../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
exports.registerUser = async (req, res) => {
    try {
        const { name, mobile, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

        const newUser = new User({ name, mobile, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
}

// User Login
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token,user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to login user', error: error.message });
    }
}

//Add User
// exports.addUser = async (req,res) => {
//    try {
//      const { name, mobile, email, password } = req.body;
//         const userExist = await User.findOne({email});
//         if (userExist) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
//         const newUser = new User({ name, mobile, email, password: hashedPassword, otp });
//         await newUser.save();
//         res.status(201).json({ message: 'User added successfully', user: newUser });
//    } catch (error) {
//       console.log(error);
//         res.status(500).json({ message: 'Error while creating user', error: error.message });
//    }
// }

//  Get all users
// exports.getAllUsers = async (req, res) => {
//     try {
//         const Users = await User.find();
//         return res.status(200).json({ message: 'All Users fetched successfully', data: Users });
//     } catch (error) {
//         console.error('Error in getAllUsers:', error);
//         return res.status(500).json({ message: 'Failed to fetch Users', error: error.message });
//     }
// };

// Get user by ID
// exports.getAllUsersById = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const Users = await User.findById(id);
//         if (!Users) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         return res.status(200).json({ message: 'User fetched successfully', data: Users });
//     } catch (error) {
//         console.error('Error in getUserById:', error);
//         return res.status(500).json({ message: 'Failed to fetch User', error: error.message });
//     }
// };

// Update User
// exports.updateUser = async (req, res) => {          
//     try {
//         const { id } = req.params;
//         const updates = req.body;

//         if (updates.password) {
//             updates.password = await bcrypt.hash(updates.password, 10);
//         }

//         const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         return res.status(200).json({ message: 'User updated successfully', data: updatedUser });
//     } catch (error) {
//         console.error('Error in updateUser:', error);
//         return res.status(500).json({ message: 'Failed to update User', error: error.message });
//     }
// }   

// exports.deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedUser = await User.findByIdAndDelete(id);
//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         return res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//         console.error('Error in deleteUser:', error);
//         return res.status(500).json({ message: 'Failed to delete User', error: error.message });
//     }
// }   

// Forget Password
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Create a reset token valid for 15 mins
//     const resetToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     );

//     // TODO: Send token via Email/SMS (using Nodemailer or Twilio)
//     // For now, just send it in response
//     return res.status(200).json({
//       message: "Password reset token generated",
//       resetToken,
//     });
//   } catch (error) {
//     console.error("Error in forgotPassword:", error);
//     return res.status(500).json({ message: "Error in forgot password", error: error.message });
//   }
// };

// Reset Password
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;

//     await user.save();

//     return res.status(200).json({ message: "Password reset successful" });
//   } catch (error) {
//     console.error("Error in resetPassword:", error);
//     return res.status(500).json({ message: "Invalid or expired token", error: error.message });
//   }
// };
