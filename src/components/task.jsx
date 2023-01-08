import { useCallback, useState } from "react"
import { useContext } from "./ContextProvider"
import TaskDiv from "./taskdiv"
import {
  CheckCircleIcon,
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
  CheckIcon,
} from "@heroicons/react/20/solid"
import classNames from "classnames"

const Task = () => {
  const { state, deleteParts, isDisplay, setDisplay, router } = useContext()

  const [isNotDisplay, setisNotDisplay] = useState(false)

  const handleHideTask = () => {
    setisNotDisplay(isNotDisplay === false ? true : false)
  }

  const handleCreate = useCallback(
    (event) => {
      const dataid = Number.parseInt(event.currentTarget.getAttribute("id"), 10)
      router.push(`/onglet/${dataid}/create`)
    },
    [router]
  )

  const handleUpdate = useCallback(
    (event) => {
      const dataid = Number.parseInt(event.currentTarget.getAttribute("id"), 10)
      router.push(`/onglet/${dataid}/edit`)
    },
    [router]
  )

  const handlePartDelete = useCallback(
    (event) => {
      const partsId = Number.parseInt(
        event.currentTarget.getAttribute("id"),
        10
      )
      deleteParts(partsId)

      if (state.length > 1) {
        const id = partsId === state[0].id ? state[1].id : state[0].id
        setDisplay(id)
      }
    },
    [deleteParts, state, setDisplay]
  )

  return (
    <>
      <div>
        {state.map((partsData) => (
          <div
            key={partsData.id}
            className={classNames(
              isDisplay === partsData.id ? "block" : "hidden"
            )}
          >
            <div className=" flex gap-2 border border-slate-300 py-2 sticky top-11 bg-white">
              <PlusIcon
                className=" w-5 h-auto"
                onClick={handleCreate}
                id={partsData.id}
              />
              <PencilSquareIcon
                className=" w-5 h-auto"
                onClick={handleUpdate}
                id={partsData.id}
              />
              <TrashIcon
                id={partsData.id}
                onClick={handlePartDelete}
                className=" w-5 h-auto"
              />
              <CheckIcon
                onClick={handleHideTask}
                className={classNames(
                  isNotDisplay === true ? "block" : "hidden",
                  " w-5 h-auto ml-auto mr-1"
                )}
              />
              <CheckCircleIcon
                onClick={handleHideTask}
                className={classNames(
                  isNotDisplay === false ? "block" : "hidden",
                  " w-5 h-auto ml-auto mr-1"
                )}
              />
            </div>
            <div className="overflow-auto">
              {partsData.task.map((taskData) => (
                <TaskDiv
                  key={taskData.taskId}
                  taskData={taskData}
                  partsData={partsData}
                  isNotDisplay={isNotDisplay}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Task
