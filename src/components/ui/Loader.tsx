import type { JSX } from "preact"

export default (): JSX.Element => (
    <div className="flex justify-center" data-testid="loader">
        <span className="i-carbon:circle-dash?mask animate-spin animate-duration-3s text-15" />
    </div>
)
