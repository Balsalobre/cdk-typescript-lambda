import { Handler, Context, APIGatewayEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { HttpMethod, Item } from "./interfaces/function";

const dynamo = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.HELLO_TABLE_NAME;

const save: HttpMethod = async (event: APIGatewayEvent) => {
  const name = getNameFromQueryParameter(event);
  const item: Item = {
    name,
    date: Date.now(),
  };
  const savedItem = await saveItem(item);
  return {
    statusCode: 200,
    body: JSON.stringify(savedItem),
  };
};

const getNameFromQueryParameter = ({
  queryStringParameters,
}: APIGatewayEvent): string => {
  const { name } = queryStringParameters ?? {};
  if (typeof name !== "string") {
    throw new Error("Missing or invalid name parameter");
  }
  return name;
};

const generateGreetingMessage = (date: number): string => {
  const savedAt = new Date(date);
  return `Was greeted on ${savedAt.getDate()}/${
    savedAt.getMonth() + 1
  }/${savedAt.getFullYear()}`;
}

const getHello: HttpMethod = async (event: APIGatewayEvent) => {
  const name = getNameFromQueryParameter(event);
  const item = await getItem(name);

  if (item && item.date) {
    const message = generateGreetingMessage(item.date);
    return {
      statusCode: 200,
      body: JSON.stringify(message),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify("Nobody was greeted with that name"),
  };
};

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  const httpMethods: Record<string, HttpMethod> = {
    'GET': getHello,
    'POST': save,
  };
  const { httpMethod } = event;
  const selectedMethod = httpMethods[httpMethod];

  if (selectedMethod) {
    return await selectedMethod(event, context);
  } else {
    return {
      statusCode: 400,
      body: "Invalid method",
    };
  }
};

export const getItem2 = (saludo: string): string => {
  return saludo;
}

export const getItem = async (name: string): Promise<Item | undefined> => {
  if (!TABLE_NAME) return;
  const params: DynamoDB.DocumentClient.GetItemInput = {
    Key: {
      name: name,
    },
    TableName: TABLE_NAME,
  };

  const { Item } = await dynamo.get(params).promise();
  return Item as Item;
}

export const saveItem = async (item: Item): Promise<Item | undefined> => {
  if (!TABLE_NAME) return;
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: TABLE_NAME,
    Item: item,
  };

  await dynamo.put(params).promise();
  return item;
}
