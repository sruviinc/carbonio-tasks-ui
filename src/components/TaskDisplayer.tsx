/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Container } from '@zextras/carbonio-design-system';

import { ActionsHeader } from './ActionsHeader';
import { DisplayerHeader } from './DisplayerHeader';
import { TaskDetails } from './TaskDetails';
import type { Task } from '../gql/types';
import { useActions } from '../hooks/useActions';

interface TaskDisplayerProps {
	task: Task;
}

export const TaskDisplayer = ({ task }: TaskDisplayerProps): React.JSX.Element => {
	const actions = useActions(task);
	return (
		// <Container background={'gray5'} padding={{ bottom: '1rem' }}>
		// 	<DisplayerHeader title={task.title} status={task.status} />
		// 	<Container
		// 		padding={{ horizontal: '1rem' }}
		// 		mainAlignment={'flex-start'}
		// 		minHeight={0}
		// 		maxHeight={'100%'}
		// 	>
		// 		<ActionsHeader actions={actions} />
		// 		<TaskDetails
		// 			createdAt={task.createdAt}
		// 			priority={task.priority}
		// 			reminderAt={task.reminderAt}
		// 			reminderAllDay={task.reminderAllDay}
		// 			description={task.description}
		// 		/>
		// 	</Container>
		// </Container>

		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#F5F6F8',
				display: 'flex',
				overflowY: 'hidden'
			}}
		>
			<div
				style={{
					display: 'flex',
					height: '100%',
					flexDirection: 'column',
					width: '100%',
					overflowY: 'hidden'
				}}
			>
				<div style={{ padding: '40px', height: '100%', overflowY: 'hidden' }}>
					<div
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: 'white',
							overflowY: 'hidden',
							borderRadius: '16px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between'
						}}
					>
						<div>
							<DisplayerHeader title={task.title} status={task.status} />

							<TaskDetails
								createdAt={task.createdAt}
								priority={task.priority}
								reminderAt={task.reminderAt}
								reminderAllDay={task.reminderAllDay}
								description={task.description}
							/>
						</div>
						<div>
							<ActionsHeader actions={actions} />
						</div>
					</div>

					<Container
						padding={{ horizontal: '1rem' }}
						mainAlignment={'flex-start'}
						minHeight={0}
						maxHeight={'100%'}
					></Container>
				</div>
			</div>
		</div>
	);
};
