AWS_PROFILE := sappchat
STAGING_BRANCH := master
ANSIBLE_CONFIG := ansible/ansible.cfg

staging-command:
	ANSIBLE_CONFIG=${ANSIBLE_CONFIG} ansible-playbook ansible/command.yml -i ansible/staging --extra-vars "aws_profile=${AWS_PROFILE}" -v

production-command:
	ANSIBLE_CONFIG=${ANSIBLE_CONFIG} ansible-playbook ansible/command.yml -i ansible/production --extra-vars "aws_profile=${AWS_PROFILE}" -v
