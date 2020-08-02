const withCSS=require('@zeit/next-css');
const withImages = require('next-images')



module.exports=withImages(withCSS({
    publicRuntimeConfig:{
        APP_NAME:'Legex_BLOG',
        API_DEVELOPMENT:'http://localhost:8000/api',
        PRODUCTION:false
    }
}));