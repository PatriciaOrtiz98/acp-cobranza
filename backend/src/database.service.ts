import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool, QueryResult, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool!: Pool;

  onModuleInit(): void {
    const connectionString: string = process.env.DATABASE_URL ?? '';
    if (!connectionString) {
      throw new Error('DATABASE_URL no está definida en el entorno');
    }

    this.pool = new Pool({ connectionString });
  }

  async query<T extends QueryResultRow = QueryResultRow>(
    sql: string,
    params?: any[],
  ): Promise<T[]> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult<T> = await client.query(sql, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async registrarAcceso(
    usuario: string,
    nivel: string,
    ip: string,
    modulo: string,
    fecha: Date,
  ): Promise<void> {
    const sql = `
      INSERT INTO rrhh.accesos (usuario, nivel, ip, modulo, fecha)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await this.query(sql, [usuario, nivel, ip, modulo, fecha]);
  }
}
