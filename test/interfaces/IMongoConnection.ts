import { Connection } from 'mongoose';

interface IMongoConnection {
  connection: Connection;
  database: string;
}

export default IMongoConnection;
