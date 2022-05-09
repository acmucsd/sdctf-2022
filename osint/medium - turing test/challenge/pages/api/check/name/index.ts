import {NextApiRequest, NextApiResponse} from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    // full name
    if (req.method !== 'POST')
        return;
    if (req.body.messages[0].toLowerCase() === "jack banner") {
        // config for the next stage
        return res.send({
            nextUrl: '/api/check/birthday/f1ea9d82e14b382091c111d71335e0f72e9c2baa',
            promptMessages: [
                {
                    options: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    prompt: 'What month were you born in?'
                },
                {
                    options: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'],
                    prompt: 'What day were you born on?'
                }
            ],
            errorMessages: ['Sorry, that\'s not the correct date. Please try again.'],
            responsesAmount: 2
        })
    }
    return res.status(401).send('not correct');
}

export default handler
