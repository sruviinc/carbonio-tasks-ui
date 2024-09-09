/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo } from 'react';

import {
	Container,
	Divider,
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
import type { FindTasksQuery } from '../gql/types';
import { useActiveItem } from '../hooks/useActiveItem';
import { useRandomPlaceholder } from '../hooks/useRandomPlaceholder';
import type { NonNullableList } from '../types/utils';
import { Typography } from '@mui/material';

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
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"} {...props}>
		  <path d="M7.99805 16H11.998M7.99805 11H15.998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		  <path d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5" stroke="currentColor" strokeWidth="1.5" />
		  <path d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
		</svg>
	  );
	  

	return (
		<Container
			width={LIST_WIDTH}
			mainAlignment="flex-start"
			crossAlignment="unset"
			borderRadius="none"
			background={'gray6'}
		>

			<div style={{ width: '100%', minHeight:"2.5rem", height:"auto" , background: 'white',
				flexGrow: 1, flexShrink: 0, display: 'flex',
			 }}>

			 	<div style={{display:"flex", flexDirection:"row", width:"100%", alignItems:"center"}}>
					<div style={{marginLeft:"8px"}}>
					<Task01Icon />
					</div>
					
				 <Typography variant="body1" style={{marginLeft:"8px"}} >{allTasksLabel}</Typography>

				</div>

			</div>

			{/* <Row
				minHeight={'2.5rem'}
				height="auto"
				background={'gray5'}
				mainAlignment={'space-between'}
				padding={{ left: 'large' }}
				wrap={'nowrap'}
				width={'fill'}
				maxWidth={'100%'}
				data-testid="list-header"
				flexShrink={0}
				flexGrow={1}
				gap="medium"
			>
				<Text>{allTasksLabel}</Text>
			</Row> */}
			<Divider color="gray3" />
			<Container minHeight={0} maxHeight={'100%'}>
				{(!isEmpty(items) && (
					<ListV2 data-testid="main-list" background={'gray6'}>
						{items}
					</ListV2>
				)) || (
					<Text size={'small'} weight={'bold'} overflow={'break-word'} color={'secondary'} centered>
						{emptyListPlaceholder}
					</Text>
				)}
			</Container>
		</Container>
	);
};
