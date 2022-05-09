import Head from "next/head";
import dynamic from "next/dynamic";

import {ErrorMessage, Field, Form, Formik, FormikValues} from "formik";
import * as yup from 'yup';
import axios from "axios";
import {useEffect, useState} from "react";

// disclaimer: this is literally the jankest code I could possibly write, its written this way intentionally

const validationSchema = yup.object().shape({
    email: yup.string().email('must be a valid email').required('you must enter an email'),
    password: yup.string().required('must enter a password')
});

// cursed js sleep function that actually makes sense in this context
const sleep = ms => new Promise(r => setTimeout(r, ms));

// we gotta do this to avoid next trying to render the widget server sided and DYING
// https://stackoverflow.com/questions/66096260/why-am-i-getting-referenceerror-self-is-not-defined-when-i-import-a-client-side
const ChatWidget = dynamic(
    {
        // @ts-ignore
        loader: () => import('react-chat-widget').then((mod) => mod.Widget),
    },
    {
        ssr: false
    }
)

const IndexPage = () => {
    const [loginStatus, setLoginStatus] = useState(200);
    const [errorCount, setErrorCount] = useState(0);
    const [recoveryState, setRecoveryState] = useState({ nextUrl: '/api/check/name', promptMessages: [], errorMessages: [], responsesAmount: 1 });
    const [queryResponse, setQueryResponse] = useState(null);

    const printPrompt = () => {
        import('react-chat-widget').then(async (mod) => {
            if(queryResponse === null)
                return;
            // prompt
            for(let i = queryResponse.length; i < recoveryState.promptMessages.length; i++) {
                const promptMessage = recoveryState.promptMessages[i];
                mod.toggleMsgLoader();
                await sleep(3000);
                mod.toggleMsgLoader();
                if(typeof promptMessage === 'string') {
                    mod.addResponseMessage(promptMessage);
                    await sleep(1000);
                } else {
                    mod.addResponseMessage(promptMessage.prompt);
                    mod.setQuickButtons(promptMessage.options.map(opt => ({ label: opt, value: opt })))
                    break;
                }
            }
        });
    };

    // recovery state management
    useEffect(printPrompt, [recoveryState]);

    useEffect(() => {
        // only process if we've gathered ALL input
        if(queryResponse === null)
            return;

        if(queryResponse.length < recoveryState.responsesAmount) {
            return printPrompt();
        }

        import('react-chat-widget').then(async (mod) => {
            mod.toggleMsgLoader();
            try {
                const response = await axios.post(recoveryState.nextUrl, {messages: queryResponse});
                mod.toggleMsgLoader();
                setQueryResponse(null);
                setRecoveryState(response.data);
                setQueryResponse([]);
            } catch (e) {
                mod.toggleMsgLoader();
                for(const errorMessage of recoveryState.errorMessages) {
                    mod.toggleMsgLoader();
                    await sleep(3000);
                    mod.toggleMsgLoader();
                    mod.addResponseMessage(errorMessage);
                    await sleep(1000);
                }
                // empty current input
                setQueryResponse([]);
            }
        })
    }, [queryResponse])

    useEffect(() => {
        if (errorCount === 5) {
            import('react-chat-widget').then(async (mod) => {
                mod.toggleWidget();
                mod.toggleMsgLoader();
                await sleep(3000);
                mod.toggleMsgLoader();
                mod.addResponseMessage("Hey there! I couldn't help but notice you seem to be having trouble.");
                mod.toggleMsgLoader();
                await sleep(3000);
                mod.toggleMsgLoader();
                mod.addResponseMessage("What kind of support can I provide?");
                mod.setQuickButtons([{label: 'Account Recovery', value: 'recovery'}, {
                    label: 'Bread Puns',
                    value: 'bread'
                }]);
            })
        }
    }, [errorCount]);

    const handleNewUserMessage = (newMessage) => {
        if(!recoveryState.nextUrl)
            return;

        setQueryResponse([...queryResponse, newMessage]);
    };

    const handleQuickButtonClicked = (buttonValue: string) => {
        import('react-chat-widget').then(async (mod) => {
            if (buttonValue === 'bread') {
                mod.toggleMsgLoader();
                const res = await axios.get('https://my-bao-server.herokuapp.com/api/breadpuns');
                mod.addResponseMessage(res.data);
                mod.toggleMsgLoader();
            } else if (buttonValue === 'recovery') {
                mod.setQuickButtons([]);
                mod.toggleMsgLoader();
                await sleep(3000);
                mod.addResponseMessage('Alright. To get started, I\'ll need you to confirm your name.');
                mod.toggleMsgLoader();
                setRecoveryState({
                    nextUrl: '/api/check/name',
                    promptMessages: ['Please enter your full name, J*** B*****.'],
                    errorMessages: ['Sorry, that name is not quite right. Try again.'],
                    responsesAmount: 1
                });
                setQueryResponse([]);
            } else {
                mod.setQuickButtons([]);
                setQueryResponse([...queryResponse, buttonValue]);
            }
        });
    };

    async function onLogin(values: FormikValues) {
        try {
            await axios.post('/api/login', values);
            setLoginStatus(200);
        } catch (e) {
            if (e.response.status === 401)
                setErrorCount(errorCount + 1);
            setLoginStatus(e.response.status);
        }
    }

    const errorComponent = loginStatus === 401 ?
        <span className="w-1/2 text-red-700">Incorrect password ({errorCount})</span> : (loginStatus >= 300 ?
            <span className="w-1/2 text-red-700">Account unrecognized</span> : '');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
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

                <Formik initialValues={{email: '', password: ''}} validationSchema={validationSchema}
                        onSubmit={onLogin}>
                    {({errors, touched}) => <Form className="flex flex-wrap justify-center gap-6 mt-12 sm:w-full">
                        <Field type="text"
                               className={`focus:ring-2 text-sm leading-6 ${touched.email && errors.email ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-400'} ring-1 ring-gray-400 rounded-md text-gray-900 py-3 px-4 w-1/2`}
                               name="email" placeholder="Email address"/>
                        <span className="w-1/2 text-left text-red-700"><ErrorMessage name="email"/></span>
                        <Field type="password"
                               className={`focus:ring-2 text-sm leading-6 ${touched.password && errors.password ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-400'} ring-1 ring-gray-400 rounded-md text-gray-900 py-3 px-4 w-1/2`}
                               name="password" placeholder="********"/>
                        <span className="w-1/2 text-left text-red-700"><ErrorMessage name="password"/></span>
                        <div className="w-1/2">
                            <button
                                type="submit"
                                className="w-1/4 bg-blue-600 ring-0 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 text-sm text-white font-semibold ring-1 rounded-md py-3 px-4">Login
                            </button>
                        </div>
                        {errorComponent}
                    </Form>}

                </Formik>

            </main>
            <ChatWidget handleNewUserMessage={handleNewUserMessage} handleQuickButtonClicked={handleQuickButtonClicked}
                        title="Welcome" subtitle="Account Support" launcher={() => {
            }} profileAvatar='https://i.imgur.com/yCsAAjF.png'/>
        </div>
    )
};

export default IndexPage
