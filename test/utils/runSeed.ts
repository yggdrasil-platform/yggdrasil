import { Connection, Model } from 'mongoose';

// Interfaces
import { IDocumentModel } from '@libs/common/interfaces';
import { ISeed } from '@test/interfaces';

/**
 * Convenience function that creates a Mongoose model from a connection and inserts the seeds.
 * @param {Connection} connection - an initialised Mongoose connection.
 * @param {ISeed} seed - a seed interface that contains the seed classes and values relevant for creating a Mongoose model.
 */
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
