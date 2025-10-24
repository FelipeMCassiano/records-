import { Request } from "express";

export type TypedRequestBody<
    Body extends Record<string, unknown> = Record<string, never>
> = Request<Record<string, never>, unknown, Body>;

export type TypedRequestParams<
    Params extends Record<string, unknown> = Record<string, never>
> = Request<Params>;

export type TypedRequestQuery<
    Query extends Record<string, unknown> = Record<string, never>
> = Request<Record<string, never>, unknown, unknown, Query>;
