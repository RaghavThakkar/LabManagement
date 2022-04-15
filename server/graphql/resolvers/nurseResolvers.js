import User from "../../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {private_key} from '../../helpers/keys.js';
import EmergencyAlert from "../../models/emergencyalert.js";
import UserInfo from "../../models/userinfo.js";
import VitalSigns from "../../models/vitalsigns.js";
import Motivation from "../../models/motivation.js";

export default {
    userById: async ({id}, req) => {
        // if (!req.isAuth) {
        //     throw new Error("Unauthorized");
        // }
        console.log(id);
        const userInfo = User.findById(id).exec()
        if (!userInfo) {
            throw new Error('Error')
        }

        return userInfo;
    },
    users: async ({}, req) => {
        // if (!req.isAuth) {
        //
        //     throw new Error("Unauthorized");
        // }
        const userInfo = User.find().exec()
        if (!userInfo) {
            throw new Error('Error')
        }

        return userInfo;
    },
    userByType: async ({type}, req) => {
        // if (!req.isAuth) {
        //
        //     throw new Error("Unauthorized");
        // }
        const userInfo = User.find({usertype:type}).exec()
        if (!userInfo) {
            throw new Error('Error')
        }

        return userInfo;
    },
    registration: async (args) => {
        const newStudent = new User(args.userInput);
        const student = await newStudent.save();
        return student
    },
    login: async ({email, password}) => {
        console.log(email);
        try {
            const user = await User.findOne({email});
            if (!user) {
                throw new Error('Invalid Credentials!user')
            }
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (!isCorrectPassword) {
                throw new Error("Invalid Credentials!password")
            }
            const token = jwt.sign({_id: user._id, email: user.email}, private_key, {
                algorithm: "RS256"
            });
            return {
                token,
                userId: user._id
            }
        } catch (error) {
            return error
        }
    },
    updateUser: async ({id, studentInput}, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthorized");
        }
        console.log(studentInput)
        const newUser = new User(studentInput);
        await User.findOne({_id: id}, (err, data) => {
            if (err) {
                return {
                    success: false
                }
            }
            data.firstName = newUser.firstName
            data.lastName = newUser.lastName
            data.address = newUser.address
            data.city = newUser.city
            data.phone = newUser.phone
            data.program = newUser.program
            data
                .save()
                .then(() => {
                    return {
                        success: true
                    }
                })
                .catch(error => {
                    return {
                        success: false
                    }
                })
        }).exec()

    },
    deleteUserById: async ({id}, req) => {
        if (!req.isAuth) {

            throw new Error("Unauthorized");
        }
        await User.findOneAndDelete({_id: id}, (err, movie) => {
            if (err) {
                return {success: false}
            }

            if (!movie) {
                return errorMessage(res);
            }

            return {success: true}
        }).catch(err => console.log(err))
    },
    createEmergencyAlert: async (args) => {
        const eAlert = new EmergencyAlert(args.input);
        //todo send email
        try {
            const student = await eAlert.save();
            return {success: true}
        } catch (e) {
            return {success: false}
        }
    },
    createDailyInformation: async (args) => {
        const input = new UserInfo(args.input);
        try {
            const response = await input.save();
            return {success: true}
        } catch (e) {
            return {success: false}
        }
    },
    createDailyMotivationalFeed: async ({title,description,videoURL}) => {
        const input = new Motivation();
        input.title=title
        input.description=description
        input.videoURl=videoURL
        try {
            const response = await input.save();
            return {success: true}
        } catch (e) {
            console.log(e.message)
            return {success: false}
        }
    },
    enterVitalInfo: async (args) => {
        const input = new VitalSigns(args.input);
        try {
            const response = await input.save();
            return {success: true}
        } catch (e) {
            return {success: false}
        }
    },
    vitalInfoList: async ({}, req) => {
        if (!req.isAuth) {

            throw new Error("Unauthorized");
        }
        const data = VitalSigns.find().exec()
        if (!userInfo) {
            throw new Error('Error')
        }

        return data;
    },
    motivationalList: async ({}, req) => {
        // if (!req.isAuth) {
        //     throw new Error("Unauthorized");
        // }
        const data = Motivation.find().exec()
        if (!data) {
            throw new Error('Error')
        }

        return data;
    }

}