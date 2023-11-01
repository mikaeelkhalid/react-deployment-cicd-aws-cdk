import { join } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'yaml';

const configFilePath = join(__dirname, 'config.yaml');
const readConfigFile = readFileSync(configFilePath, 'utf8');
const config = parse(readConfigFile);

function getEnvironmentConfig(environmentName: string) {
  const environment = config[environmentName];
  return {
    isDeploy: environment.deploy,
    stackName: `${config.stack.name}-${environment.environmentType}`,
    environmentType: environment.environmentType,
    branch: environment.branchName,
    pipelineName: environment.pipelineConfig.name,
    bucketName: environment.s3Config.bucketName,
    pipelineBucket: environment.s3Config.artifactsBucket,
    publicAccess: environment.s3Config.publicAccess,
    indexFile: environment.s3Config.indexFile,
    errorFile: environment.s3Config.errorFile,
    githubRepoOwner: config.githubRepoOwner,
    githubRepoName: config.githubRepoName,
  };
}

export const devProps = getEnvironmentConfig('development');
export const prodProps = getEnvironmentConfig('production');

