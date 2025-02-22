export interface ClockifyPluginSettings {
	apiKey: string;
	userId: string;
	workspace: string;
	timeZone: string;
}

export const DEFAULT_SETTINGS: ClockifyPluginSettings = {
	apiKey: '',
	userId: '',
	workspace: '',
	timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
}
