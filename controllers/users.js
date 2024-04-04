import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Event from "../models/Event.js";

let SALT_ROUNDS = 11;
let TOKEN_KEY = "heresalongkeyforsecurity";

if (process.env.NODE_ENV === "production") {
  SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
  TOKEN_KEY = process.env.TOKEN_KEY;
}

const today = new Date();
const exp = new Date(today);
exp.setDate(today.getDate() + 30);

export const signUp = async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({
      firstName,
      lastName,
      email,
      password_digest,
      savedEvent: [],
    });

    await user.save();

    const payload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      exp: parseInt(exp.getTime() / 1000),
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    response.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    response.status(400).json({ error: error.message });
  }
};

export const signIn = async(request, response) => {
    try {
        const { email, password } = request.body;

        const user = await User.findOne({ email: email }).select("firstName lastName email password_digest");

        if (await bcrypt.compare(password, user.password_digest)) {
            const payload = { 
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                exp: parseInt(exp.getTime() / 1000),
            };

            const token = jwt.sign(payload, TOKEN_KEY);
            response.status(201).json({ token });
        } else {
            response.status(401).send("Invalid Credentials");
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ error: error.message });
    }
};

export const verify = async (request, response) => {
    try {
        const token = request.headers.authorization.split(" ")[1];//need to verify the indice!
        const payload = jwt.verify(token, TOKEN_KEY);
        console.log(payload);
        if (payload) {
            response.json(payload);
        }
    } catch (error){
        console.log(error.message):
        response.status(401).send("Not Authorized");
    }
};

export const getSavedEvents = async (request, response) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, TOKEN_KEY);

        if (payload) {
            const events = await User.findById(payload.id)
                .select("savedEvents")
                .populate("savedEvents");
            response.json(events);
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};


export const updateSavedEvents = async (request, response) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, TOKEN_KEY);

        if (payload) {
            const userId = payload.id;
            const { savedEvent } = request.params; //confirm this is passing event.id

            await User.findByIdAndUpdate(userId, {
                $addToSet: { savedEvent: savedEvent},
            });

            response.json({message: "Followed Successfully"});
        }
    } catch (error){
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};


export const updateUser = async (request, response) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, TOKEN_KEY);

        if (payload) { 
            const { firstName, lastName, email, password, updatedPassword } = request.body;

            const user = await User.findById(payload.id).select("firstName lastName email password_digest");

            if (firstName, lastName) {
                const updated_user = await User.findByIdAndUpdate(user._id, { firstName, lastName })

                const updated_payload = {
                    id: updated_user._id,
                    firstName: updated_user.firstName,
                    lastName: updated_user.lastName,
                    email: updated_user.email,
                    exp: parseInt(exp.getTime() / 1000)
                };

                const updated_token = jwt.sign(updated_payload, TOKEN_KEY);
                response.status(201).json({ token: updated_token });
            } else {
                if (await bcrypt.compare(password, user.password_digest)) {
                    const new_password_digest = await bcrypt.hash(updatedPassword, SALT_ROUNDS);

                    const updated_user = await User.findByIdAndUpdate(user._id, { password_digest: new_password_digest});

                    const updated_payload = {
                        id: updated_user._id,
                        firstName: updated_user.firstName,
                        lastName: updated_user.lastName,
                        email: updated_user.email,
                        exp: parseInt(exp.getTime() / 1000)
                    };

                    const updated_token = jwt.sign(updated_payload, TOKEN_KEY);
                    response.status(201).json({ token: updated_token });
                    }
                }
            }
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }
    };


export const deleteUser = async (request, response) => {
    try {
        const { id } = request.params;
        const deleted = await User.findByIdAndDelete(id);

        if (deleted) { 
            return response.status(200).send("User deleted");
        }

        throw new Error("User not found");
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};