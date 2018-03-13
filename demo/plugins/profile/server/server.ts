import { CassandraDB } from 'ext-framework-server/dist/db/cassandra';
import { ElasticSearchDB } from 'ext-framework-server/dist/db/elasticsearch';
import { Manifest } from 'ext-framework-server/dist/models/manifest';
import { Request, Response } from 'express';
import { IProfileService } from './interfaces';
import { FrameworkConfig } from 'ext-framework-server/dist/interfaces';

export class Server implements IProfileService {

	private config: FrameworkConfig = null;
	private manifest: Manifest = null;
	private cassandraDB: CassandraDB;
	private userDetails: any = {};

	constructor(config: FrameworkConfig, manifest: Manifest) {
		this.config = config;
		this.manifest = manifest;
		this.cassandraDB = new CassandraDB(config.db.cassandra);
	}

	public getUser(req: Request, res: Response) {
		res.send({ status: 'success', data: this.userDetails[req.params['id']] }).status(200);
	}

	public getAllUser(req: Request, res: Response): void {
		res.send({ status: "success", data: this.userDetails }).status(200);
	}

	public setUser(req: Request, res: Response) {
		this.userDetails[req.body.userId] = req.body;
		res.send({ status: 'success', data: { userId: req.body.userId }}).status(200);
	}

	public searchUsers(req: Request, res: Response) {
		let body = req.body;
		let searchQuery = {}; // create searchQuery from body json
		res.send('search result api working!');
	}
}