import {App, Modal} from "obsidian";
import {createRoot, Root} from "react-dom/client";
import {StrictMode, useEffect, useState} from "react";
import {
	OpenAPI,
	TimeEntryService,
	TimeEntryWithRatesDtoV1
} from "../../clockify-api";
import {ClockifyPluginSettings} from "../Model";
import dayjs from "dayjs";

export class ReportModal extends Modal {

	root: Root | null = null;

	constructor(app: App, private settings: ClockifyPluginSettings) {
		super(app);
	}

	onClose() {
		this.root?.unmount();
	}

	onOpen() {
		OpenAPI.TOKEN = this.settings.apiKey;
		OpenAPI.BASE = 'https://api.clockify.me/api'
		// OpenAPI.BASE = 'https://reports.api.clockify.me'
		OpenAPI.HEADERS = {
			'X-Api-Key': this.settings.apiKey
		};

		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<StrictMode>
				<ReportModalWidget workspaceId={this.settings.workspace} userId={this.settings.userId}/>
			</StrictMode>
		);
	}
}

function ReportModalWidget(props: {
	workspaceId: string;
	userId: string
}) {

	const [data, setData] = useState<TimeEntryWithRatesDtoV1[]>();

	useEffect(() => {
		TimeEntryService.getTimeEntries(
			props.workspaceId,
			props.userId,
			undefined,
			dayjs().subtract(1, 'w').startOf('w').toISOString(),
			dayjs().subtract(1, 'w').endOf('w').toISOString(),
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			"false",
			"1",
			"10",
			undefined,
			undefined
		).then(r => {
			setData(r);
		});
	}, []);

	return <div>
		<pre>
		{JSON.stringify(data, null, 2)}
		</pre>
	</div>
}
