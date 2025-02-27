import { z } from 'zod';

const JWTAlgorithmSchema = z.enum(['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512', 'PS256', 'PS384', 'PS512', 'none']);

export const JWTHeaderSchema = z.object({
    alg: JWTAlgorithmSchema,
    typ: z.string().optional(),
    cty: z.string().optional(),
    kid: z.string().optional(),
    jku: z.string().url().optional(),
    jwk: z.record(z.string(), z.any()).optional(),
    x5u: z.string().url().optional(),
    x5c: z.array(z.string()).optional(),
    x5t: z.string().optional(),
    'x5t#S256': z.string().optional(),
    crit: z.array(z.string()).optional(),
});

export const JWTPayloadSchema = z
    .object({
        iss: z.string().optional(),
        sub: z.string().optional(),
        aud: z.union([z.string(), z.array(z.string())]).optional(),
        exp: z.number().optional(),
        nbf: z.number().optional(),
        iat: z.number().optional(),
        jti: z.string().optional(),
    })
    .catchall(z.any()); // Allows custom claims
