/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo } from 'react';

import {
	Accordion,
	type AccordionItemType,
	Container,
	IconButton,
	Tooltip
} from '@zextras/carbonio-design-system';
import { useUserAccount } from '@zextras/carbonio-shell-ui';
import { flatMap, map, noop } from 'lodash';
import { useTranslation } from 'react-i18next';

function buildCollapsedItem(item: AccordionItemType): React.JSX.Element[] {
	const element = (
		<Tooltip label={item.label}>
			<IconButton
				customSize={{ iconSize: 'large', paddingSize: 'small' }}
				icon={item.icon || ''}
				onClick={item.onClick || noop}
				backgroundColor={(item.active && 'highlight') || undefined}
				iconColor={item.iconColor}
			/>
		</Tooltip>
	);
	const list: React.JSX.Element[] = [element];
	if (item.items && item.items.length > 0) {
		list.push(...flatMap(item.items, (subItem) => buildCollapsedItem(subItem)));
	}
	return list;
}

const SecondaryBarView = ({ expanded }: { expanded: boolean }): React.JSX.Element => {
	const [t] = useTranslation();
	const { name, displayName } = useUserAccount();
	const PriorityIcon = (props: React.SVGProps<SVGSVGElement>) => (
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

	const items = useMemo<AccordionItemType[]>(
		() => [
			{
				id: 'id1',
				label: ``,
				icon: '',
				open: true,
				items: [
					{
						id: 'id2',
						icon: 'CheckmarkCircle2Outline',
						label: t('secondaryBar.allTasks', 'My Tasks'),
						onClick: (ev): void => {
							ev.stopPropagation();
						},
						active: true
					}
				],
				onClick: (ev: React.SyntheticEvent | KeyboardEvent): void => {
					ev.stopPropagation();
				}
			}
		],
		[name, t]
	);

	const collapsedItems = useMemo(() => map(items, (item) => buildCollapsedItem(item)), [items]);

	return (
		<Container
			height="auto"
			orientation="vertical"
			mainAlignment="flex-start"
			crossAlignment="flex-start"
			background={'transparent'}
		>
			{(expanded && (
				<div className="flex rounded-full w-full">
					<Accordion background="transparent" role="menuitem" items={items} />
				</div>
			)) || <Container mainAlignment={'flex-start'}>{collapsedItems}</Container>}
		</Container>
	);
};
export default SecondaryBarView;
