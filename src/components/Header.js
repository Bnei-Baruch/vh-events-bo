import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { darken } from "polished";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { Bell, MessageSquare, Search as SearchIcon } from "react-feather";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Badge,
  Grid,
  Hidden,
  InputBase,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { Menu as MenuIcon } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CHAT_AND_NOTIFICATION_ICONS, SEARCH_BAR } from "../shared/constants";
import { setLoggedInUser } from "../redux/actions/userActions";
import ModalWindow from "./ModalWindow";

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
  box-shadow: ${(props) => props.theme.shadows[1]};
  background-color: #fff !important;
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const FlagButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
  color: #747474;
  font-size: 14px;
  :hover {
    background-color: transparent !important;
  }
  @media (max-width: 600px) {
    padding: 10px !important;
  }
`;

const UserIconButton = styled(MuiIconButton)`
  font-size: 16px !important;
  &:hover {
    border-radius: 10px !important;
  }
  color: #5a5a5a;
  svg {
    width: 30px;
    height: 30px;
  }
  @media (max-width: 600px) {
    padding: 0px !important;
  }
`;

const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${(props) => props.theme.header.indicator.background};
    color: ${(props) => props.theme.palette.common.white};
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(2.5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    width: 160px;
  }
`;

const languages = [
  { code: "en", name: "English", country: "gb" },
  { code: "ru", name: "Russian", country: "ru" },
  { code: "he", name: "Hebrew", country: "il" },
  { code: "es", name: "Spanish", country: "es" },
];

function LanguageMenu() {
  const { t, i18n } = useTranslation();
  const [anchorMenu, setAnchorMenu] = useState(null);

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = (lng) => {
    setAnchorMenu(null);
    _.isString(lng) && i18n.changeLanguage(lng);
  };

  return (
    <>
      <FlagButton
        aria-owns={anchorMenu ? "menu-appbar" : undefined}
        aria-haspopup="true"
        onClick={toggleMenu}
        color="inherit"
      >
        <LanguageIcon /> &nbsp;
        {i18next.language?.toUpperCase()}
      </FlagButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
        style={{ maxHeight: 350 }}
      >
        {languages.map((item) => (
          <MenuItem key={item.code} onClick={() => closeMenu(item.code)}>
            {t(`Languages.${item.name}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function UserMenu() {
  const { t } = useTranslation();
  const state = useSelector((state) => state.userReducer.info);
  const dispatch = useDispatch();

  const [anchorMenu, setAnchorMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const onLogOutClick = () => {
    closeMenu();
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onAuthLogout = () => {
    state.keycloak.logout();
    dispatch(setLoggedInUser(null));
    handleCloseModal();
  };

  return (
    <>
      <UserIconButton
        aria-owns={anchorMenu ? "menu-appbar" : undefined}
        aria-haspopup="true"
        onClick={toggleMenu}
        color="inherit"
      >
        <AccountCircleIcon />
        &nbsp;{" "}
        {state.keycloak.profile.firstName +
          " " +
          state.keycloak.profile.lastName}
        &nbsp; <KeyboardArrowDownIcon />
      </UserIconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MenuItem onClick={onLogOutClick}>{t("UserMenu.logOut")}</MenuItem>
      </Menu>
      <ModalWindow
        open={isModalOpen}
        contentText={t("UserMenu.logOutText")}
        confirmBtnText={t("UserMenu.yesBtn")}
        closeBtnText={t("UserMenu.cancelBtn")}
        handleClose={handleCloseModal}
        onConfirmation={onAuthLogout}
      />
    </>
  );
}

const Header = ({ onDrawerToggle }) => {
  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Hidden mdUp>
              <Grid item>
                <IconButton aria-label="Open drawer" onClick={onDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            {SEARCH_BAR && (
              <Grid item>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <Input placeholder="Search topics" />
                </Search>
              </Grid>
            )}
            <Grid item xs></Grid>
            <Grid item>
              {CHAT_AND_NOTIFICATION_ICONS && (
                <>
                  <IconButton color="inherit">
                    <Indicator badgeContent={3}>
                      <MessageSquare />
                    </Indicator>
                  </IconButton>
                  <IconButton color="inherit">
                    <Indicator badgeContent={7}>
                      <Bell />
                    </Indicator>
                  </IconButton>
                </>
              )}
              <LanguageMenu />
              <UserMenu />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withTheme(Header);
