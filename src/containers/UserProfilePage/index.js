/**
 *
 * UserProfilePage
 *
 */

import React,{useState} from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useLocation,useNavigate } from 'react-router-dom';


import DashboardLayout from '../../layouts/DashboardLayout/dashboardLayout';
import Filters from '../../components/Filters';
import {
  ROUTE_MY_PROFILE,
  ROUTE_MY_PROFILE_BANNER,
  ROUTE_MY_PROFILE_CATEGORIES,
  ROUTE_MY_PROFILE_UNREGISTER,
} from '../../routes';
import UnregisterTab from './UnregisterTab/UnregisterTab';
import CategoriesTab from './CategoriesTab/CategoriesTab';
import ProfilePictureTab from './ProfilePictureTab/ProfilePictureTab';
import ChannelInfoTab from './ChannelInfoTab/ChannelInfoTab';

const PROFILE_MENUS = {
  [ROUTE_MY_PROFILE]: 'اطلاعات کانال',
  [ROUTE_MY_PROFILE_BANNER]: 'تصویر پروفایل و کاور',
  [ROUTE_MY_PROFILE_CATEGORIES]: 'تنظیمات دسته‌بندی',
  [ROUTE_MY_PROFILE_UNREGISTER]: 'لغو عضویت',
};

const ProfileContentWrapper = styled.div`
  margin-top: 4em;
`;

export function UserProfilePage({ }) {

  const navigate = useNavigate();
  const location = useLocation();
  const CURRENT_MENU = location.pathname;
  const [changeBanner, setChangeBanner] = useState(null);

  function handleChangeRoute(routePath) {
    navigate(routePath);
  }

  function handleBannerChange (change)
  {
    setChangeBanner(change);
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>پروفایل کاربر</title>
        <meta name="description" content="پروفایل کاربر" />
      </Helmet>
      <Filters
        values={PROFILE_MENUS}
        defaultValue={CURRENT_MENU}
        onChange={handleChangeRoute}
      />

      <ProfileContentWrapper>
        {CURRENT_MENU === ROUTE_MY_PROFILE_UNREGISTER && <UnregisterTab />}
        {CURRENT_MENU === ROUTE_MY_PROFILE_CATEGORIES && <CategoriesTab />}
        {CURRENT_MENU === ROUTE_MY_PROFILE_BANNER && <ProfilePictureTab onBannerChange={handleBannerChange}/>}
        {CURRENT_MENU === ROUTE_MY_PROFILE && <ChannelInfoTab />}
      </ProfileContentWrapper>
    </DashboardLayout>
  );
}


export default UserProfilePage;
