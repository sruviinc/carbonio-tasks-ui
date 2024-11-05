/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useMemo, useState } from 'react';

import { useQuery } from '@apollo/client';
import { Container, Responsive } from '@zextras/carbonio-design-system';
import { filter } from 'lodash';

import { Displayer } from '../../components/Displayer';
import { TaskList } from '../../components/TaskList';
import { DISPLAYER_WIDTH } from '../../constants';
import { ListContext } from '../../contexts';
import { FindTasksDocument, type FindTasksQuery } from '../../gql/types';
import type { NonNullableList } from '../../types/utils';
import { identity } from '../../utils';
import { Divider, Grid2 } from '@mui/material';
import { useActiveItem } from '../../hooks/useActiveItem';
import type { Task } from '../../gql/types';
import { useActions } from '../../hooks/useActions';

export const TasksView = (): React.JSX.Element => {
	const { data: findTasksResult } = useQuery(FindTasksDocument, {
		notifyOnNetworkStatusChange: true,
		errorPolicy: 'all'
	});

	const tasks = useMemo((): NonNullableList<FindTasksQuery['findTasks']> => {
		if (findTasksResult?.findTasks && findTasksResult.findTasks.length > 0) {
			return filter(findTasksResult.findTasks, identity);
		}
		return [];
	}, [findTasksResult]);

	const { activeItem } = useActiveItem();

	const [backbutton, setBackbutton] = useState(false);
	useEffect(() => {
		if (activeItem) {
			setBackbutton(true);
		} else {
			setBackbutton(false);
		}
	});
	return (
		<ListContext.Provider value={{ isFull: tasks.length >= 200 }}>
			<Grid2
				container
				sx={{
					height: '100%',
					width: '100%',
					overflowY: 'scroll',
					msOverflowStyle: 'none',
					scrollbarWidth: 'none',
					'&::-webkit-scrollbar': {
						width: 0
					},
					borderTopRightRadius: 16,
					borderTopLeftRadius: 16
				}}
			>
				<Grid2 size={12} sx={{ borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
					{!backbutton ? (
						<TaskList tasks={tasks} />
					) : (
						<Displayer translationKey="displayer.allTasks" hello={setBackbutton} />
					)}
				</Grid2>
			</Grid2>
		</ListContext.Provider>
	);
};
