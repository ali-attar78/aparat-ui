/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import MailLayout from '../../layouts/MainLayout';
import React from 'react';
import { useLocation } from 'react-router-dom';

import CategorizedVideos from '../../components/CategorizedVideos/index';

export default function HomePage() {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  console.log(search);
  return (
    <MailLayout fullWidth drawerIsOpen={true}>
      <CategorizedVideos search={search}/>
    </MailLayout>
  );
}
