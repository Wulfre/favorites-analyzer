import { computed, signal } from "@preact/signals"

const count = signal(0)
const double = computed(() => count.value * 2)

export default () => (
    <div class={"flex flex-col text-center"}>
        <span>{count.value}</span>
        <span>{double.value}</span>
        <button onClick={() => { count.value += 1 }}>{"+"}</button>
    </div>
)
