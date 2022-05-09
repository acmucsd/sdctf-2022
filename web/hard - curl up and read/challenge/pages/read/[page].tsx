import {execFileSync} from 'child_process';

import {GetServerSideProps, GetServerSidePropsContext} from "next";
import Ajv, {JSONSchemaType} from 'ajv';
import addFormats from 'ajv-formats';

import {Readability} from "@mozilla/readability";
import {JSDOM} from 'jsdom';

interface PageConfig {
    url: string;
}

// create the jsonschema validator for the webpage URL
const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile({
    type: 'object',
    properties: {
        url: {type: 'string', format: 'uri'}
    },
    required: ['url'],
    additionalProperties: false
} as JSONSchemaType<PageConfig>);


// @ts-ignore
export default function Reader({content, title}) {
    return <div className='flex flex-col max-w-4xl h-full m-auto'>
        <a href="/" className='mt-3 text-blue-500 hover:text-blue-700'>&#8592; return to lookup</a>
        <h1 className='text-5xl my-4'>{title}</h1>
        {/* render the readability view with the strictest possible sandboxing */}
        <iframe sandbox='' allow='' srcDoc={content} className='w-full h-[80vh]'/>
    </div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    // validate the input through a STRICT series of checks
    const pageEncoded = context.params?.page;
    if (!pageEncoded || typeof pageEncoded !== 'string')
        return {notFound: true};
    const pageDecoded = new Buffer(pageEncoded, 'base64').toString('ascii');
    if (!pageDecoded)
        return {notFound: true};
    const pageParsed = JSON.parse(pageDecoded);
    if (!pageParsed)
        return {notFound: true};
    if (!validate(pageParsed))
        return {notFound: true};

    const options = {
        timeout: 2000, // kill if the download takes longer than two seconds
        env: {...process.env, FLAG: 'REDACTED'} // even if CURL is somehow pwned, it won't have access to the flag
    }

    // download the requested webpage
    const output = execFileSync('curl', ['-s', pageParsed.url], options);
    if (!output)
        return {notFound: true};

    // parse the webpage using JSDOM and Readability
    // JSDOM does NOT execute any JS by default
    const doc = new JSDOM(output.toString(), {url: pageParsed.url});
    const reader = new Readability(doc.window.document);
    const content = reader.parse();
    if (!content)
        return {notFound: true};

    // return the reader view content
    return {props: content};
}