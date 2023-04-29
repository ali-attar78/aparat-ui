import {React,memo} from 'react'
import UpCloudIcon from "@mui/icons-material/CloudQueue";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { FileDrop } from "react-file-drop";
import uploadVideoService from "../../../services/upload_video_service/upload-video-service";
import styled from 'styled-components';


const Wrapper = styled.div`

& .fileDrop {
    position: relative;
    border: 2px dashed #ddd;
    margin: 25px 0;
    padding: 25px;
    height: 190px;
  }

  & .fileDrop .MuiSvgIcon-root {
    position: absolute;
    left: 30px;
    top: -10px;
    color: #cfcfcf;
    font-size: 160px;
    height: 100%;
  }

  & .fileDrop .MuiSvgIcon-root.upArrowIcon {
    font-size: 120px;
    left: 48px;
    top: 16px;
  }

  & .fileDrop > div,
  & .fileDrop b {
    display: block;
    width: 300px;
    text-align: center;
    color: #ccc;
    font-size: 1.2rem;
  }

  & .fileDrop b {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  & .fileDrop .fileDropTitle {
    color: #6a6a6a;
  }

  & .fileDrop button {
    font-size: 0.9rem;
    font-weight: bold;
    color: #757575;
    border: 1px solid #cbcbcb;
    background: #fff;
    border-radius: 2px;
    padding: 5px 15px;
  }


  & [type='file'] {
    display: none;
  }


  @media (max-width: 550px) {
    & .fileDropTitle {
      font-size:17px!important;
    }

    & .fileDrop b {
      text-align: start !important; 
    
    }
    & .textDiv{
      text-align: start !important; 

    }
  }
  
`;

const FileUploadForm = () => {

    const uploadVideoServiceInstance = uploadVideoService();

    let response;
    let fileSelectorRef = null;
  
    const handleDrop = async files => {
      if (files) {
        const file = files[0];
        if (file.type !== 'video/mp4') {
          return alert('فقط فایل های ویدیوو با پسوند mp4 را انتخاب کنید');
        }
  
        if (file.size < 100 || file.size > 100000000) {
          return alert('حجم ویدیو انتخاب شده مناسب نیست');
        }
        try {
          response = await uploadVideoServiceInstance.Upload(
            file,
            "/video/upload"
          );
          if(response.result){
            console.log(response.result);
          }
          else if(response.error){
            alert('شما دسترسی به این بخش ندارید');
          }
        } catch (error) {
          console.log(error);
          alert('خطایی در بارگذاری ویدیو رخ داده است.');
        }
      }
  
      return false;
    };
  
    const whantToSelectFile = () => {
      fileSelectorRef.click();
    };
  
    const onSelectFileFromFileSelector = e => handleDrop(e.target.files);
  
  

  return (

    <Wrapper>


<FileDrop onDrop={handleDrop} className="fileDrop">
            <div className="textDiv">
              <b className="fileDropTitle">فایل خود را اینجا بکشید</b>
              <b>یا</b>

              <button type="button" onClick={whantToSelectFile}>
                انتخاب فایل
              </button>

              <input
                type="file"
                ref={el => {
                  fileSelectorRef = el;
                }}
                onChange={onSelectFileFromFileSelector}
              />
            </div>

            <UpCloudIcon className="cloudIcon"/>
            <ArrowUpwardIcon className="upArrowIcon" />
          </FileDrop>

</Wrapper>


    )
}

export default memo(FileUploadForm)