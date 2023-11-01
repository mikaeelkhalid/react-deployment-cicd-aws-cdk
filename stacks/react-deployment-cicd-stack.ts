import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface ReactDeploymentCICDStackProps extends StackProps {
  isDeploy: boolean;
  environmentType: string;
  branch: string;
  pipelineName: string;
  bucketName: string;
  pipelineBucket: string;
  publicAccess: boolean;
  indexFile: string;
  errorFile: string;
  githubRepoOwner: string;
  githubRepoName: string;
  githubAccessToken: string;
}

export class ReactDeploymentCICDStack extends Stack {
  constructor(scope: Construct, id: string, props?: ReactDeploymentCICDStackProps) {
    super(scope, id, props);
  }
}

