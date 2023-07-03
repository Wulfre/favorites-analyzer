import { Config } from "drizzle-kit"
import { env } from "./src/env"

const { DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } = env
const connectionString = `mysql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?ssl={"rejectUnauthorized":true}`

const config: Config = {
    schema: "./src/db/schema",
    "driver": "mysql2",
    dbCredentials: {
        connectionString: connectionString,
    }
}

export default config
