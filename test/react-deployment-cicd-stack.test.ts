import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as ReactDeploymentCicdAwsCdk from '../stacks';

test('stack name', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ReactDeploymentCicdAwsCdk.ReactDeploymentCICDStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);
});

