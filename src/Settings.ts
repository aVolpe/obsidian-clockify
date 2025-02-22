import {App, PluginSettingTab, Setting} from "obsidian";
import ClockifyPlugin from "../main";

export class ClockifySettingsTab extends PluginSettingTab {

	plugin: ClockifyPlugin;

	constructor(app: App, plugin: ClockifyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();
		console.log({settings: this.plugin.settings});

		new Setting(containerEl)
			.setName('API Key')
			.setDesc('The api key, generate a new one here: https://app.clockify.me/user/preferences#advanced')
			.addText(text => text
				.setPlaceholder('Enter your API Key')
				.setValue(this.plugin.settings.apiKey)
				.onChange(async (value) => {
					this.plugin.settings.apiKey = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('User id')
			.setDesc('Your user id')
			.addText(text => text
				.setPlaceholder('Enter your User id')
				.setValue(this.plugin.settings.userId)
				.onChange(async (value) => {
					this.plugin.settings.userId = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Timezone')
			.setDesc('Your timezone in format "Europe/Berlin"')
			.addText(text => text
				.setPlaceholder('Enter your timezone')
				// get the current timezone of the user
				.setValue(this.plugin.settings.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone)
				.onChange(async (value) => {
					this.plugin.settings.apiKey = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Workspace')
			.setDesc('Your workspace')
			.addText(text => text
				.setPlaceholder('Enter your workspace')
				// get the current timezone of the user
				.setValue(this.plugin.settings.workspace)
				.onChange(async (value) => {
					this.plugin.settings.workspace = value;
					await this.plugin.saveSettings();
				}));
	}
}
