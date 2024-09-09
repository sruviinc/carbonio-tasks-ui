/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback } from 'react';

import { Container, Divider, Icon } from '@zextras/carbonio-design-system';

import { Text } from './Text';
import { Status } from '../gql/types';
import { useActiveItem } from '../hooks/useActiveItem';
import { Grid2, Typography, IconButton, Grid } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface DisplayerHeaderProps {
	title: string;
	status: Status;
}

export const DisplayerHeader = ({ title, status }: DisplayerHeaderProps): React.JSX.Element => {
	const { removeActive } = useActiveItem();

	const closeDisplayer = useCallback(() => {
		removeActive();
	}, [removeActive]);

	return (
		// <Container orientation={'vertical'} height={'auto'} background={'white'}>
		// 	<Container
		// 		mainAlignment={'flex-start'}
		// 		orientation={'horizontal'}
		// 		width={'fill'}
		// 		height={'auto'}
		// 		padding={{ top: '0.5rem', right: '0.5rem', bottom: '0.5rem', left: '1rem' }}
		// 		gap={'0.5rem'}
		// 	>
		// 		{status === Status.Complete && (
		// 			<Container width={'fit'} height={'fit'} flexShrink={0}>
		// 				<Icon size={'large'} icon={'Checkmark'} color={'success'} />
		// 			</Container>
		// 		)}
		// 		<Text withTooltip>{title}</Text>
		// 		<Container margin={{ left: 'auto' }} width={'fit'} height={'fit'} flexShrink={0}>
		// 			<IconButton icon={'CloseOutline'} size={'medium'} onClick={closeDisplayer} />
		// 		</Container>
		// 	</Container>
		// 	<Divider color={'gray3'} />
		// </Container>

		<div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
			<div style={{ padding: '8px', maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'flex-start',
						padding: '16px'
					}}
				>
					<div style={{ width: '80%', display: 'flex' }}>
						<Typography
							variant="h6"
							style={{ wordWrap: 'break-word', textJustify: 'inter-character' }}
						>
							Task Details
						</Typography>
					</div>
					<div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end' }}>
						<IconButton onClick={closeDisplayer}>
							<CloseRoundedIcon />
						</IconButton>
					</div>
				</div>
				<Divider color={'gray3'} />
				<div style={{ padding: '16px' }}>
					<Text size={'small'} color={'gray1'}>
						Task title
					</Text>
					<Typography variant="h6" style={{ wordWrap: 'break-word', textJustify: 'inter-word' }}>
						{title}
					</Typography>
				</div>
			</div>
		</div>
	);
};
