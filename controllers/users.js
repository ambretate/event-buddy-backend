import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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
    // console.log(error.message);
    response.status(400).json({ error: error.message });
  }
};

export const signIn = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email: email }).select(
      "firstName lastName email password_digest"
    );

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
    // console.log(error.message);
    response.status(500).json({ error: error.message });
  }
};

export const verify = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);
    if (payload) {
      response.json(payload);
    }
  } catch (error) {
    // console.log(error.message);
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
    // console.error(error);
    response.status(500).json({ error: error.message });
  }
};

export const updateSavedEvents = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);

    if (payload) {
      const userId = payload.id;
      const { eventId } = request.params;

      // Ensure savedEvent is an array
      const eventIds = Array.isArray(eventId) ? eventId : [eventId];

      await User.findByIdAndUpdate(userId, {
        $addToSet: { savedEvents: { $each: eventIds } },
      });

      response.json({ message: "Saved Successfully" });
    }
  } catch (error) {
    // console.error(error);
    response.status(500).json({ error: error.message });
  }
};

export const deleteSavedEvents = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);

    if (payload) {
      const userId = payload.id;
      const { eventId } = request.params;

      const eventIds = Array.isArray(eventId) ? eventId : [eventId];

      await User.findByIdAndUpdate(userId, {
        $pull: { savedEvents: eventId },
      });

      response.json({ message: "Removed successfully" });
    }
  } catch (error) {
    // console.error(error);
    response.status(500).json({ error: error.message });
  }
};

export const updateUser = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);

    if (payload) {
      const {
        firstName,
        lastName,
        oldPassword,
        password,
        passwordConfirmation,
      } = request.body;

      const user = await User.findById(payload.id).select(
        "firstName lastName password_digest"
      );

      if ((firstName, lastName)) {
        const updated_user = await User.findByIdAndUpdate(user._id, {
          firstName,
          lastName,
        });

        const updated_payload = {
          id: updated_user._id,
          firstName: updated_user.firstName,
          lastName: updated_user.lastName,
          email: updated_user.email,
          exp: parseInt(exp.getTime() / 1000),
        };

        const updated_token = jwt.sign(updated_payload, TOKEN_KEY);
        response.status(201).json({ token: updated_token });
      } else {
        if (await bcrypt.compare(oldPassword, user.password_digest)) {
          const new_password_digest = await bcrypt.hash(
            passwordConfirmation,
            SALT_ROUNDS
          );

          const updated_user = await User.findByIdAndUpdate(user._id, {
            password_digest: new_password_digest,
          });

          const updated_payload = {
            id: updated_user._id,
            firstName: updated_user.firstName,
            lastName: updated_user.lastName,
            email: updated_user.email,
            exp: parseInt(exp.getTime() / 1000),
          };

          const updated_token = jwt.sign(updated_payload, TOKEN_KEY);
          response.status(201).json({ token: updated_token });
        }
      }
    }
  } catch (error) {
    // console.error(error);
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
    // console.error(error);
    response.status(500).json({ error: error.message });
  }
};
