const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

	
//const commentRoutes    = require("./routes/comment"),
const blogRoutes = require("./routes/blog");
const indexRoutes      = require("./routes/index");
const userRoutes=require("./routes/user");
const categoryRoutes=require("./routes/category");
const tagRoutes=require("./routes/tag")
mongoose.connect("mongodb://localhost/legex", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
var app=express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('public'));
//app.use(methodOverride("_method"));

app.use(indexRoutes);
app.use(userRoutes);
app.use(tagRoutes);
app.use(categoryRoutes);
app.use(blogRoutes);
//app.use(commentRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT,function(){
	console.log(`Server running on PORT ${PORT}`);
});