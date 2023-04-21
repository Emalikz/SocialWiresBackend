export interface JwtPayload {
    readonly upn: string;
    readonly sub: number;
    readonly email: string;
}