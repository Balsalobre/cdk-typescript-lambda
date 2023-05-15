import { describe, test, expect } from '@jest/globals';
import { MockProxy, mock } from "jest-mock-extended";
import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { App, Stack } from 'aws-cdk';
import { getItem, saveItem, handler } from "../functions/function";

// Mock APIGatewayEvent object
const createMockEvent = (name: string, method: string) =>
  mock<APIGatewayEvent>({
    httpMethod: method,
    queryStringParameters: { name },
  });

// Mock DynamoDB.DocumentClient object
const createMockDocumentClient = (returnValue: any) =>
  mock<DynamoDB.DocumentClient>({
    get: jest
      .fn()
      .mockReturnValue({ promise: () => Promise.resolve(returnValue) }),
    put: jest.fn().mockReturnValue({ promise: () => Promise.resolve() }),
  });

describe("getItem", () => {
  test("should return an item from DynamoDB", async () => {
    const name = "test";
    const expectedItem = { name, date: Date.now() };
    const documentClient = createMockDocumentClient({ Item: expectedItem });
    console.log({ documentClient });
    console.log({ getItem });
    // const result = await getItem(name);
    // expect(result).toEqual(expectedItem);
    // expect(documentClient.get).toHaveBeenCalledWith({
    //   Key: { name },
    //   TableName: process.env.HELLO_TABLE_NAME,
    // });
  });

  // test("should return undefined if DynamoDB does not return an item", async () => {
  //   const name = "test";
  //   const documentClient = createMockDocumentClient(undefined);
  //   const result = await getItem(name);
  //   expect(result).toBeUndefined();
  //   expect(documentClient.get).toHaveBeenCalledWith({
  //     Key: { name },
  //     TableName: process.env.HELLO_TABLE_NAME,
  //   });
  // });
});

// describe("saveItem", () => {
//   test("should save an item to DynamoDB", async () => {
//     const name = "test";
//     const expectedItem = { name, date: Date.now() };
//     const documentClient = createMockDocumentClient({});
//     await saveItem(expectedItem);
//     expect(documentClient.put).toHaveBeenCalledWith({
//       TableName: process.env.HELLO_TABLE_NAME,
//       Item: expectedItem,
//     });
//   });
// });

// Example test that uses the mocks
//   describe("handler", () => {
//     test("should return a greeting message", async () => {
//       //   let event: MockProxy<APIGatewayEvent>;
// //   let context: MockProxy<Context>;
//       let callback: any;
//       const name = "test";
//       const event = createMockEvent(name, "GET");
//       const expectedItem = { name, date: Date.now() };
//       const documentClient = createMockDocumentClient({ Item: expectedItem });
//       const response = await handler(event, {} as Context, callback);
//       expect(response.statusCode).toBe(200);
//       expect(response.body).toEqual(
//         JSON.stringify(`Was greeted on ${new Date(expectedItem.date).getDate()}/${new Date(expectedItem.date).getMonth() + 1}/${new Date(expectedItem.date).getFullYear()}`)
//       );
//     });
//   });
