import { Connection } from 'mongoose';

// Interfaces
import { IMongoConnection } from '@test/interfaces';

/**
 * Convenience function that simply closes each connection. It will attempt to close all connections.
 * @param {IMongoConnection[]} connections - an array of connection objects.
 */
export default async function closeConnections(
  connections: IMongoConnection[],
): Promise<void> {
  const errors: string[] = [];
  let errorMessage: string;

  for (const { connection, database } of connections) {
    try {
      await connection.close();
    } catch (error) {
      errorMessage = `TestCloseConnectionError: failed to close connection for ${database}: ${error}`;

      console.error(errorMessage);
      errors.push(errorMessage);
    }
  }

  if (errors.length > 0) {
    throw Error('TestCloseConnectionError: failed to close all connections');
  }
}
