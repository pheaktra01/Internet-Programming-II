import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest?.();
        const type = context.getType?.() as string;

        const method = req?.method ?? (type === 'graphql' ? 'GRAPHQL' : 'UNKNOWN');
        const url = req?.url ?? (type === 'graphql' ? 'graphql' : 'unknown');

        const start = Date.now();
        return next.handle().pipe(
            tap(() => {
                const ms = Date.now() - start;
                console.log(`[HTTP] ${method} ${url} - ${ms}ms`);
            }),
        );
    }
}