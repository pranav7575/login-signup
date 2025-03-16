import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: true },

    //when we are protecting the route, we can use the role to determine the access level
    role: { type: String, default: "user" },
    image: { type: String },
    //Google and Github OAuth
    authproviderId: { type: String },
});


 export default mongoose.models?.User || mongoose.model("User", userSchema);