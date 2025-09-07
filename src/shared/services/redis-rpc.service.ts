import { Injectable } from '@nestjs/common';
import Redis from 'ioredis'
import { randomUUID } from "crypto";
import { envs } from 'src/config/envs';

@Injectable()
export class RedisRpc {
    private redisPub: Redis;
    private redisSub: Redis;
    // Map que relaciona correlationId → función que resuelve la promesa.
    //Cada request que envías crea un correlationId único.
    //Cuando llega la respuesta con ese correlationId, se llama la función y se elimina del Map.
    private handlers = new Map<string, (data: any) => void>();

    constructor() {
        this.redisPub = new Redis({
            host: envs.redisUri,
            port: envs.redisPort,
            password: envs.redisPassword,
        });

        this.redisSub = new Redis({
            host: envs.redisUri,
            port: envs.redisPort,
            password: envs.redisPassword,
        });

        this.redisSub.on('message', (channel, message) => {
            const { correlationId, data } = JSON.parse(message);
            const handler = this.handlers.get(correlationId);
            if(handler) {
                handler(data);
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

            this.handlers.set(correlationId, (data) => {
                clearTimeout(timeout);
                resolve(data);
            });

            this.redisPub.publish(
                pattern,
                JSON.stringify({ correlationId, replyChannel, data })
            );
        });
        
        // return new Promise((res, rej) => {
        //     const correlationId = randomUUID();
        //     const replyChannel = `rpc:reply:${correlationId}`

        //     // Subscribirse al canal temporal de respuesta
        //     this.redisSub.subscribe(replyChannel, (err) => {
        //         if(err) return rej(err)
        //     });

        //     this.redisSub.on('message', (channel, message) => {
        //         if(channel === replyChannel) {
        //             const payload = JSON.parse(message)
        //             res(payload);
        //             this.redisSub.unsubscribe(replyChannel)
        //         }
        //     });

        //     // Publicar la peticion
        //     this.redisPub.publish(
        //         pattern,
        //         JSON.stringify({
        //             id: correlationId,
        //             data,
        //             replyTo: replyChannel
        //         })
        //     )
        // })
    }
}