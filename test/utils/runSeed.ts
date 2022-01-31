import { Connection, Model } from 'mongoose';

// Interfaces
import { IDocumentModel } from '@libs/common/interfaces';
import { ISeed } from '@test/interfaces';

export default async function runSeed<T>(
  connection: Connection,
  seed: ISeed<T>,
): Promise<void> {
  const model: Model<IDocumentModel<T>> = connection.model<IDocumentModel<T>>(
    seed.name,
    seed.schema,
  );

  await model.insertMany(seed.seeds);
}
