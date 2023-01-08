import { Formik } from "formik"
import { useCallback } from "react"
import { useContext } from "../../components/ContextProvider"
import StringForm from "../../components/form"
import FormHeader from "../../components/formheadear"

const InitialValues = {
  title: "",
}

const CreatePart = () => {
  const { addParts, validationStringSchema } = useContext()

  const handeCreate = useCallback(
    (title) => {
      addParts(title)
    },
    [addParts]
  )

  return (
    <div>
      <FormHeader label=" Create List" />
      <Formik
        onSubmit={handeCreate}
        initialValues={InitialValues}
        validationSchema={validationStringSchema}
      >
        <StringForm label="Create" desctription="Name" />
      </Formik>
    </div>
  )
}

export default CreatePart
