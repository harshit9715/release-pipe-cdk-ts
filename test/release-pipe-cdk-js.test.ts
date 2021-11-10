import { Template } from '@aws-cdk/assertions';
import * as cdk from '@aws-cdk/core';
import {ReleasePipeCdkJsStack} from '../infrastructure';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/release-pipe-cdk-js-stack.ts

test('Lambda Fn Created', () => {
    const app = new cdk.App();
      // WHEN
    const stack = new ReleasePipeCdkJsStack(app, 'MyTestStack');
      // THEN
    const template = Template.fromStack(stack);
  
    template.hasResource('AWS::Lambda::Function', {});
  });

  test('REST API is Created', () => {
    const app = new cdk.App();
      // WHEN
    const stack = new ReleasePipeCdkJsStack(app, 'MyTestStack');
      // THEN
    const template = Template.fromStack(stack);
  
    template.hasResource('AWS::ApiGateway::RestApi', {});
  });

test('Lambda Fn has 10 sec timeout ', () => {
  const app = new cdk.App();
    // WHEN
  const stack = new ReleasePipeCdkJsStack(app, 'MyTestStack');
    // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
    Timeout: 10,
  });
});
