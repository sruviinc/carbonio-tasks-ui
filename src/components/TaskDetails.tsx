/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useMemo } from 'react';

import { Container, Icon, Row } from '@zextras/carbonio-design-system';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { PriorityIcon } from './PriorityIcon';
import { Reminder } from './Reminder';
import { Text } from './Text';
import type { Task } from '../gql/types';
import { useReminder } from '../hooks/useReminder';
import type { OneOrMany } from '../types/utils';
import { formatDateFromTimestamp } from '../utils';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import { Grade } from '@mui/icons-material';
import { ActionsHeader } from './ActionsHeader';
import { useActions } from '../hooks/useActions';

type TaskDetailsProps = Pick<
	Task,
	'createdAt' | 'priority' | 'reminderAt' | 'reminderAllDay' | 'description' | 'title'
>;

const ScrollableContainer = styled(Container)`
	overflow-y: auto;
`;

const DetailItem = ({
	label,
	children
}: {
	label: string;
	children: OneOrMany<React.ReactNode>;
}): React.JSX.Element | null =>
	children ? (
		<Container
			height={'auto'}
			width={'auto'}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			flexGrow={1}
			flexShrink={1}
			flexBasis={'fit-content'}
		>
			<Text size={'small'} color={'gray1'}>
				{label}
			</Text>
			<Text size={'medium'} color={'gray0'} overflow={'break-word'}>
				<Row gap={'0.5rem'} wrap={'nowrap'}>
					{children}
				</Row>
			</Text>
		</Container>
	) : null;

export const TaskDetails = ({
	createdAt,
	priority,
	reminderAt,
	reminderAllDay,
	description,
	title
}: TaskDetailsProps): React.JSX.Element => {
	const [t, { language }] = useTranslation();
	const { isExpired } = useReminder(reminderAt, reminderAllDay);

	const creationDate = useMemo(
		() => formatDateFromTimestamp(createdAt, { includeTime: false, locale: language }),
		[createdAt, language]
	);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',

				display: 'flex',
				flexDirection: 'column',
				zIndex: 1
			}}
		>
			<div style={{ margin: '16px' }}>
				<Paper variant="outlined" style={{ display: 'flex', flexDirection: 'column' }}>
					<div style={{ padding: '16px' }}>
						<Text size={'small'} color={'gray1'}>
							Task title
						</Text>
						<Typography variant="h6" style={{ wordWrap: 'break-word', textJustify: 'inter-word' }}>
							{title}
						</Typography>
					</div>
					<div className="grid grid-cols-2 p-4 w-full">
						<div>
							<Typography variant="body1" style={{ color: 'gray' }}>
								{t('displayer.details.creationDate', 'Creation date')}
							</Typography>
							<Typography variant="body2">{creationDate}</Typography>
						</div>
						<div>
							<Typography variant="body1" style={{ color: 'gray' }}>
								{t('displayer.details.priority', 'Priority')}
							</Typography>
							<div
								style={{
									width: '100%',
									height: '100%',
									display: 'flex',
									flexDirection: 'row'
								}}
							>
								<PriorityIcon priority={priority} />
								<Typography variant="body2">
									{t('task.priority', {
										context: priority.toLowerCase(),
										defaultValue: capitalize(priority)
									})}
								</Typography>
							</div>
						</div>
					</div>
					<div style={{ width: '100%', height: '100%', display: 'flex', padding: '16px' }}>
						{reminderAt && (
							<>
								<Typography variant="body1" style={{ color: 'gray' }}>
									{t('displayer.details.reminder', 'Reminder')}
								</Typography>
								<Reminder
									reminderAt={reminderAt}
									reminderAllDay={reminderAllDay}
									overflow={'break-word'}
									size={'medium'}
								/>
								{isExpired && (
									<Container height={'fit'} width={'fit'} flexShrink={0}>
										<Icon icon={'AlertTriangle'} color={'warning'} />
									</Container>
								)}
							</>
						)}
					</div>
					<div
						style={{
							width: '100%',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							padding: '16px'
						}}
					>
						<Typography variant="body2" style={{ color: 'gray' }}>
							{t('displayer.details.description', 'Description')}
						</Typography>
						<Typography variant="body1" style={{ textJustify: 'inter-word', textAlign: 'justify' }}>
							{description}
						</Typography>
					</div>
				</Paper>
			</div>
		</div>
	);
};

{
	/* <div style={{ padding: '16px' }}>
				<Text size={'small'} color={'gray1'}>
					Task title
				</Text>
				<Typography variant="h6" style={{ wordWrap: 'break-word', textJustify: 'inter-word' }}>
					{title}
				</Typography>
			</div>
		
			

			 */
}

{
	/* <ScrollableContainer mainAlignment={'flex-start'}>
	<Container
		background={'gray6'}
		padding={'1rem'}
		gap={'1rem'}
		height={'auto'}
		mainAlignment={'flex-start'}
		crossAlignment={'flex-start'}
	>
		<Container
			height={'auto'}
			orientation={'horizontal'}
			gap={'1rem'}
			crossAlignment={'flex-start'}
		>
			<DetailItem label={t('displayer.details.creationDate', 'Creation date')}>
				{creationDate}
			</DetailItem>
			<DetailItem label={t('displayer.details.priority', 'Priority')}>
				<PriorityIcon priority={priority} />
				{t('task.priority', {
					context: priority.toLowerCase(),
					defaultValue: capitalize(priority)
				})}
			</DetailItem>
		</Container>
		<Divider />
		<DetailItem label={t('displayer.details.reminder', 'Reminder')}>
			{reminderAt && (
				<>
					<Reminder
						reminderAt={reminderAt}
						reminderAllDay={reminderAllDay}
						overflow={'break-word'}
						size={'medium'}
					/>
					{isExpired && (
						<Container height={'fit'} width={'fit'} flexShrink={0}>
							<Icon icon={'AlertTriangle'} color={'warning'} />
						</Container>
					)}
				</>
			)}
		</DetailItem>
		<DetailItem label={t('displayer.details.description', 'Description')}>{description}</DetailItem>
	</Container>
</ScrollableContainer>; */
}
