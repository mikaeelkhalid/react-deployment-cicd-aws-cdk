#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ReactDeploymentCICDStack } from '../stacks';
import { devProps, prodProps } from '../config';

const app = new cdk.App();

const environmentConfigs = [devProps, prodProps];

environmentConfigs.forEach((environment) => {
  if (environment.isDeploy) {
    const stackName = environment.stackName;
    new ReactDeploymentCICDStack(app, stackName, {
      ...environment,
      description: `react deployment with cicd ${environment.environmentType} stack`,
    });
  }
});

app.synth();

