import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // sdctf{
    if(req.method !== 'POST' || req.query.key !== '384b4f5a544b6ef764dc46e72f66a16274094139') {
        return;
    }

    if(req.body.messages[0] === 'sdctf{') {
        return res.send({
            nextUrl: '/api/check/flag/384b4f5a544b6ef764dc46e72f66a16274094139',
            promptMessages: [
                '[Perfect! Thanks for your patience, your account has been unlocked. Click anywhere on this message to access your account!](/flagviewer/c2RjdGZ7N2hlXzFtMTc0N2kwbl85NG0zfQ==)',
            ],
            errorMessages: ['Sorry, that\'s quite right. Please try again.'],
            responsesAmount: 1

        });
    }
    return res.status(401).send('Incorrect');
}

export default handler
