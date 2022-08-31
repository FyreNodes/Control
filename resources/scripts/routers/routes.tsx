import React, {lazy, ReactNode} from 'react';
import ServerConsole from '@/components/server/console/ServerConsoleContainer';
import DatabasesContainer from '@/components/server/databases/DatabasesContainer';
import ScheduleContainer from '@/components/server/schedules/ScheduleContainer';
import UsersContainer from '@/components/server/users/UsersContainer';
import BackupContainer from '@/components/server/backups/BackupContainer';
import NetworkContainer from '@/components/server/network/NetworkContainer';
import StartupContainer from '@/components/server/startup/StartupContainer';
import FileManagerContainer from '@/components/server/files/FileManagerContainer';
import SettingsContainer from '@/components/server/settings/SettingsContainer';
import AccountOverviewContainer from '@/components/dashboard/AccountOverviewContainer';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import AccountSSHContainer from '@/components/dashboard/ssh/AccountSSHContainer';
import ActivityLogContainer from '@/components/dashboard/activity/ActivityLogContainer';
import ServerActivityLogContainer from '@/components/server/ServerActivityLogContainer';
import {InformationCircleIcon, KeyIcon, ServerStackIcon, UserIcon} from "@heroicons/react/24/solid";

// Each of the router files is already code split out appropriately — so
// all of the items above will only be loaded in when that router is loaded.
//
// These specific lazy loaded routes are to avoid loading in heavy screens
// for the server dashboard when they're only needed for specific instances.
const FileEditContainer = lazy(() => import('@/components/server/files/FileEditContainer'));
const ScheduleEditContainer = lazy(() => import('@/components/server/schedules/ScheduleEditContainer'));

interface RouteDefinition {
    path: string;
    // If undefined is passed this route is still rendered into the router itself
    // but no navigation link is displayed in the sub-navigation menu.
    name: string | undefined;
    component: React.ComponentType;
    exact?: boolean;
    icon: JSX.Element|null;
}

interface ServerRouteDefinition extends RouteDefinition {
    permission: string | string[] | null;
}

interface Routes {
    // All of the routes available under "/account"
    account: RouteDefinition[];
    // All of the routes available under "/server/:id"
    server: ServerRouteDefinition[];
}

export default {
    account: [
        {
            path: '/',
            name: 'Account',
            component: AccountOverviewContainer,
            exact: true,
            icon: <UserIcon/>
        },
        {
            path: '/api',
            name: 'API Keys',
            component: AccountApiContainer,
            icon: <ServerStackIcon/>
        },
        {
            path: '/ssh',
            name: 'SSH Keys',
            component: AccountSSHContainer,
            icon: <KeyIcon/>
        },
        {
            path: '/activity',
            name: 'Activity',
            component: ActivityLogContainer,
            icon: <InformationCircleIcon/>
        },
    ],
    server: [
        {
            path: '/',
            permission: null,
            name: 'Console',
            component: ServerConsole,
            exact: true,
            icon: null
        },
        {
            path: '/files',
            permission: 'file.*',
            name: 'Files',
            component: FileManagerContainer,
            icon: null
        },
        {
            path: '/files/:action(edit|new)',
            permission: 'file.*',
            name: undefined,
            component: FileEditContainer,
            icon: null
        },
        {
            path: '/databases',
            permission: 'database.*',
            name: 'Databases',
            component: DatabasesContainer,
            icon: null
        },
        {
            path: '/schedules',
            permission: 'schedule.*',
            name: 'Schedules',
            component: ScheduleContainer,
            icon: null
        },
        {
            path: '/schedules/:id',
            permission: 'schedule.*',
            name: undefined,
            component: ScheduleEditContainer,
            icon: null
        },
        {
            path: '/users',
            permission: 'user.*',
            name: 'Users',
            component: UsersContainer,
            icon: null
        },
        {
            path: '/backups',
            permission: 'backup.*',
            name: 'Backups',
            component: BackupContainer,
            icon: null
        },
        {
            path: '/network',
            permission: 'allocation.*',
            name: 'Network',
            component: NetworkContainer,
            icon: null
        },
        {
            path: '/startup',
            permission: 'startup.*',
            name: 'Startup',
            component: StartupContainer,
            icon: null
        },
        {
            path: '/settings',
            permission: ['settings.*', 'file.sftp'],
            name: 'Settings',
            component: SettingsContainer,
            icon: null
        },
        {
            path: '/activity',
            permission: 'activity.*',
            name: 'Activity',
            component: ServerActivityLogContainer,
            icon: null
        },
    ],
} as Routes;
