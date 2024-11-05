/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useEffect } from 'react';

import { Container } from '@zextras/carbonio-design-system';

import { ActionsHeader } from './ActionsHeader';
import { DisplayerHeader } from './DisplayerHeader';
import { TaskDetails } from './TaskDetails';
import type { Task } from '../gql/types';
import { useActions } from '../hooks/useActions';
import { BACKGROUND_COLOR } from '../sruvi/EditedColors';

interface TaskDisplayerProps {
	task: Task;
	hello: (value: boolean) => void;
}

export const TaskDisplayer = ({ task, hello }: TaskDisplayerProps): React.JSX.Element => {
	const actions = useActions(task);

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				background: BACKGROUND_COLOR
			}}
		>
			<div style={{ width: '100%' }}>
				<DisplayerHeader title={task.title} status={task.status} hello={hello} />
			</div>
			<div>
				<TaskDetails
					title={task.title}
					createdAt={task.createdAt}
					priority={task.priority}
					reminderAt={task.reminderAt}
					reminderAllDay={task.reminderAllDay}
					description={task.description}
				/>
				<ActionsHeader actions={actions} />
			</div>
		</div>
	);
};
