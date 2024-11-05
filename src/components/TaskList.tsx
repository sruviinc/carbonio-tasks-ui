/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, useState } from 'react';

import {
	Container,
	getColor,
	ListItem,
	type ListItemProps,
	ListV2,
	pseudoClasses,
	Row
} from '@zextras/carbonio-design-system';
import { isEmpty, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import styled, { css, type DefaultTheme, type SimpleInterpolation } from 'styled-components';

import { ListItemContent } from './ListItemContent';
import { HoverBarContainer } from './StyledComponents';
import { Text } from './Text';
import { LIST_WIDTH } from '../constants';
import { Priority, type FindTasksQuery } from '../gql/types';
import { useActiveItem } from '../hooks/useActiveItem';
import { useRandomPlaceholder } from '../hooks/useRandomPlaceholder';
import type { NonNullableList } from '../types/utils';
import {
	Paper,
	Divider,
	FormControl,
	Grid2,
	IconButton,
	InputLabel,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Typography
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import {
	BACKGROUND_COLOR,
	BACKGROUND_HEADER_COLOR,
	HIGH_PRIORITY,
	LOW_PRIORITY,
	MEDIUM_PRIORITY,
	PRIMARY_COLOR,
	PRIMARY_ICON_COLOR_ACTIVE
} from '../sruvi/EditedColors';
import { Filter1Rounded, PriorityHighRounded } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';

type TaskListProps = {
	tasks: NonNullableList<FindTasksQuery['findTasks']>;
};

const StyledListItem = styled(ListItem).attrs<
	ListItemProps,
	{ backgroundColor?: string | keyof DefaultTheme['palette'] }
>(({ background, selectedBackground, activeBackground, active, selected }) => ({
	backgroundColor: (active && activeBackground) || (selected && selectedBackground) || background
}))`
	${({ backgroundColor, theme }): SimpleInterpolation =>
		backgroundColor && pseudoClasses(theme, backgroundColor, 'color')}
	transition: none;

	${({ backgroundColor, theme }): SimpleInterpolation =>
		backgroundColor &&
		css`
			${HoverBarContainer} {
				background: linear-gradient(to right, transparent, ${getColor(backgroundColor, theme)});
			}
			&:focus ${HoverBarContainer} {
				background: linear-gradient(
					to right,
					transparent,
					${getColor(`${backgroundColor}.focus`, theme)}
				);
			}

			&:hover ${HoverBarContainer} {
				background: linear-gradient(
					to right,
					transparent,
					${getColor(`${backgroundColor}.hover`, theme)}
				);
			}

			&:active ${HoverBarContainer} {
				background: linear-gradient(
					to right,
					transparent,
					${getColor(`${backgroundColor}.active`, theme)}
				);
			}
		`}
`;

export const TaskList = ({ tasks }: TaskListProps): React.JSX.Element => {
	const [t] = useTranslation();
	const allTasksLabel = useMemo(() => t('secondaryBar.allTasks', 'All Tasks'), [t]);
	const { activeItem, setActive } = useActiveItem();
	const [emptyListPlaceholder] = useRandomPlaceholder('list.empty', {
		defaultValue: "It looks like there's nothing here."
	});

	const items = useMemo(
		() =>
			map(tasks, (task) => (
				<StyledListItem key={task.id} active={task.id === activeItem} data-testid={'list-item'}>
					{(visible): React.JSX.Element => (
						<ListItemContent
							visible={visible}
							title={task.title}
							priority={task.priority}
							reminderAt={task.reminderAt}
							reminderAllDay={task.reminderAllDay}
							status={task.status}
							id={task.id}
							onClick={setActive}
						/>
					)}
				</StyledListItem>
			)),
		[activeItem, setActive, tasks]
	);
	const Task01Icon = (props: React.SVGProps<SVGSVGElement>) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={20}
			height={20}
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

	const [visible] = useState(true);

	const [high, setHigh] = useState(false);
	const [low, setLow] = useState(false);
	const [all, setAll] = useState(true);
	const [medium, setMedium] = useState(false);

	const openMenu = () => {};

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const showlowPriority = () => {
		setLow(true);
		setHigh(false);
		setAll(false);
		setMedium(false);
		handleClose();
	};

	const showmediumPriority = () => {
		setLow(false);
		setHigh(false);
		setAll(false);
		setMedium(true);
		handleClose();
	};
	const showhighPriority = () => {
		setLow(false);
		setHigh(true);
		setAll(false);
		setMedium(false);
		handleClose();
	};
	const showallTasks = () => {
		setLow(false);
		setHigh(false);
		setAll(true);
		setMedium(false);
		handleClose();
	};

	return (
		<div style={{ width: '100%', height: '100%', backgroundColor: BACKGROUND_COLOR }}>
			<Grid2
				container
				sx={{
					width: '100%',
					backgroundColor: BACKGROUND_HEADER_COLOR,
					position: 'sticky',
					top: 0,
					left: 0,
					zIndex: 2
				}}
			>
				<div
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '16px'
					}}
				>
					<IconButton>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'flex-start'
							}}
						>
							<Task01Icon style={{ color: PRIMARY_ICON_COLOR_ACTIVE }} />

							<Typography variant="body1" style={{ marginLeft: '8px', color: 'black' }}>
								{allTasksLabel}
							</Typography>
						</div>
					</IconButton>
					<div>
						<IconButton onClick={handleClick}>
							<FilterListIcon style={{ color: PRIMARY_ICON_COLOR_ACTIVE }} />
						</IconButton>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button'
							}}
						>
							<MenuItem disabled>Filter by :</MenuItem>
							<Divider />
							<MenuItem onClick={() => showallTasks()}>
								<ListItemIcon>
									<Task01Icon fontSize="small" style={{ color: PRIMARY_ICON_COLOR_ACTIVE }} />
								</ListItemIcon>
								<ListItemText>All Tasks</ListItemText>
							</MenuItem>
							<Divider />
							<MenuItem onClick={() => showhighPriority()}>
								<ListItemIcon>
									<PriorityHighRounded fontSize="small" style={{ color: HIGH_PRIORITY }} />
								</ListItemIcon>
								<ListItemText>High Priority</ListItemText>
							</MenuItem>
							<Divider />
							<MenuItem onClick={() => showmediumPriority()}>
								<ListItemIcon>
									<PriorityHighRounded fontSize="small" style={{ color: MEDIUM_PRIORITY }} />
								</ListItemIcon>
								<ListItemText>Medium Priority</ListItemText>
							</MenuItem>
							<Divider />
							<MenuItem onClick={() => showlowPriority()}>
								<ListItemIcon>
									<PriorityHighRounded fontSize="small" style={{ color: LOW_PRIORITY }} />
								</ListItemIcon>
								<ListItemText>Low Priority</ListItemText>
							</MenuItem>
						</Menu>
					</div>
				</div>
			</Grid2>
			<Grid2>
				<Divider />
			</Grid2>
			<Grid2 sx={{ width: '100%', height: '100%', zIndex: 1 }}>
				<div style={{ marginTop: '16px', marginRight: '16px', marginLeft: '16px' }}>
					{tasks.length === 0 ? (
						<div>It looks like there's nothing here.</div>
					) : (
						<div className="w-full flex ">
							{all ? (
								<div className=" flex w-full grid xxs:grid-cols-0 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 gap-4 ">
									{tasks.map((task) => (
										<ListItemContent
											visible={visible}
											title={task.title}
											priority={task.priority}
											reminderAt={task.reminderAt}
											reminderAllDay={task.reminderAllDay}
											status={task.status}
											id={task.id}
											onClick={setActive}
										/>
									))}
								</div>
							) : high ? (
								<div className="flex  w-full grid xxs:grid-cols-0 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 gap-4">
									{tasks
										.filter((task) => task.priority === Priority.High)
										.map((task) => (
											<Paper>
												<ListItemContent
													visible={visible}
													title={task.title}
													priority={task.priority}
													reminderAt={task.reminderAt}
													reminderAllDay={task.reminderAllDay}
													status={task.status}
													id={task.id}
													onClick={setActive}
												/>
											</Paper>
										))}
								</div>
							) : medium ? (
								<div className="flex w-full grid gap-4 xxs:grid-cols-0 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6">
									{tasks
										.filter((task) => task.priority === Priority.Medium)
										.map((task) => (
											<Paper>
												<ListItemContent
													visible={visible}
													title={task.title}
													priority={task.priority}
													reminderAt={task.reminderAt}
													reminderAllDay={task.reminderAllDay}
													status={task.status}
													id={task.id}
													onClick={setActive}
												/>
											</Paper>
										))}
								</div>
							) : low ? (
								<div className="flex grid w-full  gap-4 xxs:grid-cols-0 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6">
									{tasks
										.filter((task) => task.priority === Priority.Low)
										.map((task) => (
											<Paper>
												<ListItemContent
													visible={visible}
													title={task.title}
													priority={task.priority}
													reminderAt={task.reminderAt}
													reminderAllDay={task.reminderAllDay}
													status={task.status}
													id={task.id}
													onClick={setActive}
												/>
											</Paper>
										))}
								</div>
							) : (
								<div className=" flex w-full grid  gap-4 xxs:grid-cols-0 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6">
									{tasks.map((task) => (
										<Paper>
											<ListItemContent
												visible={visible}
												title={task.title}
												priority={task.priority}
												reminderAt={task.reminderAt}
												reminderAllDay={task.reminderAllDay}
												status={task.status}
												id={task.id}
												onClick={setActive}
											/>
										</Paper>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			</Grid2>
		</div>
	);
};

{
	/* <div>
			<div
				style={{
					width: '100%',
					minHeight: '2.5rem',
					padding: '16px',
					background: 'white',
					flexDirection:"row"
					display: 'flex'
				}}
			>
				<div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
					<div style={{ marginLeft: '8px' }}>
						<Task01Icon />
					</div>

					<Typography variant="body1" style={{ marginLeft: '8px' }}>
						{allTasksLabel}
					</Typography>
				</div>
			</div>
			<Divider color="gray3" />
			<div className="w-full flex grid grid-cols-3 gap-4 mt-4 mr-4 ml-4">
				{tasks
					.filter((task) => task.priority === Priority.High)
					.map((task) => (
						<Paper>
							<ListItemContent
								visible={visible}
								title={task.title}
								priority={task.priority}
								reminderAt={task.reminderAt}
								reminderAllDay={task.reminderAllDay}
								status={task.status}
								id={task.id}
								onClick={setActive}
							/>
						</Paper>
					))}
			</div>
		</div> */
}
