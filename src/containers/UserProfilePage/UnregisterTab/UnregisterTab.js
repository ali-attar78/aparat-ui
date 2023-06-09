import React, { memo, useState } from "react";

import styled from "styled-components";
import WarningIcon from "@mui/icons-material/WarningOutlined";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Confirm from "../../../components/Confirm";
import ErrorMessage from "../../../components/ErrorMessage";
import {ROUTE_LOGIN} from "../../../routes";
import UnRegisterService from "../../../services/UnRegisterApi/UnRegisterApi"

const UnregisterTabWrapper = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;
  padding: 2em;

  > .warningMessage {
    background: #eee;
    padding: 1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > .warningIcon {
      font-size: 5em;
      padding: 0.2em;
    }
  }

  > .unregisterBtn {
    border-radius: 15px;
    padding: 0.7em 2em;
    margin: 0.2em;
  }

  > p {
    padding: 1em 0;
  }
`;

function UnregisterTab(
  {
    //  unregisterData,
    //   handleUnregisterUser
  }
) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorUnRegisterResponse, setErrorUnRegisterResponse] = useState(null);

  const UnRegisterApi = UnRegisterService();

  async function handleUnregister() {
    try {
      const response = await UnRegisterApi.UnRegister('/user/me');
      if (response.error) {
        console.log(response.error);
        setErrorUnRegisterResponse(response.error);
      } else {
        console.log(response.result);
        localStorage.removeItem('auth');
        navigate(ROUTE_LOGIN);

      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <UnregisterTabWrapper>
      <div className="warningMessage">
        <WarningIcon className="warningIcon" />
        باغیر فعالسازی عضویت ، تمامی ویدیوهای شما،از دسترس خارج خواهند شد. پس از
        غیر فعالسازی عضویت ،تنها با یک بار لاگین در سایت ،عضویت شما در سایت
        مجدداً فعال خواهد شد.
      </div>

      <p>
        لطفاً، پس از مطالعه موارد فوق چنانچه برای غیر فعالسازی عضویت از سایت،
        موافق هستید دکمه زیر را کلیک کنید
      </p>

      <Button
      style={{color: '#fff'}}
        className="unregisterBtn"
        variant="contained"
        color="danger"
        // disabled={unregisterData.loading}
        onClick={() => setShowDeleteModal(true)}
      >
        لغو عضویت
      </Button>

      {errorUnRegisterResponse && (
        <ErrorMessage
          error={errorUnRegisterResponse}
          forceMessage="در حذف حساب کاربری خطایی به وجود آمده است"
        />
      )}

      <Confirm
        title="حذف حساب کاربری"
        open={showDeleteModal}
        okTitle="بله، حذف شود"
        onOk={() => {
          setShowDeleteModal(false);
          handleUnregister();
        }}
        onCancel={() => setShowDeleteModal(false)}
      >
        آیا مطمئن هستید که می خواهید حساب کاربری خود را غیر فعال کنید؟
      </Confirm>
    </UnregisterTabWrapper>
  );
}

export default memo(UnregisterTab);
