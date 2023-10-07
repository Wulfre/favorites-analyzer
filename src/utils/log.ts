import chalk from "chalk"
import logger from "loglevel"
import { env } from "~/lib/env"

type StyleOptions = { color: typeof chalk; badge: string }

// after setting your style here, you must also add a method to the log object below
const styles = new Map<string, StyleOptions>([
    ["debug", { badge: "🐛", color: chalk.green }],
    ["info", { badge: "📘", color: chalk.blueBright }],
    ["warn", { badge: "🚧", color: chalk.yellow }],
    ["error", { badge: "💥", color: chalk.red }],
    ["remind", { badge: "🔮", color: chalk.magenta }],
])
const defaultStyle = { badge: "", color: chalk.white }

const originalFactory = logger.methodFactory
logger.methodFactory = (methodName, logLevel, loggerName) => {
    const rawMethod = originalFactory(methodName, logLevel, loggerName)

    // eslint-disable-next-line ts/no-unnecessary-condition -- loggerName can be undefined
    const methodKey = loggerName === undefined ? methodName : loggerName.toString()
    const style = styles.get(methodKey) ?? defaultStyle

    const badgeSegment = style.badge
    const methodSegment = style.color(methodKey.toUpperCase())

    return rawMethod.bind(logger, `${badgeSegment} ${methodSegment}`)
}

// set level must happen after methodFactory is assigned to ensure it is applied
[logger, ...Object.values(logger.getLoggers())].forEach((logger) => {
    logger.setLevel(env.NEXT_PUBLIC_ENV === "development" ? "debug" : "info")
})

// pick only one method off of getLogger, this is how you set the level for a custom logger
export const log = {
    debug: logger.debug.bind(logger),
    info: logger.info.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
    remind: logger.getLogger("remind").debug.bind(logger),
}
