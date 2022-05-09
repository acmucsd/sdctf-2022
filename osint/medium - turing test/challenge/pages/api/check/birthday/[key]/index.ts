import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // january 10
    if(req.method !== 'POST' || req.query.key !== 'f1ea9d82e14b382091c111d71335e0f72e9c2baa') {
        return;
    }

    if(req.body.messages[0] === 'Jan' && req.body.messages[1] === '10th') {
        return res.send({
            nextUrl: '/api/check/dogname/cb7fa35d024c5ab17db40cc64fdde399845fbb7c',
            promptMessages: [
                'Okay. Now I would like to ask you one of your security questions.',
                'What is the name of your dog?'
            ],
            errorMessages: ['Sorry, your dog is very upset that you forgot his name. Please try again.'],
            responsesAmount: 1
        });
    }
    return res.status(401).send('Incorrect');
}

export default handler
