import { Request } from 'express';

type ToFix = any;

export type ModifiedRequest = Request & { userId: number; email: string };
