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
import { Grid2, Typography, IconButton, Grid, Paper } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { BACKGROUND_HEADER_COLOR, PRIMARY_ICON_COLOR_ACTIVE } from '../sruvi/EditedColors';
import { ArrowBack } from '@mui/icons-material';

interface DisplayerHeaderProps {
	title: string;
	status: Status;
	hello: (value: boolean) => void;
}

export const DisplayerHeader = ({
	title,
	status,
	hello
}: DisplayerHeaderProps): React.JSX.Element => {
	const { removeActive } = useActiveItem();

	const closeDisplayer = useCallback(() => {
		removeActive();
		hello(true);
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

		<div
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'column',
				position: 'sticky',
				top: '0',
				left: '0',
				backgroundColor: BACKGROUND_HEADER_COLOR,
				zIndex: 4
			}}
		>
			<div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'flex-start',
						padding: '16px',
						backgroundColor: BACKGROUND_HEADER_COLOR
					}}
				>
					<div
						style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
					>
						<IconButton onClick={closeDisplayer} style={{ marginLeft: '8px' }}>
							<ArrowBack style={{ color: PRIMARY_ICON_COLOR_ACTIVE }} />
						</IconButton>
						<Typography
							variant="h6"
							style={{ wordWrap: 'break-word', textJustify: 'inter-character', marginLeft: '8px' }}
						>
							Task Details
						</Typography>
					</div>
				</div>
				<Divider color={'gray3'} />
			</div>
		</div>
	);
};
