import { join } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'yaml';

const configFilePath = join(__dirname, 'config.yaml');
const readConfigFile = readFileSync(configFilePath, 'utf8');
const config = parse(readConfigFile);

export const devProps = {
  stackName: config.stack.name + '-' + config.dev.environmentType,
  environmentType: config.dev.environmentType,
  branch: config.dev.branchName,
  pipelineName: config.dev.pipelineConfig.name,
  bucketName: config.dev.s3Config.bucketName,
  pipelineBucket: config.dev.pipelineConfig.artifactsBucket,
  publicAccess: config.dev.s3Config.publicAccess,
  indexFile: config.dev.s3Config.indexFile,
  errorFile: config.dev.s3Config.errorFile,
  githubRepoOwner: config.githubRepoOwner,
  githubRepoName: config.githubRepoName,
};

export const prodProps = {
  stackName: config.stack.name + '-' + config.prod.environmentType,
  environmentType: config.prod.environmentType,
  branch: config.prod.branchName,
  pipelineName: config.prod.pipelineConfig.name,
  bucketName: config.prod.s3Config.bucketName,
  pipelineBucket: config.prod.pipelineConfig.artifactsBucket,
  publicAccess: config.prod.s3Config.publicAccess,
  indexFile: config.prod.s3Config.indexFile,
  errorFile: config.prod.s3Config.errorFile,
  githubRepoOwner: config.githubRepoOwner,
  githubRepoName: config.githubRepoName,
};

