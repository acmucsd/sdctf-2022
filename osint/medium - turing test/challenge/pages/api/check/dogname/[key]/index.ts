import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // ravioli
    if(req.method !== 'POST' || req.query.key !== 'cb7fa35d024c5ab17db40cc64fdde399845fbb7c') {
        return;
    }

    if(req.body.messages[0].toLowerCase() === 'ravioli') {
        return res.send({
            nextUrl: '/api/check/flag/384b4f5a544b6ef764dc46e72f66a16274094139',
            promptMessages: [
                'Excellent. One last check, I want to ask you about the flag currently in your account.',
                'What are the first six characters of your flag?'
            ],
            errorMessages: ['Sorry, that\'s quite right. Please try again.'],
            responsesAmount: 1

        });
    }
    return res.status(401).send('Incorrect');
}

export default handler
