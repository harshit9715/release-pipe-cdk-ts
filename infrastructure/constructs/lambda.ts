import * as cdk from '@aws-cdk/core';
import {Function, AssetCode, Runtime} from '@aws-cdk/aws-lambda';
import { Construct } from '@aws-cdk/core';

interface LambdaConstructProps {
    functionName: string
}

export class LambdaConstruct extends Construct {
    htmlFn: Function
    constructor(scope: cdk.Construct, id: string, props: LambdaConstructProps) {
      super(scope, id);
  
      // The code that defines your stack goes here
      this.htmlFn = new Function(this, props.functionName, {
        functionName: props.functionName,
        handler: "index.handler",
        runtime: Runtime.NODEJS_14_X,
        code: new AssetCode(`./src/functions/htmlFn`),
        memorySize: 512,
        timeout: cdk.Duration.seconds(10),
    })
  
      // example resource
      // const queue = new sqs.Queue(this, 'ReleasePipeCdkJsQueue', {
      //   visibilityTimeout: cdk.Duration.seconds(300)
      // });
    }
  }