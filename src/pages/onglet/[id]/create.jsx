import { Formik } from "formik"
import { useCallback } from "react"
import { useContext } from "../../../components/ContextProvider"
import StringForm from "../../../components/form"
import FormHeader from "../../../components/formheadear"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      partid: Number.parseInt(params.id, 10),
    },
  },
})

const CreateTask = (props) => {
  const {
    params: { partid },
  } = props
  const { addTask, validationStringSchema } = useContext()

  const InitialValues = {
    title: "",
    id: partid,
  }

  const handleTaskCreate = useCallback(
    (task) => {
      addTask(task)
    },
    [addTask]
  )

  return (
    <div>
      <FormHeader label=" Create ToDo" />
      <Formik
        onSubmit={handleTaskCreate}
        initialValues={InitialValues}
        validationSchema={validationStringSchema}
      >
        <StringForm label="Create" desctription="Description" />
      </Formik>
    </div>
  )
}

export default CreateTask
