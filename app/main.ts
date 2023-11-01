#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ReactDeploymentCICDStack } from '../stacks';
import { devProps, prodProps } from '../config';

const app = new cdk.App();

const devStackName = devProps.stackName;

const prodStackName = prodProps.stackName;

new ReactDeploymentCICDStack(app, devStackName, devProps);

new ReactDeploymentCICDStack(app, prodStackName, prodProps);

app.synth();
