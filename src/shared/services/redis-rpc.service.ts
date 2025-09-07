import { Injectable } from '@nestjs/common';
import Redis from 'ioredis'
import { randomUUID } from "crypto";
import { envs } from 'src/config/envs';

@Injectable()
export class RedisRpcService {
    private redisPub: Redis;
    private redisSub: Redis;
    // Map que relaciona correlationId → función que resuelve la promesa.
    //Cada request que envías crea un correlationId único.
    //Cuando llega la respuesta con ese correlationId, se llama la función y se elimina del Map.
    private handlers = new Map<string, (data: any) => void>();

    constructor() {
        this.redisPub = new Redis({
            host: envs.redisHost,
            port: envs.redisPort,
            password: envs.redisPassword,
        });

        this.redisSub = new Redis({
            host: envs.redisHost,
            port: envs.redisPort,
            password: envs.redisPassword,
        });

        this.redisSub.on('message', (__, message) => {
            // Extrae data y correlationId
            // En la data vendria la response
            const { correlationId, data } = JSON.parse(message);
            // Selecciona handler por corrlationId
            const handler = this.handlers.get(correlationId);
            if(handler) {
                handler(data);
                // borra el handler
                this.handlers.delete(correlationId);
            }
        });
    }

    async send<T = any>(pattern: string, data: any, timeoutMs = 1500): Promise<T> {
        const correlationId = randomUUID();
        const replyChannel = `rpc:reply:${correlationId}`;

        await this.redisSub.subscribe(replyChannel);

        return new Promise<T>((resolve, reject) => {
            // Timeout de seguridad
            const timeout = setTimeout(() => {
                this.handlers.delete(correlationId);
                reject(new Error(`Timeout waiting for response on ${pattern}`));
            }, timeoutMs);

            // Establece un handler para la peticion
            this.handlers.set(correlationId, (data) => {
                clearTimeout(timeout);
                resolve(data);
            });

            // Haz la peticion
            this.redisPub.publish(
                pattern,
                JSON.stringify({ correlationId, replyChannel, data })
            );
        });
    }
}