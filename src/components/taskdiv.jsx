import classNames from "classnames"
import Link from "next/link"
import { useCallback } from "react"
import { useContext } from "./ContextProvider"
import { TrashIcon } from "@heroicons/react/20/solid"

const TaskDiv = (props) => {
  const { deleteTask, updateTaskCheckbox } = useContext()

  const { taskData, partsData, isNotDisplay } = props

  const handleTaskDelete = useCallback(
    (event) => {
      const id = {
        partid: Number.parseInt(
          event.currentTarget.getAttribute("data-parts-id"),
          10
        ),
        taskid: Number.parseInt(
          event.currentTarget.getAttribute("data-task-id"),
          10
        ),
      }
      deleteTask(id)
    },
    [deleteTask]
  )

  const hadleCheckclick = useCallback(
    (event) => {
      const data = {
        partid: Number.parseInt(
          event.currentTarget.getAttribute("data-parts-id"),
          10
        ),
        taskid: Number.parseInt(
          event.currentTarget.getAttribute("data-task-id"),
          10
        ),
        checked: event.currentTarget.checked,
      }
      updateTaskCheckbox(data)
    },
    [updateTaskCheckbox]
  )

  return (
    <>
      <div
        className={classNames(
          " flex border border-slate-300 p-2 group/item",
          isNotDisplay === true && taskData.checked === true
            ? "hidden"
            : "block"
        )}
      >
        <input
          type="checkbox"
          className=" appearance-none border border-slate-300 w-4 h-4  checked:bg-lime-300"
          defaultChecked={taskData.checked}
          data-parts-id={partsData.id}
          data-task-id={taskData.taskId}
          onClick={hadleCheckclick}
        />
        <Link
          href={`/onglet/${partsData.id}/${taskData.taskId}/edit`}
          className="pl-2"
        >
          {taskData.name}
        </Link>
        <TrashIcon
          className=" group/edit invisible  w-4 h-auto ml-auto mr-3 group-hover/item:visible "
          onClick={handleTaskDelete}
          data-parts-id={partsData.id}
          data-task-id={taskData.taskId}
        />
      </div>
    </>
  )
}

export default TaskDiv
