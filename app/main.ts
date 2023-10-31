#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ReactDeploymentCICDStack } from '../stacks';

const app = new cdk.App();

new ReactDeploymentCICDStack(app, 'stack-name');

