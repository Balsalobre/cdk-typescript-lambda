import { APIGatewayEvent, Context } from "aws-lambda";

export type HttpMethod = (event: APIGatewayEvent, context: Context) => Promise<Response>;

export interface Item {
  name: string;
  date: number;
}

export interface Response {
  statusCode: number;
  body: string;
}
