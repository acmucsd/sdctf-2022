import {Field, Form, Formik, FormikValues} from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import Head from 'next/head'
import {useState} from "react";

const validationSchema = yup.object().shape({
    file: yup.mixed().required(),
    flag: yup.string().required()
});

export default function Home() {
    const [imageData, setImageData] = useState('');

    async function onSubmit(values: FormikValues) {
        const formData = new FormData();
        formData.append('flag', values.flag);
        formData.append('file', values.file);
        console.log(values.flag, formData)
        const response = await axios({
            method: 'post',
            url: '/api/hide',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'arraybuffer'
        })

        setImageData(Buffer.from(response.data, 'binary').toString('base64'));
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>flag.sdc.tf</title>
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">
                    The
          <span className="text-blue-600">
            {' '}Ultimate{' '}
          </span>
                    Flag Hider
                </h1>

                { imageData && <img className='object-contain w-6/12 sm:w-6/12 mt-12 shadow' src={`data:image/png;base64,${imageData}`} /> }

                <Formik initialValues={{flag: ''}} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {
                        ({errors, touched, setFieldValue}) => <Form
                        className="sm:w-full">
                            <input type="file" name="file"
                                   className='mt-12'
                                   onChange={(event) => setFieldValue('file', (event.currentTarget.files || [null])[0])}
                                   placeholder='submit an image'
                            />
                            <div className="flex flex-wrap justify-center gap-6 mt-12">
                                <Field type="text"
                                       name="flag"
                                       className={`focus:ring-2 text-sm leading-6 ${touched.flag && errors.flag ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-400'} rounded-md text-gray-900 py-3 px-4 w-1/2`}
                                       placeholder="enter a flag to hide..."/>
                                <button
                                    type="submit"
                                    className="bg-blue-600 ring-0 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 text-sm text-white font-semibold ring-1 rounded-md py-3 px-4">
                                    Hide flag in your image
                                </button>
                            </div>
                        </Form>
                    }
                </Formik>

            </main>
        </div>
    )
}
