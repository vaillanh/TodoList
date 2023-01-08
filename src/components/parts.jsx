import classNames from "classnames"
import { useCallback } from "react"
import { useContext } from "../components/ContextProvider"
import { PlusIcon } from "@heroicons/react/20/solid"

const Parts = () => {
  const { state, setDisplay, isDisplay, router } = useContext()

  const tabselected = (id) => {
    setDisplay(id)
  }
  const handleCreate = useCallback(() => {
    router.push("onglet/create")
  }, [router])

  return (
    <>
      <ul className="flex mt-1 overflow-x-auto sticky top-0 bg-white h-11">
        {state.map((partsData, i) => (
          <li
            key={i}
            className=" border-2 border-b-0 rounded-lg rounded-b-none"
            onClick={() => tabselected(partsData.id)}
          >
            <span className="flex gap-2 mx-4 my-2">
              {partsData.title}
              <span className="flex gap-1 px-1 bg-blue-400 rounded-xl">
                <span
                  className={classNames(
                    partsData.task.filter(({ checked }) => checked === true)
                      .length === 0
                      ? "hidden"
                      : "block",
                    "bg-green-400 rounded-full px-1"
                  )}
                >
                  {
                    partsData.task.filter(({ checked }) => checked === true)
                      .length
                  }
                </span>
                {partsData.task.length}
              </span>
            </span>
            <div
              className={classNames(
                partsData.id === isDisplay ? "block" : "hidden",
                "w-full bg-gray-200 h-1"
              )}
            >
              <div
                className={`bg-green-400 h-1 w-[${
                  (partsData.task.filter(({ checked }) => checked === true)
                    .length /
                    partsData.task.length) *
                  100
                }%]`}
              ></div>
            </div>
          </li>
        ))}
        <li className=" ml-4 border-2 border-b-0 rounded-lg rounded-b-none px-4 py-2 ">
          <PlusIcon className=" w-5 h-auto" onClick={handleCreate} />
        </li>
      </ul>
    </>
  )
}

export default Parts
