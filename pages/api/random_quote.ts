import {google} from 'googleapis';

export default (req, res) =>
{
	try
	{
		const client = new google.auth.JWT(process.env.CLIENT_EMAIL, null, (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'), ['https://www.googleapis.com/auth/documents.readonly']);
		client.authorize(async (err, tokens) =>
		{
			if (err)
				return res.status(400).json(err);
			const docs_api = google.docs('v1');
			const doc = await docs_api.documents.get({documentId: process.env.DOCUMENT_ID, auth: client});
			const bullets = doc.data.body.content.filter(el => !!el.paragraph?.bullet).map(el => el.paragraph);
			const randomBullet = bullets[Math.floor(Math.random() * bullets.length)];
			return res.status(400).send(randomBullet.elements[0].textRun.content);
		});
	}
	catch (e)
	{
		res.status(500).json(e);
	}
};
