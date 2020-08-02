var mongoose=require("mongoose");
var categorySchema=new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        slug: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true
        },
    },
    { timestamp: true }
);




module.exports= mongoose.model("Category",categorySchema);

