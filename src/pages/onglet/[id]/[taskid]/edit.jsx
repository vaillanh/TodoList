import { Formik } from "formik"
import { useCallback } from "react"
import { useContext } from "../../../../components/ContextProvider"
import StringForm from "../../../../components/form"
import FormHeader from "../../../../components/formheadear"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      partid: Number.parseInt(params.id, 10),
      taskid: Number.parseInt(params.taskid, 10),
    },
  },
})

const EditTitle = (props) => {
  const {
    params: { partid, taskid },
  } = props

  const { validationStringSchema, updateTask, state } = useContext()

  const modifyParts = state.find(({ id }) => id === partid)
  const modifyTask = modifyParts.task.find(({ taskId }) => taskId === taskid)

  const InitialPartsValues = {
    title: modifyTask.name,
    partid: partid,
    taskid: taskid,
  }

  const handleEditClick = useCallback(
    (data) => {
      updateTask(data)
    },
    [updateTask]
  )

  return (
    <div>
      <FormHeader label=" Create ToDo" />
      <Formik
        onSubmit={handleEditClick}
        initialValues={InitialPartsValues}
        validationSchema={validationStringSchema}
      >
        <StringForm label="Save" desctription="Description" />
      </Formik>
    </div>
  )
}

export default EditTitle
