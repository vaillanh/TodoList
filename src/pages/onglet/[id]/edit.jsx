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

const EditTitle = (props) => {
  const {
    params: { partid },
  } = props
  const { state, updateParts, validationStringSchema } = useContext()

  const modifyParts = state.find(({ id }) => id === partid)

  const InitialPartsValues = {
    title: modifyParts.title,
    id: modifyParts.id,
    task: modifyParts.task,
  }

  const handleEditClick = useCallback(
    (title) => {
      updateParts(title)
    },
    [updateParts]
  )

  return (
    <div>
      <FormHeader label=" Edit List" />
      <Formik
        onSubmit={handleEditClick}
        initialValues={InitialPartsValues}
        validationSchema={validationStringSchema}
      >
        <StringForm label="Save" desctription="Name" />
      </Formik>
    </div>
  )
}

export default EditTitle
