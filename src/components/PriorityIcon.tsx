/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Icon } from '@zextras/carbonio-design-system';
import { Filter1Rounded, PriorityHighRounded } from '@mui/icons-material';

import { Priority } from '../gql/types';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
import { HIGH_PRIORITY, LOW_PRIORITY, MEDIUM_PRIORITY } from '../sruvi/EditedColors';

interface PriorityIconProps {
	priority: Priority;
}

export const PriorityIcon = ({ priority }: PriorityIconProps): React.JSX.Element => (
	<>
		{priority === Priority.High && <PriorityHighRounded style={{ color: HIGH_PRIORITY }} />}
		{priority === Priority.Low && <PriorityHighRounded style={{ color: LOW_PRIORITY }} />}
		{priority === Priority.Medium && <PriorityHighRounded style={{ color: MEDIUM_PRIORITY }} />}
	</>
);
