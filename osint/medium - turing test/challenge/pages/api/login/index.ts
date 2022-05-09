import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST')
        return;
    if(req.body.email === "jack.sdctf@gmail.com")
        return res.status(401).send('Password incorrect');
    res.status(404).send('Account not recognized');
}

export default handler
