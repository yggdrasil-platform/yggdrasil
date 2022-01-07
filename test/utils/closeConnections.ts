import { Connection } from 'typeorm';

/**
 * Convenience function that simply closes each connection. It will attempt to close all connections
 * @param {Connection[]} connections a list of connections to close
 */
export default async function closeConnections(
  connections: Connection[],
): Promise<void> {
  const errors: string[] = [];
  let errorMessage: string;

  for (const connection of connections) {
    try {
      await connection.close();
    } catch (error) {
      errorMessage = `failed to close connection ${connection.name}: ${error}`;

      console.error(errorMessage);
      errors.push(errorMessage);
    }
  }

  if (errors.length > 0) {
    throw Error('failed to close all connections');
  }
}
