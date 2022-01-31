import { Schema } from 'mongoose';

// Interfaces
import { IDocumentModel } from '@libs/common/interfaces';

interface ISeed<T> {
  name: string;
  schema: Schema<IDocumentModel<T>>;
  seeds: T[];
}

export default ISeed;
