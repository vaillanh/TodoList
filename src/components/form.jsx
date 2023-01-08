import { Field, Form } from "formik"
import Link from "next/link"

const StringForm = (props) => {
  const { label, desctription } = props

  return (
    <Form className=" flex flex-col p-4">
      <span className="flex flex-col">
        {desctription} :
        <Field name="title" className="border rounded-sm sm:w-4/5 lg:w-3/5" />
      </span>
      <div className="absolute bottom-0 right-0 m-4 lg:m-20  flex">
        <Link href="/" className="font-medium">
          Cancel
        </Link>
        <button
          type="submit"
          className="border rounded-lg ml-4 px-1 font-medium bg-blue-700 text-white"
        >
          {label}
        </button>
      </div>
    </Form>
  )
}

export default StringForm
