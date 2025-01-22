import { useCallback, useEffect, useMemo, useState } from "react"
import NodeCG from "@nodecg/types"

export function useOnlyReplicantValue<T>(name: string, namespace?: string): T | undefined
export function useOnlyReplicantValue<T>(
    name: string,
    namespace: string | undefined,
    opts?: NodeCG.Replicant.OptionsWithDefault<T>
): T
export function useOnlyReplicantValue<T>(
    name: string,
    namespace?: string,
    opts?: NodeCG.Replicant.OptionsWithDefault<T>
) {
    const replicant = useMemo(
        () => (typeof namespace === "string" ? nodecg.Replicant(name, namespace, opts) : nodecg.Replicant(name, opts)),
        [name, namespace, opts]
    )
    const [val, setVal] = useState(opts?.defaultValue)
    useEffect(() => {
        const listener = (newVal: T | undefined, oldVal: T | undefined, operations: any) => {
            if (newVal !== oldVal) setVal(newVal)
        }
        replicant.on("change", listener)
        return () => {
            replicant.removeListener("change", listener)
        }
    }, [name, namespace, opts])
    return val
}

export function useReplicantValue<T>(name: string, namespace?: string): [T | undefined, (val: T) => any]
export function useReplicantValue<T>(
    name: string,
    namespace: string | undefined,
    opts: NodeCG.Replicant.OptionsWithDefault<T>
): [T, (val: T) => any]
export function useReplicantValue<T>(name: string, namespace?: string, opts?: NodeCG.Replicant.OptionsWithDefault<T>) {
    const replicant = useMemo(
        () => (typeof namespace === "string" ? nodecg.Replicant(name, namespace, opts) : nodecg.Replicant(name, opts)),
        [name, namespace, opts]
    )
    const [val, setVal] = useState(opts?.defaultValue)
    useEffect(() => {
        const listener = (newVal: T | undefined, oldVal: T | undefined, operations: any) => {
            if (newVal !== oldVal) setVal(newVal)
        }
        replicant.on("change", listener)
        return () => {
            replicant.removeListener("change", listener)
        }
    }, [name, namespace, opts])
    const setter = useCallback(
        (newValue: T) => {
            replicant.value = newValue
        },
        [name, namespace, opts]
    )
    return [val, setter] as const
}
