import * as dotenv from "dotenv"
import { Config } from "drizzle-kit"

dotenv.config()

const { DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } = process.env
const connectionString = `mysql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?ssl={"rejectUnauthorized":true}`

const config: Config = {
    schema: "./src/db/schema",
    "driver": "mysql2",
    dbCredentials: {
        connectionString: connectionString,
    }
}

export default config
