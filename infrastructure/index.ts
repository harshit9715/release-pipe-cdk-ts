import * as cdk from '@aws-cdk/core';
import { CfnOutput } from '@aws-cdk/core';
import { ApiLambdaStack } from './constructs/apig';
import { LambdaConstruct } from './constructs/lambda';

export class ReleasePipeCdkJsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const { htmlFn } = new LambdaConstruct(this, "lambdaFns", {
      functionName: 'htmlFxn'
    })

    new ApiLambdaStack(this, 'apig', {
      apiName: 'webApi',
      htmlFn
    })


    // example resource
    // const queue = new sqs.Queue(this, 'ReleasePipeCdkJsQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
