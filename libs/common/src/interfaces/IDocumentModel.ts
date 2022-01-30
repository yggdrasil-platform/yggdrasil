import { Document } from 'mongoose';

type IDocumentModel<T> = T & Document;

export default IDocumentModel;
