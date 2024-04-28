import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.statics.encryptPassword = async (password) => {
    const salt =  bcrypt.genSaltSync(10);
    return  bcrypt.hashSync(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    console.log(password)
    console.log(password, receivedPassword)
    return bcrypt.compareSync(password, receivedPassword)
};

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();   
})

export default model("User", userSchema);