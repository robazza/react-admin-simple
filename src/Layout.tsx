import * as React from 'react';
import { forwardRef, memo } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
    AppBar,
    Layout,
    Logout,
    UserMenu,
    useLocaleState,
    useUserMenu,
    Menu,
    DashboardMenuItem,
    MenuItemLink
} from 'react-admin';
import { MenuItem, MenuItemProps, ListItemIcon } from '@mui/material';

import BookIcon from '@mui/icons-material/Book';

import Language from '@mui/icons-material/Language';

const SwitchLanguage = forwardRef<HTMLLIElement, MenuItemProps>(
    (props, ref) => {
        const [locale, setLocale] = useLocaleState();
        const { onClose } = useUserMenu();

        return (
            <MenuItem
                ref={ref}
                {...props}
                sx={{ color: 'text.secondary' }}
                onClick={event => {
                    setLocale(locale === 'en' ? 'fr' : 'en');
                    onClose();
                }}
            >
                <ListItemIcon sx={{ minWidth: 5 }}>
                    <Language />
                </ListItemIcon>
                Switch Language
            </MenuItem>
        );
    }
);

const MyUserMenu = () => (
    <UserMenu>
        <SwitchLanguage />
        <Logout />
    </UserMenu>
);

const MyAppBar = memo(props => <AppBar {...props} userMenu={<MyUserMenu />} />);

const MyMenu = memo((props) => {
    console.log(props);
    return (
    <>
        <Menu {...props}>
            <MenuItemLink to="/processos" primaryText="Meus Processos" leftIcon={<BookIcon />}/>
            <MenuItemLink to="/novo-processo" primaryText="Abrir Processo" leftIcon={<BookIcon />}/>
        </Menu>

        <Menu {...props}></Menu> 
        


    </>
)});

export default props => (
    <>
        <Layout {...props} appBar={MyAppBar} menu={MyMenu} />
        <ReactQueryDevtools
            initialIsOpen={false}
            toggleButtonProps={{ style: { width: 20, height: 30 } }}
        />
    </>
);
