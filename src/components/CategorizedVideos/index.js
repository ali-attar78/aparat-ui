/**
 *
 * CategorizedVideos
 *
 */

import React, { memo, useEffect,useState } from 'react';

import PropTypes from 'prop-types';


import LoadingWithText from '../LoadingWithText';
import SlidableVideoList from '../SlidableVideoList';
import ErrorMessage from '../ErrorMessage';
import CategorizedVideosService from "../../services/GetCategorizedVideosApi/GetCategorizedVideosApi";

import { CategorizedVideosWrapper } from './styles';






function CategorizedVideos({search}) {

    const [categorizedVideos,setCategorizedVideos ]=useState(null);
    const [errorCategorizedVideos,setErrorCategorizedVideos]=useState(null);

  const CategorizedVideosApi=CategorizedVideosService();

  // useEffect(() => {
  //   handleGetCategorizedVideos();
  // }, []);

  useEffect(() => {
    handleGetCategorizedVideos();
  }, [search]);


  async function handleGetCategorizedVideos() {
    try {
      const response = await CategorizedVideosApi.GetCategorizedVideos(`/categorized-videos?${search}`);
      if (response.error) {
        console.log(response.error);
        setErrorCategorizedVideos(response.error);
      } else {
        console.log(response.result);
        setCategorizedVideos(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <CategorizedVideosWrapper>
      {!categorizedVideos && <LoadingWithText text="در حال بارگذاری ویدیو ها" />}

      {errorCategorizedVideos && (
        <ErrorMessage
          error={errorCategorizedVideos}
          forceMessage="در بارگذاری ویدیو ها مشکلی به وجود آمده است صفحه را دوباره بارگذاری کنید"
        />
      )}

      {categorizedVideos &&
        categorizedVideos.map(item => <SlidableVideoList key={item.id} category={item} />)}
    </CategorizedVideosWrapper>
  );
}



export default memo(CategorizedVideos);
