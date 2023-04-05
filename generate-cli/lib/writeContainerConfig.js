const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function writeContainerConfig(configDir, projectConfigContent, projectName, dev) {
	const name = dev ? 'client-extension.dev.yaml' : 'client-extension.yaml';
	
	const configPath = path.join(configDir, name)

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
		configPath || name,
		yaml.dump({
			...(!dev ? {
				prepare: [...prepare, ...(projectYamlConfig.prepare || [])],
				assemble: [...assemble, ...(projectYamlConfig.assemble|| [])]}
					: {}),
			...otherSharedConfig,
			[projectName]: projectYamlConfig[projectName]
		},
		{ flowLevel: 3 })
	);
}

module.exports = {writeContainerConfig}