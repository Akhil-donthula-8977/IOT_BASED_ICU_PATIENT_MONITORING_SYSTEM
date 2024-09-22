const { DynamoDBClient, ScanCommand,QueryCommand } = require('@aws-sdk/client-dynamodb');


const dynamoClient = new DynamoDBClient({
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY
    }
});

const TABLE_NAME = 'test_1';
const readAllValues = async () => {
    const command = new ScanCommand({
        TableName: TABLE_NAME
    });
    try {
        const { Items = [] } = await dynamoClient.send(command);
        return { success: true, data: Items };
    } catch(error) {
        console.error("Error reading values from DynamoDB:", error);
        return { success: false, data: null };
    }
};
const getLastValues = async () => {
  const params = {
      TableName: TABLE_NAME,
      Limit: 100,
      ScanIndexForward: true 
  };
  
  try {
      const command = new ScanCommand(params);
      const { Items = [] } = await dynamoClient.send(command);
      return { success: true, data: Items };
  } catch(error) {
      console.error("Error retrieving last 100 values from DynamoDB:", error);
      return { success: false, data: null };
  }
};
module.exports = { readAllValues,getLastValues };