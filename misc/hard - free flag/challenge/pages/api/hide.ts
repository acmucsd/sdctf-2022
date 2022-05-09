import type {NextApiRequest, NextApiResponse} from 'next'
import busboy from 'busboy';
import sharp, {OutputInfo} from 'sharp';

const SECRET_PERMUTATION_TABLE = [7, 4, 2, 6, 0, 1, 3, 5];
const WATERMARK = Buffer.from(`
<svg width="300" height="20">
<style>
.title { fill: #001; font-size: 11px; font-weight: bold; }
</style>
    <text x="50%" y="50%" text-anchor="middle" class="title">Made via "The Ultimate Flag Hider". Try it at flag.sdc.tf!</text>
</svg>
`);

async function getImageAndFlagData(req: NextApiRequest): Promise<{ image: { data: Buffer; info: OutputInfo }, flag: string }> {
    return new Promise(((resolve, reject) => {
        try {

            // create sharp image routine, will apply the watermark automatically
            const sharpImageStream = sharp().composite([{input: WATERMARK, gravity: 'southeast'}]).raw();

            // the image and flag, whenever they end up getting parsed
            const imagePromise = sharpImageStream.toBuffer({resolveWithObject: true});
            let flag = '';

            // stream file into sharp and parse the provided flag text as well
            const bb = busboy({headers: req.headers, limits: {fileSize: 5 * 1024 * 1024}});
            bb.on('file', (name, file) => file.pipe(sharpImageStream));
            bb.on('field', (name, val) => {
                if (name === 'flag') flag = val;
            });

            // once the request finished, try to pass both the image and the flag back to the caller
            bb.on('close', async () => {
                if (!flag) return reject('no flag provided');
                try {
                    const image = await imagePromise;
                    resolve({
                        image,
                        flag
                    });
                } catch (e) {
                    reject(e);
                }
            });

            // lastly, actually pipe the request into busboy
            req.pipe(bb);
        } catch (e) {
            reject(e);
        }
    }));
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // parse the request for an image and a flag
    try {
        const {image, flag} = await getImageAndFlagData(req);

        // get the raw pixel array
        const pixelArray = new Uint8ClampedArray(image.data);

        // turn the flag into a byte stream and embed it into the image
        Buffer.from(flag, 'ascii').valueOf()
            // secret permutation of each bit in the bytestring
            .map((byte) =>
                SECRET_PERMUTATION_TABLE.reduce((accum, curr, i) => (accum | ((byte & (1 << i)) >> i) << curr), 0)
            )
            // split each permuted byte array entry into two bit chunks
            .reduce((accum: number[], curr) => {
                accum.push(curr & 0b11, (curr >> 2) & 0b11, (curr >> 4) & 0b11, (curr >> 6) & 0b11)
                return accum;
            }, [])
            // store the split permuted byte array entries into the two LSB of each pixel
            .forEach((byte, i) => pixelArray[i] = (pixelArray[i] & 0b11111100) | byte);

        // convert back to PNG and return to sender
        sharp(pixelArray, {
            raw: {
                channels: image.info.channels,
                width: image.info.width,
                height: image.info.height
            }
        }).png().pipe(res);
    } catch (e) {
        res.status(500).send('not a good image');
    }
}

// required to allow us to use busboy to parse the request body ourselves
export const config = {
    api: {
        bodyParser: false
    }
};