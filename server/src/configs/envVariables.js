exports.SERVER_NAME = 'Theatrix';
exports.PORT = 3000;
//exports.DB_CONNECTION = `mongodb://127.0.0.1:27017/${this.SERVER_NAME}DB`;
exports.DB_CONNECTION = `mongodb+srv://theatrix:SHEISWASMYSIN87@theatrix.cztq6lz.mongodb.net/?retryWrites=true&w=majority&appName=Theatrix`
exports.SALTS = 10; // default - 10
exports.SECRET = '!D!e09i0n384,s-57vmay3985lhnd95lvn34957vbna738509yl-220fmwni';
exports.TOKEN_EXPIRATION = 400; //As of Chrome release M104 (August 2022) cookies can no longer set an expiration date more than 400 days
exports.SESSION_COOKIE_NAME = 'user';
exports.USER_MIN_STRENGTH = 3;
exports.PASS_MIN_STRENGTH = 8;
exports.CITY_MIN_STRENGTH = 3;
exports.MAX_STRENGTH = 21;
exports.ADMIN_IP_ADDRESS = "79.100.51.7"
exports.CORS_ORIGIN = "http://localhost:5173"
exports.CORS_ORIGIN_SSL = "https://localhost"
exports.CORS_ORIGIN_2 = "http://127.0.0.1:5173"
exports.CORS_ORIGIN_2_SSL = "https://127.0.0.1"
exports.CORS_ORIGIN_3 = "http://192.168.31.14:5173"
exports.CORS_ORIGIN_3_SSL = "https://192.168.31.14"
exports.CORS_ORIGIN_4 = "http://192.168.56.1:5173"
exports.CORS_ORIGIN_4_SSL = "https://192.168.56.1"
exports.CORS_ORIGIN_5 = "https://theatrix-angular-pwa.onrender.com"
exports.CORS_ORIGIN_6 = "https://theatrix.vercel.app"
exports.CORS_ORIGIN_7 = "https://treactrix.vercel.app"
exports.CORS_ORIGIN_8 = "https://theatrix-vue.vercel.app"


