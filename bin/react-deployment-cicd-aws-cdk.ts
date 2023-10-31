#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ReactDeploymentCicdAwsCdkStack } from '../lib/react-deployment-cicd-aws-cdk-stack';

const app = new cdk.App();
new ReactDeploymentCicdAwsCdkStack(app, 'ReactDeploymentCicdAwsCdkStack');
