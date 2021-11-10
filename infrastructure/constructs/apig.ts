import { Construct, NestedStackProps, NestedStack, StackProps, CfnOutput } from '@aws-cdk/core';
import { IResource, LambdaIntegration, MockIntegration, PassthroughBehavior, RestApi, RestApiProps } from '@aws-cdk/aws-apigateway';
import { Function } from '@aws-cdk/aws-lambda'

interface ApigConstructProps {
    htmlFn: Function
    apiName: string
}

export class ApiLambdaStack extends Construct {
    constructor(scope: Construct, id: string, props: ApigConstructProps) {
        super(scope, id);

        const getAllIntegration = new LambdaIntegration(props.htmlFn);

        // Create an API Gateway resource for each of the CRUD operations
        const api = new RestApi(this, 'websiteApi', {
            restApiName: props.apiName
        });

        const items = api.root.addResource('web');
        items.addMethod('GET', getAllIntegration);
        addCorsOptions(items);

        // Exports
        new CfnOutput(this, 'apiUrl', {
            value: api.url,
            exportName: 'webApiUrl'
        })
    }
}

export function addCorsOptions(apiResource: IResource) {
    apiResource.addMethod('OPTIONS', new MockIntegration({
        integrationResponses: [{
            statusCode: '200',
            responseParameters: {
                'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
                'method.response.header.Access-Control-Allow-Origin': "'*'",
                'method.response.header.Access-Control-Allow-Credentials': "'false'",
                'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
            },
        }],
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestTemplates: {
            "application/json": "{\"statusCode\": 200}"
        },
    }), {
        methodResponses: [{
            statusCode: '200',
            responseParameters: {
                'method.response.header.Access-Control-Allow-Headers': true,
                'method.response.header.Access-Control-Allow-Methods': true,
                'method.response.header.Access-Control-Allow-Credentials': true,
                'method.response.header.Access-Control-Allow-Origin': true,
            },
        }]
    })
}