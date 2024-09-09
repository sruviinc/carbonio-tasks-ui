/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useMemo } from 'react';

import { Container, Icon, Row } from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { ContextualMenu } from './ContextualMenu';
import { ListItemHoverBar } from './ListItemHoverBar';
import { PriorityIcon } from './PriorityIcon';
import { Reminder } from './Reminder';
import { HoverContainer, ListItemContainer } from './StyledComponents';
import { Text } from './Text';
import { LIST_ITEM_HEIGHT } from '../constants';
import { type Task, Status } from '../gql/types';
import { useActions } from '../hooks/useActions';
import { useReminder } from '../hooks/useReminder';

import { Priority } from '../gql/types';
import { Typography } from '@mui/material';
import { SruviPriorityIcon } from './SruviPriorityIcon';

type ListItemContentProps = Pick<
	Task,
	'id' | 'priority' | 'reminderAt' | 'reminderAllDay' | 'title' | 'status'
> & {
	visible?: boolean;
	onClick?: (id: string) => void;
};

const ReminderIconContainer = styled(Container)`
	height: ${({ theme }): string => `${parseFloat(theme.sizes.font.small) * 1.5}rem`};
`;

const ContentContainer = styled(Container)`
	overflow: hidden;
`;

export const ListItemContent = React.memo<ListItemContentProps>(function ListItemContentFn({
	id,
	priority,
	reminderAt,
	title,
	reminderAllDay,
	onClick,
	status,
	// others props
	visible
}) {
	const [t] = useTranslation();
	const { isExpired: isReminderExpired } = useReminder(reminderAt, reminderAllDay);
	const actions = useActions({ id, title, status });

	const clickHandler = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
		onClick?.(id);
	}, [id, onClick]);

	const missingReminderLabel = useMemo(
		() => t('tasksListItem.reminder.doNotRemindMe', 'Do not remind me'),
		[t]
	);

	const preventTextSelection = useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
		if (e.detail > 1) {
			e.preventDefault();
		}
	}, []);

	/////////sruvi/////////

	const Task01Icon = (props: React.SVGProps<SVGSVGElement>) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={24}
			height={24}
			color={'#000000'}
			fill={'none'}
			{...props}
		>
			<path
				d="M7.99805 16H11.998M7.99805 11H15.998"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinejoin="round"
			/>
		</svg>
	);

	const high = priority === Priority.High ? true : false;
	const low = priority === Priority.Low ? true : false;
	const medium = priority === Priority.Medium ? true : false;

	///////////sruvi/////////////

	return (
		<Container data-testid={id} height={LIST_ITEM_HEIGHT}>
			<div style={{ width: '100%', height: '100%,display:flex' }}>
				<div style={{ padding: '16px' }}>
					{visible && (
						<ContextualMenu actions={actions}>
							<ListItemContainer
								height={'fit'}
								crossAlignment={'flex-end'}
								onMouseDown={preventTextSelection}
								onClick={clickHandler}
								data-testid={'list-item-content'}
							>
								<HoverContainer
									height={LIST_ITEM_HEIGHT}
									wrap="nowrap"
									mainAlignment="flex-start"
									crossAlignment="center"
									padding={{ all: 'small' }}
									width="fill"
									gap={'1rem'}
								>
									<ContentContainer
										orientation="vertical"
										height={'auto'}
										maxHeight={'100%'}
										gap={'0.25rem'}
										width="fill"
										mainAlignment={'flex-start'}
									>
										<Row gap={'0.25rem'} width="fill" wrap="nowrap">
											<div style={{ width: '60%' }}>
												{/* <Text overflow="ellipsis" size="medium">
													{title}
												</Text> */}
												<Typography noWrap variant="body1" style={{ color: 'black', overflow: '' }}>
													{title}
												</Typography>
											</div>

											{status === Status.Complete ? (
												<Container
													margin={{ left: 'auto' }}
													width={'fit'}
													height={'fit'}
													flexShrink={0}
												>
													<SruviPriorityIcon priority={priority} />
												</Container>
											) : (
												<Container
													margin={{ left: 'auto' }}
													width={'fit'}
													height={'fit'}
													flexShrink={0}
												>
													<PriorityIcon priority={priority} />
												</Container>
											)}

											{/* <Container
												margin={{ left: 'auto' }}
												width={'fit'}
												height={'fit'}
												flexShrink={0}
											>
												<PriorityIcon priority={priority} />
											</Container> */}
										</Row>
										<Row
											gap={'0.25rem'}
											width="fill"
											wrap="nowrap"
											mainAlignment="space-between"
											crossAlignment={'flex-start'}
										>
											<Container
												flexShrink={1}
												flexGrow={1}
												flexBasis="auto"
												mainAlignment="flex-start"
												orientation="horizontal"
												minWidth={0}
												width="auto"
												height={'auto'}
												wrap={'wrap-reverse'}
												crossAlignment={'flex-start'}
											>
												{reminderAt ? (
													<>
														<Text size="small">
															{t('tasksListItem.reminder.remindMeOn', 'Remind me on')}&nbsp;
														</Text>
														<Container
															width={'fit'}
															height={'fit'}
															flexShrink={0}
															maxWidth={'100%'}
														>
															<Reminder reminderAt={reminderAt} reminderAllDay={reminderAllDay} />
														</Container>
													</>
												) : (
													<Text color="secondary" size="small">
														{missingReminderLabel}
													</Text>
												)}
											</Container>
											{isReminderExpired && (
												<ReminderIconContainer width={'fit'} flexShrink={0}>
													<Icon icon="AlertTriangle" color="warning" />
												</ReminderIconContainer>
											)}
										</Row>
									</ContentContainer>
								</HoverContainer>
								<ListItemHoverBar actions={actions} />
							</ListItemContainer>
						</ContextualMenu>
					)}
				</div>
			</div>
		</Container>
	);
});
