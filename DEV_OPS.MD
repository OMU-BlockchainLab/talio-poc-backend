# Deployment tutorial

### Part 1. Preparation

Install Ansible. Ansible can be installed with brew:
([How to install Homebrew](https://brew.sh/))

```sh
$ brew install ansible
```

Install awscli. awscli also can be installed with brew:

```sh
$ brew install awscli
```



### Part 2. Initialization from StartupCraft Boilerplate

Before continue, you should already have an account in AWS account produced by Terraform.

* Here you need to clone our [boilerplate repository](https://github.com/StartupCraft/startupcraft-node) for backend.
  Rename the downloaded repository to the project name to follow the format `{project-name}-backend`. In our example, we will use the different repository name on purpose - `example-backend`

* Next, you need to reset .git history from the main repository

```sh
$ rm -rf .git
```

* Recreate the repos from the current content only

```sh
$ git init
$ git add .
$ git commit -m "Initial commit"
```

* Push to the github remote repos ensuring you overwrite history

```sh
$ git remote add origin git@github.com:<YOUR ACCOUNT NAME>/<YOUR PROJECT NAME>-backend.git
```

​	**For our example:**

```sh
$ git remote add origin git@github.com:StartupCraft/example-backend.git
$ git push -u --force origin master
```



### Part 3. Ansible configuration

Open `ansible/staging/group_vars/all/vars.yml`. It will look like:

```yaml
env: {env}
node_env: {node_env}
repo: git@github.com:{your_account_name}/{project_name}-backend.git
port: 80

# Configuration from terraform output
aws_region: {aws_region}
aws_s3_bucket: {aws_s3_bucket}
cluster: {cluster}

image_name: {backend_image_name}
image_repository: {backend_image_repository}
task_role_arn: {task_role_arn}
execution_role_arn: {execution_role_arn}

subnets: {public_subnets}
security_groups: {security_groups}

# App container configuration
app_cpu: 512
app_memory: 1024
app_container_cpu: 512
app_container_memory: 1024
app_desired_count: 1

# Non-sensitive vars
cors_origin: "*"
app_sentry_dsn: ""

```

Now you should go to infrastructure, run `make staging-apply` and collect output, example:

```sh
...
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.

Outputs:

aws_region = us-west-1
aws_s3_bucket = example-staging-files
backend_image_name = example-backend
backend_image_repository = 525215751568.dkr.ecr.us-west-1.amazonaws.com/example-backend
cluster = example-staging
deployer_access_id = AKIBXUSKMLWIEMOOQZ4T
deployer_access_key = F3bew/Ph8kN2HneiydgM8F54FhPjNZ5wVOwckTJS
execution_role_arn = arn:aws:iam::525215751568:role/ecs/example-staging-execution-role
frontend_image_name = example-frontend
frontend_image_repository = 525215751568.dkr.ecr.us-west-1.amazonaws.com/example-frontend
landing_image_name = example-landing
landing_image_repository = 525215751568.dkr.ecr.us-west-1.amazonaws.com/example-landing
public_subnets = [
  "subnet-0630e97c0f3562be6",
  "subnet-0a5b17a8a57b9f82c",
]
security_groups = [
  "sg-095b33d9ebcc37170",
]
task_role_arn = arn:aws:iam::525215751568:role/ecs/example-staging-task-role

```

Let's replace placeholders with actual values:

```yaml
env: staging
node_env: production
repo: git@github.com:StartupCraft/example-backend.git
port: 80

# Configuration from terraform output
aws_region: us-west-1
aws_s3_bucket: example-staging-files
cluster: example-staging

image_name: example-backend
image_repository: 525215751568.dkr.ecr.us-west-1.amazonaws.com/example-backend
task_role_arn: arn:aws:iam::525215751568:role/ecs/example-staging-task-role
execution_role_arn: arn:aws:iam::525215751568:role/ecs/example-staging-execution-role

subnets: ['subnet-0630e97c0f3562be6', 'subnet-0a5b17a8a57b9f82c']
security_groups: ['sg-095b33d9ebcc37170']

# App container configuration
app_cpu: 512
app_memory: 1024
app_container_cpu: 512
app_container_memory: 1024
app_desired_count: 1

# Non-sensitive vars
cors_origin: "*"
app_sentry_dsn: ""

```

All done – ansible is ready to build and run commands on Fargate.

### 4. CircleCI Configuration

Let's configure CircleCI! First, navigate to `.circleci/config.yml` file and edit few lines:

```yaml
...
      - run:
          name: Deploy to AWS
          command: |
            if [ "${CIRCLE_BRANCH}" == "master" ]; then
              AWS_DEFAULT_REGION={aws_region} ANSIBLE_CONFIG=ansible/ansible.cfg ansible-playbook ansible/release-deploy.yml -i ansible/staging --extra-vars "branch=master aws_profile=default" -v -e 'ansible_python_interpreter=/usr/bin/python3'
            elif [ "${CIRCLE_BRANCH}" == "production" ]; then
              AWS_DEFAULT_REGION={aws_region} ANSIBLE_CONFIG=ansible/ansible.cfg ansible-playbook ansible/release-deploy.yml -i ansible/production --extra-vars "branch=production aws_profile=default" -v -e 'ansible_python_interpreter=/usr/bin/python3'
            fi
...
```

You need to replace two occurencies of `{aws_region}` with region, like:

```yaml
...
      - run:
          name: Deploy to AWS
          command: |
            if [ "${CIRCLE_BRANCH}" == "master" ]; then
              AWS_DEFAULT_REGION=us-west-1 ANSIBLE_CONFIG=ansible/ansible.cfg ansible-playbook ansible/release-deploy.yml -i ansible/staging --extra-vars "branch=master aws_profile=default" -v -e 'ansible_python_interpreter=/usr/bin/python3'
            elif [ "${CIRCLE_BRANCH}" == "production" ]; then
              AWS_DEFAULT_REGION=us-west-1 ANSIBLE_CONFIG=ansible/ansible.cfg ansible-playbook ansible/release-deploy.yml -i ansible/production --extra-vars "branch=production aws_profile=default" -v -e 'ansible_python_interpreter=/usr/bin/python3'
            fi
...
```



That's all for local configuration. Let's go to the CircleCI:

Navigate to https://app.circleci.com/projects/project-dashboard/github/<ACCOUNT_NAME>/ and click Set Up Project.![img](https://lh3.googleusercontent.com/I--w4SCGCgt1XkkIuToIl0E7CLXVVnm44YwP3_-969UAzb9csTNlXzy9srGyKRGSMR42MlCN-1kHPD3RvIp4rtMooX0XTJu75OhRdukjWir9ZIaPD8O8JkLwXp7xfixgrnxOxZc9)

Then CircleCI will ask you to use existing config or create a new one – just click `Use Existing Config`![img](https://lh4.googleusercontent.com/xUxYuKyPuM5Gl21X2cfsZgVp-vcMmtswYPiWuezIGjYjax0nHKH3c_VyXykn8XPxh1CkqX5prVSW41tlG01iKfNvGZCXYjXxKhzD2c6HjQOiUnWcCRC85i205XmBIw9dojmP9wdQ)

Click `Start Building`![img](https://lh3.googleusercontent.com/ztn2fgXcwv0cGdOIbGWiZgV0ULFRK4Fti1WyGYEUXOYscQS17kZ11rsvY2mrY7qgR2I8ForjN-aYrL_MElFezI-mATAi5xQfHGd-2Iwk5W7PJ4wO2DRQh7klUMUThTkV7xPdeqRE)

After this, you need to setup AWS Keys. Let's go to the project settings:
![Снимок экрана 2020-11-26 в 14.13.27](/Users/msnake/Desktop/Снимок экрана 2020-11-26 в 14.13.27.png)

You need to set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. It should be `deployer_access_id` and `deployer_access_key` from Terraform ouput. Please never use main DevOps keys for CircleCI – it doesn't safe.![Снимок экрана 2020-11-26 в 14.18.10](/Users/msnake/Desktop/Снимок экрана 2020-11-26 в 14.18.10.png)

That's all – now you can commit and build!



### 5. Adding new variables

So, we need to add some secrets to our app – like Google Client ID and Google Client Secret.

First of all, you need to add this variables to the Secrets Manager in the AWS. You can find documentation about this process in the README in the infrastructure boilerplate repository. Collect variable path and name, which will looks like `/example-staging/backend/GOOGLE_CLIENT_ID` and  `/example-staging/backend/GOOGLE_CLIENT_SECRET`

Next, navigate to the `ansible/vars-tasks.yml` and add this vars:

```yaml
...

- set_fact:
    ssm_google_client_id: "{{ lookup('aws_ssm', '/{{ cluster }}/backend/GOOGLE_CLIENT_ID') }}"

- set_fact:
    ssm_google_client_secret: "{{ lookup('aws_ssm', '/{{ cluster }}/backend/GOOGLE_CLIENT_SECRET') }}"
```

Please follow common naming convention from this file.

Next you should go to `ansible/templates/task_definition.json.j2` and add this variables to the `environment` section:

```json
          ...
          "value": "{{ ssm_secrets_session }}"
        },
        {
          "name": "GOOGLE_CLIENT_ID",
          "value": "{{ ssm_google_client_id }}"
        },
        {
          "name": "GOOGLE_CLIENT_SECRET",
          "value": "{{ ssm_google_client_secret }}"
        }
```

That's all – just push updates to the repo.
