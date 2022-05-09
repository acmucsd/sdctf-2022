import { useRouter } from 'next/router'
import Head from "next/head";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useState} from "react";

const Viewer = () => {
    const [viewing, setViewing] = useState(false);
    const router = useRouter();
    const { flag } = router.query;
    // @ts-ignore
    const plainFlag = Buffer.from(flag || '', "base64").toString('ascii');

    return <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
            <title>flag-vault.sdc.tf</title>
        </Head>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <h1 className="text-6xl font-bold">
          <span className="text-blue-600">
            Flag {' '}
          </span>
                Vault
            </h1>

            <h2 className="text-4xl font-bold mt-5 mb-10 text-gray-600">
              welcome back, Jack
            </h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Flag name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Base64
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Protected
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">View</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            SDCTF 2022 Turing Test
                        </th>
                        <td className="px-6 py-4">
                            {viewing ? plainFlag : flag}
                        </td>
                        <td className="px-6 py-4">
                            No
                        </td>
                        <td className="px-6 py-4 text-right">
                            <a href="#" onClick={() => setViewing(!viewing)}
                               className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{viewing ? 'Hide' : 'View'}</a>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            Discord Bot Master Password
                        </th>
                        <td className="px-6 py-4">
                            *********************************
                        </td>
                        <td className="px-6 py-4">
                            Yes
                        </td>
                        <td className="px-6 py-4 text-right">
                            <a href="#"
                               className="font-medium text-blue-600 dark:text-blue-500 hover:underline"></a>
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            SDCTF 2023 Flags
                        </th>
                        <td className="px-6 py-4">
                            *********************************
                        </td>
                        <td className="px-6 py-4">
                            Yes
                        </td>
                        <td className="px-6 py-4 text-right">
                            <a href="#"
                               className="font-medium text-blue-600 dark:text-blue-500 hover:underline"></a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </main>
    </div>
}

export default Viewer
