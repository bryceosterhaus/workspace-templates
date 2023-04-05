const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function writeContainerConfig(configDir, projectConfigContent, projectName) {
	const configPath = path.join(configDir, 'client-extension.yaml')

	let sharedYamlConfig = {assemble: [], prepare: []}

	if (fs.existsSync(configPath)){
		sharedYamlConfig = {
			...sharedYamlConfig,
			...yaml.load(
				fs.readFileSync(configPath, 'utf8')
			)	
		};
	}

	const projectYamlConfig = yaml.load(projectConfigContent);

	const {assemble, prepare, ...otherSharedConfig} = sharedYamlConfig

	fs.writeFileSync(
		configPath || 'client-extension.yaml',
		yaml.dump({
			prepare: [...prepare, ...(projectYamlConfig.prepare || [])],
			assemble: [...assemble, ...projectYamlConfig.assemble],
			...otherSharedConfig,
			[projectName]: projectYamlConfig[projectName]
		},
		{ flowLevel: 3 })
	);
}

module.exports = {writeContainerConfig}