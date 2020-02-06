
import * as express from 'express';

import { ItemModel } from './item';

const itemRoutes = express.Router();
itemRoutes.get('/item', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	try {
		let items: any = await ItemModel.find({});
		items = items.map((item) => { return {id: item._id, description: item.description}});
		resp.json(items);
	} catch (err) {
		resp.status(500);
		resp.end();
		console.error('Caught error', err);
	}
});

itemRoutes.post('/item', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const description = req.body['description'];
	const item = new ItemModel({description: description});
	await item.save();
	resp.end();
});

itemRoutes.put('/item/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const description = req.body['description'];
	const id = req.params['id'];
	await ItemModel.findOneAndUpdate({id: id}, {description: description});
	resp.end();
});

itemRoutes.delete('/item/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const id = req.params['id'];

	await ItemModel.findByIdAndRemove(id);
	resp.end();
});

export { itemRoutes }