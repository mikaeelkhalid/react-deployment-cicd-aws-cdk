import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Distribution, OriginAccessIdentity, PriceClass, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CanonicalUserPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { BlockPublicAccess, Bucket, BucketAccessControl, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface ReactDeploymentCICDStackProps extends StackProps {
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
  constructor(scope: Construct, id: string, props: ReactDeploymentCICDStackProps) {
    super(scope, id, props);

    const webBucket = this._createWebBucket(props);
    const distribution = this._createCloudFrontDistribution(webBucket);
  }

  private _createWebBucket(props: ReactDeploymentCICDStackProps) {
    const { bucketName, indexFile, errorFile, publicAccess } = props;

    const webBucket = new Bucket(this, bucketName, {
      websiteIndexDocument: indexFile,
      websiteErrorDocument: errorFile,
      publicReadAccess: publicAccess,
      removalPolicy: RemovalPolicy.DESTROY,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      encryption: BucketEncryption.S3_MANAGED,
    });

    return webBucket;
  }

  private _createCloudFrontDistribution(bucket: Bucket) {
    const oai = new OriginAccessIdentity(this, 'OAI');
    bucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [bucket.arnForObjects('*')],
        principals: [new CanonicalUserPrincipal(oai.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
      })
    );

    const s3Origin = new S3Origin(bucket, {
      originAccessIdentity: oai,
    });

    const distribution = new Distribution(this, 'react-deployment-distribution', {
      defaultBehavior: {
        origin: s3Origin,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/index.html',
          ttl: Duration.seconds(300),
        },
        {
          httpStatus: 403,
          responseHttpStatus: 500,
          responsePagePath: '/index.html',
          ttl: Duration.seconds(300),
        },
      ],
      priceClass: PriceClass.PRICE_CLASS_100,
    });

    return distribution;
  }
}

