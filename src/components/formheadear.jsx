import { useCallback } from "react"
import { useContext } from "./ContextProvider"
import { XMarkIcon } from "@heroicons/react/20/solid"

const FormHeader = (props) => {
  const { router } = useContext()
  const { label } = props

  const handleUpdate = useCallback(() => {
    router.push(`/`)
  }, [router])

  return (
    <div className="flex p-2 border-b-2 border-slate-400 font-bold">
      {label}
      <XMarkIcon className="w-5 h-auto ml-auto" onClick={handleUpdate} />
    </div>
  )
}

export default FormHeader
