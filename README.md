# React Deployment CI/CD with AWS CDK 🚀

[![Mikaeel Khalid](https://badgen.now.sh/badge/by/mikaeelkhalid/purple)](https://github.com/mikaeelkhalid)

This project sets up a Continuous Integration/Continuous Deployment (CI/CD) pipeline for deploying a React application to AWS S3
and CloudFront using AWS CDK (Cloud Development Kit). It allows you to automatically build, and deploy your React app based on
different environments (development and production) with custom configurations.

This project continues the: [react-deployment-aws-cdk](https://github.com/mikaeelkhalid/react-deployment-aws-cdk) project.

Route53 hosted zone support version here: [route53 hosted zone version](https://github.com/mikaeelkhalid/react-deployment-cicd-aws-cdk/tree/route53-version)

## 📚 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
   - [Configure Your Environment](#configure-your-environment)
   - [Deploying the Infrastructure](#deploying-the-infrastructure)
   - [Customizing the Configuration](#customizing-the-configuration)
4. [CI/CD Pipeline](#ci/cd-pipeline)
5. [Accessing the Deployed React App](#accessing-the-deployed-react-app)
6. [Cleaning Up](#cleaning-up)
7. [Note](#Note)
8. [Contribute](#Contribute)

## 🛠 Prerequisites

Before you get started, make sure you have the following prerequisites in place:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your local machine.
- An [AWS account](https://aws.amazon.com/) with appropriate permissions for AWS CDK and other services used in this project.
- AWS CDK CLI installed globally. You can install it using the following command:

  ```bash
  npm install -g aws-cdk
  ```

- AWS CLI configured with your AWS credentials. You can configure it using:

  ```bash
  aws configure
  ```

- Your React application source code hosted on a GitHub repository.

## 📂 Project Structure

The project structure consists of the following key components:

- `app/main.ts`: The main AWS CDK application file that defines the infrastructure and CI/CD pipeline.
- `config/config.yaml`: Configuration file that defines the deployment settings for both development and production environments.
- `stacks/react-deployment-cicd-stack.ts`: AWS CDK stack file that defines the infrastructure and CI/CD pipeline constructs.

## 🚀 Getting Started

### ⚙️ Configure Your Environment

1. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/mikaeelkhalid/react-deployment-cicd-aws-cdk.git
   ```

2. Change project directory.

   ```bash
   cd react-deployment-cicd-aws-cdk
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

### 🏗 Deploying the Infrastructure

To deploy the infrastructure and set up the CI/CD pipeline, follow these steps:

1. Deploy the AWS CDK stack. This will create the S3 bucket, CloudFront distribution, CodePipeline, and other required AWS
   resources based on the configuration in `config/config.yaml`:

Note: Rename `config/config.sample.yaml` to `config/config.yaml`

```bash
cdk deploy
```

Make sure to approve the changes when prompted.

### ⚙️ Customizing the Configuration

You can customize the deployment settings by editing the `config/config.yaml` file. You can enable or disable deployments for
development and production environments and adjust other parameters as needed.

## 🚀 CI/CD Pipeline

The CI/CD pipeline consists of the following stages:

1. **Source**: The GitHub source code is automatically fetched based on the branch specified in the configuration.

2. **Build**: The React app is built using AWS CodeBuild. This stage also creates a CloudFront cache invalidation to ensure the
   latest version is served.

3. **Deploy**: The built React app is deployed to the S3 bucket, and the changes are automatically propagated to the CloudFront
   distribution.

## 🌐 Accessing the Deployed React App

After the deployment is complete, you can access your deployed React application using the following URLs:

- CloudFront Website URL: `{CloudFront_Distribution_Domain}` (outputted during the deployment)
- S3 Bucket Website URL: `{S3_Bucket_Website_URL}` (outputted during the deployment)

## ♻️ Cleaning Up

To delete the AWS resources created by this project, you can use the following command:

```bash
cdk destroy
```

Make sure to approve the changes when prompted.

## 🛡️ Note

Ensure your IAM permissions are appropriately set to allow the CDK to manage AWS resources on your behalf. Additionally, ensure
that your GitHub token has the right permissions, especially for accessing the repository and triggering webhooks.

## 🙌 Contribute

Contributions are more than welcome! Feel free to fork this repository, make your improvements, and then submit them back through
a pull request.

