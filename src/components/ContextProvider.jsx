import { useRouter } from "next/router"
import {
  createContext,
  useCallback,
  useContext as useNativeContext,
  useState,
} from "react"
import * as yup from "yup"

const initialstate = [
  {
    id: 0,
    title: "First List",
    task: [
      {
        taskId: 0,
        name: "Hello",
        checked: true,
      },
    ],
  },
]

export const Context = createContext()

export const useContext = () => useNativeContext(Context)

const ContextProvider = (props) => {
  const [state, setState] = useState(initialstate)
  const [isDisplay, setDisplay] = useState(0)
  const [nextPartsId, setNextPartsId] = useState(1)
  const [nextTasksId, setNextTaskId] = useState(1)

  const validationStringSchema = yup.object().shape({
    title: yup.string().required(),
  })
  const router = useRouter()

  //Patie Onglet

  const getNexPartstId = useCallback(() => {
    setNextPartsId(nextPartsId + 1)

    return nextPartsId
  }, [nextPartsId])

  const addParts = useCallback(
    (dataTitle) => {
      setState((state) => [
        ...state,
        {
          id: getNexPartstId(),
          title: dataTitle.title,
          task: [],
        },
      ])
      router.push("/")
      setDisplay(nextPartsId)
    },
    [getNexPartstId, router, setDisplay, nextPartsId]
  )

  const deleteParts = useCallback((partsid) => {
    setState((state) => state.filter(({ id }) => id !== partsid))
  }, [])

  const updateParts = useCallback(
    (uptadePart) => {
      setState((state) =>
        state.map((parts) => (parts.id === uptadePart.id ? uptadePart : parts))
      )
      router.push("/")
    },
    [router]
  )

  //Partie Task

  const getNexTasktId = useCallback(() => {
    setNextTaskId(nextTasksId + 1)

    return nextTasksId
  }, [nextTasksId])

  const addTask = useCallback(
    (taskdata) => {
      const modifyParts = state.find(({ id }) => id === taskdata.id)

      modifyParts.task.push({
        taskId: getNexTasktId(),
        name: taskdata.title,
        checked: false,
      })
      setState((state) =>
        state.map((parts) => (parts.id === taskdata.id ? modifyParts : parts))
      )
      router.push("/")
    },
    [router, getNexTasktId, state]
  )

  const updateTask = useCallback(
    (updatedata) => {
      const modifyParts = state.find(({ id }) => id === updatedata.partid)
      const modifyTask = modifyParts.task.find(
        ({ taskId }) => taskId === updatedata.taskid
      )
      const modifiedTask = {
        taskId: modifyTask.taskId,
        name: updatedata.title,
        checked: modifyTask.checked,
      }

      const modifiedTasks = modifyParts.task.map((taskdata) =>
        taskdata.taskId === updatedata.taskid ? modifiedTask : taskdata
      )
      const modifiedPart = {
        id: modifyParts.id,
        title: modifyParts.title,
        task: modifiedTasks,
      }
      setState((state) =>
        state.map((parts) =>
          parts.id === updatedata.partid ? modifiedPart : parts
        )
      )
      router.push("/")
    },
    [router, state]
  )

  const updateTaskCheckbox = useCallback(
    (updatedata) => {
      const modifyParts = state.find(({ id }) => id === updatedata.partid)
      const modifyTask = modifyParts.task.find(
        ({ taskId }) => taskId === updatedata.taskid
      )
      const modifiedTask = {
        taskId: modifyTask.taskId,
        name: modifyTask.name,
        checked: updatedata.checked,
      }

      const modifiedTasks = modifyParts.task.map((taskdata) =>
        taskdata.taskId === updatedata.taskid ? modifiedTask : taskdata
      )
      const modifiedPart = {
        id: modifyParts.id,
        title: modifyParts.title,
        task: modifiedTasks,
      }
      setState((state) =>
        state.map((parts) =>
          parts.id === updatedata.partid ? modifiedPart : parts
        )
      )
    },
    [state]
  )

  const deleteTask = useCallback(
    (deletedata) => {
      const modifyParts = state.find(({ id }) => id === deletedata.partid)
      const modifiedTask = modifyParts.task.filter(
        ({ taskId }) => taskId !== deletedata.taskid
      )
      const modifiedPart = {
        id: modifyParts.id,
        title: modifyParts.title,
        task: modifiedTask,
      }

      setState((state) =>
        state.map((parts) =>
          parts.id === deletedata.partid ? modifiedPart : parts
        )
      )
    },
    [state]
  )

  return (
    <Context.Provider
      {...props}
      value={{
        state,
        getNexPartstId,
        deleteParts,
        deleteTask,
        updateParts,
        updateTask,
        addParts,
        addTask,
        updateTaskCheckbox,
        validationStringSchema,
        router,
        isDisplay,
        setDisplay,
      }}
    />
  )
}

export default ContextProvider
