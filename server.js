const dotenv = require("dotenv")
const app = require("./app")

dotenv.config({ path: "src/configs/config.env" })

const server = app.listen(process.env.SERVER_PORT, () => {
    console.log(
        `Server started at port ${process.env.SERVER_PORT} in ${process.env.NODE_ENV}`
      );
})