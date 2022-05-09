import {Field, Form, Formik, FormikValues} from 'formik'
import * as yup from 'yup'
import Head from 'next/head'

const validationSchema = yup.object().shape({
    url: yup.string().url('value must be a valid URL').required('you must enter a URL')
});

export default function Home() {

    function onSubmit(values: FormikValues) {
        window.location.href = `/read/${btoa(JSON.stringify(values))}`
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>curl.sdc.tf</title>
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">
          <span className="text-blue-600">
            CURL{' '}
          </span>
                    Up and Read
                </h1>

                <Formik initialValues={{url: ''}} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {
                        ({errors, touched}) => <Form className="flex flex-wrap justify-center gap-6 mt-12 sm:w-full">
                            <Field type="text"
                                   name="url"
                                   className={`focus:ring-2 text-sm leading-6 ${touched.url && errors.url ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-400'} rounded-md text-gray-900 py-3 px-4 w-1/2`}
                                   placeholder="enter a URL to display in reader mode..."/>
                            <button
                                type="submit"
                                className="bg-blue-600 ring-0 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 text-sm text-white font-semibold ring-1 rounded-md py-3 px-4">View
                                Reader Mode
                            </button>
                        </Form>
                    }
                </Formik>

            </main>
        </div>
    )
}
